package;

import motion.Actuate;
import motion.easing.*;
import motion.easing.Expo;
import msignal.Signal.Signal0;
import msignal.Signal.Signal1;
import StringTransforms.EditOperation;
import three.*;
import three.Box3;

using markov.util.StringExtensions;

class TransformingLetter extends Mesh {
	public var text:String;
	
	public function new(text:String, size:Int = 220, color:Int = 0xffffff) {		
		this.text = text;
		var material = new MeshBasicMaterial( { transparent:  true, opacity: 1.0, color: color } );
		
		var geometry = new TextGeometry(text, {
			size: size,
			height: 12,
			curveSegments: 3,
			//font: "helvetiker",
			//weight: "regular", // TODO
			//style: "normal",
			bevelEnabled: false,
			material: material,
			extrudeMaterial: 1
		});
		
		super(cast geometry, material);
		
		untyped geometry.computeBoundingBox();
		untyped geometry.computeVertexNormals();
		
		name = "Letter: " + text;
	}
}

// Text that transforms from one string to another by executing a series of edit operations
class TransformingText extends Group {
	public var signal_operationHandled(default, null) = new Signal1<EditOperation>(); // Fires when a string operation happens
	public var signal_operationsHandled(default, null) = new Signal0(); // Fires when all operations have been executed
	
	private var letters:Array<TransformingLetter>;
	private var spacing:Float;
	
	private var operations:Array<EditOperation>;
	private var opIdx:Int; // Index of the next operation
	
	public function new(initialText:String, operations:Array<EditOperation>, spacing:Float = 0) {
		super();
		
		letters = new Array<TransformingLetter>();
		this.operations = operations;
		this.spacing = spacing;
		
		for (i in 0...initialText.length) {
			letters.push(getLetter(initialText.charAt(i)));
		}
		
		opIdx = 0;
		
		layoutLetters();
	}
	
	// Perform the next operation, if there is one
	public function pump():Void {
		Sure.sure(opIdx >= 0);
		
		if(opIdx < operations.length) {
			handle(operations[opIdx]);
			opIdx++;
		} else {
			signal_operationsHandled.dispatch();
		}
	}
	
	public function retarget(ops:Array<EditOperation>):Void {
		while (opIdx < operations.length) {
			handle(operations[opIdx]);
			opIdx++;
		}
		
		opIdx = 0;
		operations = ops;
	}
	
	public function getText():String {
		var s:String = "";
		for (letter in letters) {
			s += letter.text;
		}
		return s;
	}
	
	private function handle(e:EditOperation):Void {		
		switch(e) {
			case EditOperation.DELETE(s, idx):
				Sure.sure(idx >= 0 && idx < letters.length);
				delete(s, idx);
			case EditOperation.INSERT(s, src, target):
				Sure.sure(target >= 0 && target < letters.length);
				insert(s, src, target);
			case EditOperation.KEEP(s, idx):
				Sure.sure(idx >= 0 && idx < letters.length);
				keep(s, idx);
			case EditOperation.SUBSTITUTE(r, i, idx):
				Sure.sure(idx >= 0 && idx < letters.length);
				substitute(r, i, idx);
			default:
				throw "Unhandled string edit operation encountered";
				return;
		}
		
		layoutLetters();
		signal_operationHandled.dispatch(e);
	}
	
	private function keep(s:String, idx:Int):Void {
		//trace("Keep element " + s + " at index " + idx);
	}
	
	private function insert(s:String, src:Int, target:Int):Void {
		//trace("Insert element " + s + " at index " + target + " from " + src);
		letters.insert(target + 1, getLetter(s));
	}
	
	private function delete(s:String, idx:Int):Void {
		//trace("Delete element " + s + " at index " + idx);
		var letter = letters.splice(idx, 1);
		remove(letter[0]);
	}
	
	private function substitute(r:String, i:String, idx:Int):Void {
		//trace("Remove element " + r + " and replace it with " + i + " at index " + idx);
		remove(letters[idx]);
		//trace("Num letters: " + letters.length);
		letters[idx] = getLetter(i);
	}
	
	private function layoutLetters():Void {
		var cumulativeX:Float = 0;
		var bbox = new Box3();
		for (letter in letters) {
			if(letter.text != " ") {
				bbox.setFromObject(letter);
				letter.position.x = cumulativeX;
				cumulativeX += (bbox.max.x - bbox.min.x) + spacing;
			} else {
				cumulativeX += 100;
			}
		}
	}
	
	private function getLetter(letter:String):TransformingLetter {
		var txt = new TransformingLetter(letter);
		add(txt);
		return txt;
	}
	
	public function destroy():Void {
		
	}
}

// Text that transforms from one string to another by executing a series of edit operations, and tweens nicely too
// NOTE doesn't queue or manage tweens, so text can get misaligned in some circumstances
class TweeningTransformingText extends TransformingText {
	public function new(initialText:String, operations:Array<EditOperation>, spacing:Float = 0) {
		super(initialText, operations, spacing);
	}
	
	override public function retarget(ops:Array<EditOperation>):Void {		
		opIdx = 0;
		operations = ops;
	}
	
	override private function keep(s:String, idx:Int):Void {
		var letter = letters[idx];
		
		Actuate.tween(letter.position, 1, { y: letter.position.y - 20.0 } ).reflect().repeat(1);
	}
	
	override private function insert(s:String, src:Int, target:Int):Void {
		var letter = getLetter(s);
		letter.material.opacity = 0;
		letter.position.y -= 500;
		letters.insert(target + 1, letter);
		
		Actuate.tween(letter.position, 2, { y : letter.position.y + 500 }).ease(Expo.easeInOut);
		Actuate.tween(letter.material, 2, { opacity : 1 }).ease(Expo.easeInOut);
	}
	
	override private function delete(s:String, idx:Int):Void {
		var letters = letters.splice(idx, 1);
		var letter = letters[0];
		
		Actuate.tween(letter.position, 2, { y : letter.position.y + 500 } ).ease(Expo.easeInOut).onComplete(function() {
			remove(letter);
		});
		Actuate.tween(letter.material, 2, { opacity : 0 }).ease(Expo.easeInOut);
	}
	
	override private function substitute(r:String, i:String, idx:Int):Void {
		var oldLetter = letters[idx];
		var newLetter = getLetter(i);
		newLetter.material.opacity = 0;
		newLetter.position.y -= 500;
		letters[idx] = newLetter;
		
		Actuate.tween(oldLetter.position, 2, { y : oldLetter.position.y + 500 }).ease(Expo.easeInOut).onComplete(function() {
			remove(oldLetter);
		});
		Actuate.tween(oldLetter.material, 2, { opacity : 0 }).ease(Expo.easeInOut);
		
		Actuate.tween(newLetter.position, 2, { y : newLetter.position.y + 500 }).ease(Expo.easeInOut);
		Actuate.tween(newLetter.material, 2, { opacity : 1 }).ease(Expo.easeInOut);
	}
}