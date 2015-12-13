package;

import dat.GUI;
import haxe.ds.IntMap;
import haxe.Timer;
import js.Browser;
import motion.Actuate;
import motion.easing.Expo;
import msignal.Signal.Signal0;
import msignal.Signal.Signal1;
import msignal.Signal.Signal2;
import particle.Emitter;
import particle.Group;
import shaders.SkyEffectController;
import StringTransforms.EditOperation;
import three.Color;
import three.CubeGeometry;
import three.ImageUtils;
import three.Mesh;
import three.Object3D;
import three.PerspectiveCamera;
import three.Raycaster;
import three.Scene;
import three.ShaderMaterial;
import three.SphereBufferGeometry;
import three.Vector2;
import three.Vector3;
import three.WebGLRenderer;
import TransformingText.TransformingLetter;
import TransformingText.TweeningTransformingText;
import webgl.Detector;
import webgl.Detector.WebGLSupport;

using markov.util.ArrayExtensions;
using markov.util.FloatExtensions;
using IntExtensions;

class Main {
	public static inline var DEGREES_TO_RAD:Float = 0.01745329;
	public static inline var GAME_VIEWPORT_WIDTH:Float = 800;
	public static inline var GAME_VIEWPORT_HEIGHT:Float = 500;
	private static inline var REPO_URL:String = "https://github.com/Tw1ddle/Ludum-Dare-34";
	private static inline var TWITTER_URL:String = "https://twitter.com/Sam_Twidale";
	private static inline var LUDUM_DARE_URL:String = "http://ludumdare.com/compo/ludum-dare-33/?action=preview&uid=42276"; // TODO
	private static inline var WEBSITE_URL:String = "http://samcodes.co.uk/";
	private static inline var HAXE_URL:String = "http://haxe.org/";
	private static inline var THREEJS_URL:String = "https://github.com/mrdoob/three.js/";
	private static inline var COMPO_TITLE:String = "Ludum Dare 34";
	
	private var strings:Array<Array<String>> = [
		["Twelve days of Christmas...", "Aim for the colored lyrics"],
		["On the first day of Christmas", "My true love gave to me", "A partridge in a pear tree"],
		["On the second day of Christmas", "My true love gave to me", "Two turtle doves", "And a partridge in a pear tree"],
		["On the third day of Christmas", "My true love gave to me", "Three French hens", "Two turtle doves", "And a partridge in a pear tree"],
		["On the fourth day of Christmas", "My true love gave to me", "Four colly birds", "Three French hens", "Two turtle doves", "And a partridge in a pear tree"],
		["On the fifth day of Christmas", "My true love gave to me", "Five golden rings", "Four colly birds", "Three French hens", "Two turtle doves", "And a partridge in a pear tree"],
		["On the sixth day of Christmas", "My true love gave to me", "Six geese a-laying", "Five golden rings", "Four colly birds", "Three French hens", "Two turtle doves", "And a partridge in a pear tree"],
		["On the seventh day of Christmas", "My true love gave to me", "Seven swans a-swimming", "Six geese a-laying", "Five golden rings", "Four colly birds", "Three French hens", "Two turtle doves", "And a partridge in a pear tree"],
		["On the eighth day of Christmas", "My true love gave to me", "Eight maids a-milking", "Seven swans a-swimming", "Six geese a-laying", "Five golden rings", "Four colly birds", "Three French hens", "Two turtle doves", "And a partridge in a pear tree"],
		["On the ninth day of Christmas", "My true love gave to me", "Nine ladies dancing", "Eight maids a-milking", "Seven swans a-swimming", "Six geese a-laying", "Five golden rings", "Four colly birds", "Three French hens", "Two turtle doves", "And a partridge in a pear tree"],
		["On the tenth day of Christmas", "My true love gave to me", "Ten lords a-leaping", "Nine ladies dancing", "Eight maids a-milking", "Seven swans a-swimming", "Six geese a-laying", "Five golden rings", "Four colly birds", "Three French hens", "Two turtle doves", "And a partridge in a pear tree"],
		["On the eleventh day of Christmas", "My true love gave to me", "Eleven pipers piping", "Ten lords a-leaping", "Nine ladies dancing", "Eight maids a-milking", "Seven swans a-swimming", "Six geese a-laying", "Five golden rings", "Four colly birds", "Three French hens", "Two turtle doves", "And a partridge in a pear tree"],
		["On the twelfth day of Christmas", "My true love gave to me", "Twelve drummers drumming", "Eleven pipers piping", "Ten lords a-leaping", "Nine ladies dancing", "Eight maids a-milking", "Seven swans a-swimming", "Six geese a-laying", "Five golden rings", "Four colly birds", "Three French hens", "Two turtle doves", "And a partridge in a pear tree"],
		["Merry Christmas!", "The End..."],
	];
	private var completeLyric:Array<String> = ["On the twelfth day of Christmas", "My true love gave to me", "Twelve drummers drumming", "Eleven pipers piping", "Ten lords a-leaping", "Nine ladies dancing", "Eight maids a-milking", "Seven swans a-swimming", "Six geese a-laying", "Five golden rings", "Four colly birds", "Three French hens", "Two turtle doves", "And a partridge in a pear tree"];
	
