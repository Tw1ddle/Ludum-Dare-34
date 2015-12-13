package particle;

import three.Color;
import three.Vector3; 

@:native("SPE.Emitter")
extern class Emitter {
	var type:String;
	var particleCount:Float;
	var duration:Float;
	var activeMultiplier:Float;
	var direction:Bool;
	var isStatic:Float;
	var maxAge:Dynamic;
	var position:Dynamic;
	var velocity:Dynamic;
	var acceleration:Dynamic;
	var drag:Dynamic;
	var wiggle:Dynamic;
	var rotation:Dynamic;
	var color:Dynamic;
	var opacity:Dynamic;
	var size:Dynamic;
	var angle:Dynamic;
	
	var userData:Dynamic;
	function new(options:Dynamic):Void;
	function reset(force:Bool):Dynamic;
	function enable():Dynamic;
	function disable():Dynamic;
	function remove():Dynamic;
}