	#if debug
	private var guiItemCount:Int = 0;
	public var particleGUI(default, null):GUI; //= new GUI( { autoPlace:true } );
	public var shaderGUI(default, null):GUI; //= new GUI( { autoPlace:true } );
	public var sceneGUI(default, null):GUI; //= new GUI( { autoPlace:true } );
	#end
	
	public var worldScene(default, null):Scene = new Scene();
	public var worldCamera(default, null):PerspectiveCamera;
	
	private var pointer(default, null):Vector2 = new Vector2(0.0, 0.0);
	public var signal_clicked(default, null) = new Signal2<Float, Float>();
	
	private var scoreColorMap:IntMap<Int>;

	private var gameAttachPoint:Dynamic;
	private var renderer:WebGLRenderer;
	public var skyEffectController(default, null):SkyEffectController;
	private var lyricLinesHandled:Int = 0;
	
	private var lastAnimationTime:Float = 0.0; // Last time from requestAnimationFrame
	private var dt:Float = 0.0; // Frame delta time
	
	private var nouns = ["drummers", "pipers", "lords", "ladies", "maids", "swans", "geese", "rings", "birds", "hens", "doves"];
	private var verbs = ["drumming", "piping", "a-leaping", "dancing", "a-milking", "a-swimming", "a-laying", "golden", "colly", "turtle", "in a pear tree"];
	
	private var selectableGroup:Array<SelectableText>;
	public var signal_selectableClicked(default, null) = new Signal1<SelectableText>();
	private var lyrics:LyricsText;
	
	private var score(default, set):Int;
	private var scoreText:TransformingText;
	private var scoreTransformTimer:Timer;
	
    private static function main():Void {
		new Main();
	}
	
	private inline function new() {
		Browser.window.onload = onWindowLoaded;
		
		nouns.reverse();
		verbs.reverse();
	}
	
	private inline function onWindowLoaded():Void {
		// Attach game div
		gameAttachPoint = Browser.document.getElementById("game");		
		var gameDiv = Browser.document.createElement("attach");
		gameAttachPoint.appendChild(gameDiv);
		
		// WebGL support check
		var glSupported:WebGLSupport = Detector.detect();
		if (glSupported != SUPPORTED_AND_ENABLED) {
			var unsupportedInfo = Browser.document.createElement('div');
			unsupportedInfo.style.position = 'absolute';
			unsupportedInfo.style.top = '10px';
			unsupportedInfo.style.width = '100%';
			unsupportedInfo.style.textAlign = 'center';
			unsupportedInfo.style.color = '#ffffff';
			
			switch(glSupported) {
				case WebGLSupport.NOT_SUPPORTED:
					unsupportedInfo.innerHTML = 'Your browser does not support WebGL. Click <a href="' + REPO_URL + '" target="_blank">here for screenshots</a> instead.';
				case WebGLSupport.SUPPORTED_BUT_DISABLED:
					unsupportedInfo.innerHTML = 'Your browser supports WebGL, but the feature appears to be disabled. Click <a href="' + REPO_URL + '" target="_blank">here for screenshots</a> instead.';
				default:
					unsupportedInfo.innerHTML = 'Could not detect WebGL support. Click <a href="' + REPO_URL + '" target="_blank">here for screenshots</a> instead.';
			}
			
			gameDiv.appendChild(unsupportedInfo);
			return;
		}
		
		// Credits and video link
		var credits = Browser.document.createElement('div');
		credits.style.position = 'absolute';
		credits.style.bottom = '-70px';
		credits.style.width = '100%';
		credits.style.textAlign = 'center';
		credits.style.color = '#333333';
		credits.innerHTML = 'Created for <a href=' + LUDUM_DARE_URL + ' target="_blank"> ' + COMPO_TITLE + '</a> using <a href=' + HAXE_URL + ' target="_blank">Haxe</a> and <a href=' + THREEJS_URL + ' target="_blank">three.js</a>. Get the code <a href=' + REPO_URL + ' target="_blank">here</a>. Select colored words for points.';
		gameDiv.appendChild(credits);
		
		// Setup WebGL renderer
        renderer = new WebGLRenderer({ antialias: false });
        renderer.sortObjects = true;
		renderer.autoClear = false;
        renderer.setSize(GAME_VIEWPORT_WIDTH, GAME_VIEWPORT_HEIGHT);
		renderer.setClearColor(new Color(0x222222));
		
		// Setup cameras
        worldCamera = new PerspectiveCamera(30, GAME_VIEWPORT_WIDTH / GAME_VIEWPORT_HEIGHT, 0.5, 2000000);
		
		// Setup world entities
		skyEffectController = new SkyEffectController(this);
		
		var skyMaterial = new ShaderMaterial( {
			fragmentShader: SkyShader.fragmentShader,
			vertexShader: SkyShader.vertexShader,
			uniforms: SkyShader.uniforms,
			side: BackSide
		});
		var skyMesh = new Mesh(new SphereBufferGeometry(450000, 32, 15), skyMaterial); // Note 450000 sky radius is used for calculating the sun fade factor in the sky shader
		
		#if debug
		skyMesh.name = "Sky Mesh";
		#end
		
		worldScene.add(skyMesh);
		
		// Text
		selectableGroup = new Array<SelectableText>();
		
		lyrics = new LyricsText(strings);
		lyrics.position.set(-2731, -1216, -6983);
		lyrics.rotation.set(5.4, 0, 0);
		worldScene.add(lyrics);
		
		scoreColorMap = new IntMap<Int>();
		scoreColorMap.set(0xffffff, 20);
		
		lyrics.transformingText.signal_operationHandled.add(function(op:EditOperation):Void {
			if (lyricLinesHandled > 3) {
				var idx = lyrics.textsIndex;
				var word = Math.random() < 0.5 ? nouns[Std.random(idx).clamp(0, nouns.length - 1)] : verbs[Std.random(idx).clamp(0, nouns.length - 1)];
				worldScene.add(new SelectableText(word, worldScene, selectableGroup));
			}
		});
		lyrics.transformingText.signal_operationsHandled.add(function():Void {
			switch(lyricLinesHandled) {
				case 0:
					skyEffectController.stellarDawn(3);
				case 5:
					skyEffectController.blueDusk(8);
				case 10:
					skyEffectController.bloodSky(10);
				case 15:
					skyEffectController.purpleDusk(8);
				case 20:
					skyEffectController.redSunset(5);
				case 25:
					skyEffectController.alienDay(8);
				case 30:
					skyEffectController.bloodSky(10);
				case 35:
					skyEffectController.stellarDawn(3);
				case 40:
					skyEffectController.alienDay(8);
				case 45:
					skyEffectController.purpleDusk(8);
				case 50:
					skyEffectController.blueDusk(8);
				case 55:
					skyEffectController.redSunset(5);
				case 60:
					skyEffectController.stellarDawn(3);
				case _:				
			}
			lyricLinesHandled++;
			
			var color:Int = Std.int(Math.random() * 0x888888) + 0x888888;
			scoreColorMap.set(color, Std.int(Math.random() * 1000 + 1000));
			for (text in selectableGroup) {
				if (lyrics.target != null && text.text != null && lyrics.target.indexOf(text.text) > 0) {
					untyped text.letter.material.color.setHex(color);
				}
			}
		});
		
		lyrics.signal_allComplete.add(function():Void {
			trace("COMPLETE");
		});
		
		signal_selectableClicked.add(function(item:SelectableText):Void {
			if (!item.clicked) {
				if(untyped item.letter.material.color.getHex() != 0xffffff) {
					score += getScoreForColor(untyped item.letter.material.color.getHex());
				}
			}
			
			item.onClicked();
		});
		
		scoreText = new TransformingText("0", [], 5);
		scoreText.position.set(1600, -1140, -6365);
		scoreText.rotation.set(5.4, 0, 0);
		worldScene.add(scoreText);

		// Event setup
		// Window resize event
		Browser.document.addEventListener('resize', function(event) {
			
		}, false);
		
		// Disable context menu opening
		Browser.document.addEventListener('contextmenu', function(event) {
			event.preventDefault();
		}, true);
		
		signal_clicked.add(function(x:Float, y:Float):Void {
			// Too precise, use bounding box instead
			var raycaster = new Raycaster();
			raycaster.setFromCamera(pointer, worldCamera);
			for (selectable in selectableGroup) {
				var hovereds = raycaster.intersectObjects(selectable.children);
				if (hovereds.length > 0) {
					signal_selectableClicked.dispatch(selectable);
					return;
				}
			}			
		});
		
		// Mouse events
        Browser.document.addEventListener('mousedown', function(event) {
			updateMousePosition(event.x, event.y);
			signal_clicked.dispatch(pointer.x, pointer.y);
        }, true);
		
		// Touch events
        Browser.document.addEventListener('touchstart', function(event) {
			updateMousePosition(event.x, event.y);
			signal_clicked.dispatch(pointer.x, pointer.y);
        }, true);
		
		#if debug
		setupGUI();
		#end
		
		// Score
		score = 0;
		
		// Present game and start animation loop
		gameDiv.appendChild(renderer.domElement);
		Browser.window.requestAnimationFrame(animate);
	}
	
	private function getScoreForColor(color:Int):Int {
		var score:Null<Int> = scoreColorMap.get(color);
		
		if (score == null) {
			return 0;
		}
		
		return score;
	}
	
	private inline function updateMousePosition(x:Float, y:Float):Void {
		pointer.x = FloatExtensions.clamp(((x - gameAttachPoint.offsetLeft) / gameAttachPoint.clientWidth) * 2 - 1, -1, 1);
		pointer.y = FloatExtensions.clamp(-((y - gameAttachPoint.offsetTop) / gameAttachPoint.clientHeight) * 2 + 1, -1, 1);
	}
	
	private function animate(time:Float):Void {
		dt = (time - lastAnimationTime) * 0.001; // Seconds
		lastAnimationTime = time;
		
		// Clear the screen
		renderer.clear();
		renderer.render(worldScene, worldCamera);
		
		Browser.window.requestAnimationFrame(animate);
	}
	
	private function startScoreTransform(previous:Int, next:Int):Void {
		var source = Std.string(previous);
		var target = Std.string(next);
		
		var matrix = EditDistanceMetrics.damerauLevenshteinMatrix(source, target, false);
		var ops = StringTransforms.optimalLevenshteinPath(source, target, matrix);
		scoreText.retarget(ops);
		
		if (scoreTransformTimer != null) {
			scoreTransformTimer.stop();
		}
		scoreTransformTimer = new Timer(100);
		scoreTransformTimer.run = function():Void {
			scoreText.pump();
		};
	}
	
	private function set_score(score:Int):Int {
		if (this.score != null) {
			startScoreTransform(this.score, score);
		}
		
		return this.score = score;
	}
	
	#if debug
	private inline function setupGUI():Void {
		addGUIItem(shaderGUI, skyEffectController, "Sky Shader");
		addGUIItem(sceneGUI, worldCamera, "World Camera");
		addGUIItem(sceneGUI, worldScene, "World Scene");
	}
	
	private function addGUIItem(gui:GUI, object:Dynamic, ?tag:String):GUI {
		if (gui == null || object == null) {
			return null;
		}
		
		var folder:GUI = null;
		
		if (tag != null) {
			folder = gui.addFolder(tag + " (" + guiItemCount++ + ")");
		} else {
			var name:String = Std.string(Reflect.field(object, "name"));
			
			if (name == null || name.length == 0) {
				folder = gui.addFolder("Item (" + guiItemCount++ + ")");
			} else {
				folder = gui.addFolder(Reflect.getProperty(object, "name") + " (" + guiItemCount++ + ")");
			}
		}
		
		if (Std.is(object, Scene)) {
			var scene:Scene = cast object;
			
			for (child in scene.children) {
				addGUIItem(gui, child);
			}
		}
		
		if (Std.is(object, Object3D)) {
			var object3d:Object3D = cast object;
			
			folder.add(object3d.position, 'x', -5000.0, 5000.0, 2).listen();
			folder.add(object3d.position, 'y', -5000.0, 5000.0, 2).listen();
			folder.add(object3d.position, 'z', -20000.0, 20000.0, 2).listen();

			folder.add(object3d.rotation, 'x', 0.0, Math.PI * 2, 0.1).listen();
			folder.add(object3d.rotation, 'y', 0.0, Math.PI * 2, 0.1).listen();
			folder.add(object3d.rotation, 'z', 0.0, Math.PI * 2, 0.1).listen();

			folder.add(object3d.scale, 'x', 0.0, 10.0, 0.1).listen();
			folder.add(object3d.scale, 'y', 0.0, 10.0, 0.1).listen();
			folder.add(object3d.scale, 'z', 0.0, 10.0, 0.1).listen();
		}
		
		if (Std.is(object, Emitter)) {
			var emitter:Emitter = cast object;
			
			gui.add(emitter, 'type', ['cube', 'sphere', 'disk']);
			
			var fields = Reflect.fields(emitter);
			
			for (field in fields) {
				var prop = Reflect.getProperty(emitter, field);
				
				if (Std.is(prop, Color)) {
					var folder = gui.addFolder(field);
					folder.add(prop, 'r', 0, 1, 0.01).listen();
					folder.add(prop, 'g', 0, 1, 0.01).listen();
					folder.add(prop, 'b', 0, 1, 0.01).listen();
				}
				else if (Std.is(prop, Vector3)) {
					var folder = gui.addFolder(field);
					folder.add(prop, 'x', -2000, 2000, 0.1).listen();
					folder.add(prop, 'y', -2000, 2000, 0.1).listen();
					folder.add(prop, 'z', -4000, 4000, 0.1).listen();
				}
				else {
					if(Std.is(prop, Float)) {
						gui.add(emitter, field, 0.04).listen();
					}
				}
			}
		}
		
		if (Std.is(object, SkyEffectController)) {
			var controller:SkyEffectController = cast object;
			controller.addGUIItem(controller, gui);
		}
		
		return folder;
	}
	#end
}

class LyricsText extends three.Group {
	private var texts:Array<Array<String>>;
	public var textsIndex(default, null):Int;
	public var lyricIndex(default, null):Int;
	public var source(default, null):String;
	public var target(default, null):String;
	private var timer:Timer;
	
	public var transformingText(default, null):TweeningTransformingText;
	public var signal_complete(default, null) = new Signal0();
	public var signal_allComplete(default, null) = new Signal0();
	
	public function new(texts:Array<Array<String>>) {
		super();
		
		this.texts = texts;
		
		textsIndex = 0;
		lyricIndex = 0;
		
		source = "Ludum Dare 34";
		target = texts[lyricIndex][0];
		
		var matrix = EditDistanceMetrics.damerauLevenshteinMatrix(source, target, false);
		var ops = StringTransforms.optimalLevenshteinPath(source, target, matrix);
		
		transformingText = new TweeningTransformingText(source, ops);
		add(transformingText);
		
		transformingText.signal_operationHandled.add(function(e:EditOperation):Void {
		});
		
		transformingText.signal_operationsHandled.add(function():Void {
			if (lyricIndex <= texts[textsIndex].length) {
				startTransform();
			} else {
				signal_complete.dispatch();
				
				if (textsIndex < texts[textsIndex].length) {
					textsIndex++;
					lyricIndex = 0;	
					startTransform();
				} else {
					signal_allComplete.dispatch();
				}
			}
		});
		
		startTransform();
	}
	
	private inline function getNext():String {
		if (textsIndex >= texts.length || lyricIndex >= texts[lyricIndex].length) {
			return "";
		}
		
		return texts[textsIndex][lyricIndex++];
	}
	
	private function startTransform():Void {
		source = transformingText.getText();
		target = getNext();
		var matrix = EditDistanceMetrics.damerauLevenshteinMatrix(source, target, false);
		var ops = StringTransforms.optimalLevenshteinPath(source, target, matrix);
		transformingText.retarget(ops);
		
		if (timer != null) {
			timer.stop();
		}
		timer = new Timer(100);
		timer.run = function():Void {
			transformingText.pump();
		};
	}
	
	public function getCurrentWord():String {
		if (textsIndex >= texts.length || lyricIndex >= texts[textsIndex].length) {
			return "";
		}
		
		return texts[textsIndex][lyricIndex];
	}
	
	public function getCurrentWords():Array<String> {
		if (textsIndex >= texts.length) {
			return [];
		}
		
		return texts[textsIndex];
	}
}

class SelectableText extends three.Group {
	public var letter:TransformingLetter;
	private var scene:Scene;
	private var group:Array<SelectableText>;
	public var text(default, null):String;
	public var signal_complete(default, null) = new Signal0();
	public var clicked(default, null):Bool = false;
	
	public function new(text:String, scene:Scene, group:Array<SelectableText>) {
		super();
		this.text = text;
		this.scene = scene;
		letter = new TransformingLetter(text, 80, 0xffffff);
		add(letter);
		this.group = group;
		group.push(this);
		
		// Approx bounding box
		var boundingBox = new Mesh(new CubeGeometry(60 * text.length, 160, 100));
		boundingBox.position.x = 60 * text.length / 2;
		boundingBox.material.visible = false;
		boundingBox.visible = true;
		add(boundingBox);
		
		this.position.set(-5000 + Math.random() * 8400, -340 + Math.random() * 1600, -12042);
		
		letter.material.opacity = 0;
		Actuate.tween(letter.material, 1, { opacity: 1 } ).ease(Expo.easeInOut);
		
		Actuate.tween(this.position, 5, { x: -2331 + Math.random() * 4386, y: -340 + Math.random() * 1600, z: -5442 } ).ease(Expo.easeInOut).onComplete(function():Void {			
			Actuate.tween(letter.material, 1, { opacity: 0 } ).ease(Expo.easeInOut).onComplete(function():Void {
				if(!clicked) {
					signal_complete.dispatch();
					group.remove(this);
					scene.remove(this);
				}
			});
		});
	}
	
	public function onClicked():Void {
		if (!clicked) {
			clicked = true;
		
			Actuate.stop(letter);
			Actuate.stop(letter.material);
			Actuate.stop(this.position);
			
			Actuate.tween(letter.scale, 0.5, { x: 5, y: 5 } ).ease(Expo.easeInOut);
			Actuate.tween(letter.material, 0.5, { opacity: 0 } ).ease(Expo.easeInOut).onComplete(function():Void {
				signal_complete.dispatch();
				group.remove(this);
				scene.remove(this);
			});
		}
	}
}