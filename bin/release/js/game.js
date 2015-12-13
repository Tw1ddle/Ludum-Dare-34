(function (console, $global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var _$ArraySet_ArraySet_$Impl_$ = {};
_$ArraySet_ArraySet_$Impl_$.__name__ = true;
_$ArraySet_ArraySet_$Impl_$._new = function(array) {
	return array;
};
_$ArraySet_ArraySet_$Impl_$.create = function(array) {
	if(array == null) return [];
	return _$ArraySet_ArraySet_$Impl_$.toSet(array);
};
_$ArraySet_ArraySet_$Impl_$.intersection = function(this1,set) {
	var result = [];
	var _g = 0;
	while(_g < this1.length) {
		var item = this1[_g];
		++_g;
		if(_$ArraySet_ArraySet_$Impl_$.contains(set,item)) result.push(item);
	}
	return result;
};
_$ArraySet_ArraySet_$Impl_$.union = function(this1,set) {
	return _$ArraySet_ArraySet_$Impl_$.toSet(this1.concat(_$ArraySet_ArraySet_$Impl_$.toArray(set)));
};
_$ArraySet_ArraySet_$Impl_$.unionArray = function(this1,set) {
	return _$ArraySet_ArraySet_$Impl_$.toSet(this1.concat(set));
};
_$ArraySet_ArraySet_$Impl_$.difference = function(this1,set) {
	var result;
	var array = this1.slice();
	result = array;
	var $it0 = HxOverrides.iter(set);
	while( $it0.hasNext() ) {
		var item = $it0.next();
		HxOverrides.remove(result,item);
	}
	var array1 = _$ArraySet_ArraySet_$Impl_$.toArray(result);
	return array1;
};
_$ArraySet_ArraySet_$Impl_$.add = function(this1,v) {
	if(_$ArraySet_ArraySet_$Impl_$.contains(this1,v)) return false;
	this1.push(v);
	return true;
};
_$ArraySet_ArraySet_$Impl_$.copy = function(this1) {
	var array = this1.slice();
	return array;
};
_$ArraySet_ArraySet_$Impl_$.contains = function(this1,v) {
	var _g = 0;
	while(_g < this1.length) {
		var item = this1[_g];
		++_g;
		if(item == v) return true;
	}
	return false;
};
_$ArraySet_ArraySet_$Impl_$.slice = function(this1,pos,end) {
	var array = this1.slice(pos,end);
	return array;
};
_$ArraySet_ArraySet_$Impl_$.splice = function(this1,pos,len) {
	var array = this1.splice(pos,len);
	return array;
};
_$ArraySet_ArraySet_$Impl_$.toArray = function(this1) {
	return this1.slice();
};
_$ArraySet_ArraySet_$Impl_$.toSet = function(array) {
	var set = [];
	var _g = 0;
	while(_g < array.length) {
		var v = array[_g];
		++_g;
		_$ArraySet_ArraySet_$Impl_$.add(set,v);
	}
	return set;
};
var EditDistanceMetrics = function() { };
EditDistanceMetrics.__name__ = true;
EditDistanceMetrics.levenshtein = function(source,target) {
	if(!(source != null && target != null)) throw new js__$Boot_HaxeError("FAIL: source != null && target != null");
	var slen = source.length;
	var tlen = target.length;
	if(slen == 0) return tlen;
	if(tlen == 0) return slen;
	var costs;
	var this1;
	this1 = new Array(tlen + 1);
	costs = this1;
	var _g1 = 0;
	var _g = costs.length;
	while(_g1 < _g) {
		var i = _g1++;
		costs[i] = i;
	}
	var s = 0;
	while(s < source.length) {
		costs[0] = s + 1;
		var corner = s;
		var t = 0;
		while(t < target.length) {
			var upper = costs[t + 1];
			if(source.charAt(s) == target.charAt(t)) costs[t + 1] = corner; else {
				var tc;
				if(upper < corner) tc = upper; else tc = corner;
				costs[t + 1] = (costs[t] < tc?costs[t]:tc) + 1;
			}
			corner = upper;
			t++;
		}
		s++;
	}
	return costs[costs.length - 1];
};
EditDistanceMetrics.damerauLevenshteinMatrix = function(source,target,enableTransposition) {
	if(enableTransposition == null) enableTransposition = true;
	if(!(source != null && target != null)) throw new js__$Boot_HaxeError("FAIL: source != null && target != null");
	var w = source.length;
	var h = target.length;
	if(w == 0 || h == 0) {
		var this1;
		this1 = new Array(0);
		return this1;
	}
	w += 1;
	h += 1;
	var costs;
	var this2;
	this2 = new Array(w * h);
	costs = this2;
	var _g = 0;
	while(_g < w) {
		var i = _g++;
		costs[i] = i;
	}
	var _g1 = 1;
	while(_g1 < h) {
		var j = _g1++;
		costs[j * w] = j;
	}
	var cost = 0;
	var _g2 = 1;
	while(_g2 < w) {
		var x = _g2++;
		var _g11 = 1;
		while(_g11 < h) {
			var y = _g11++;
			if(source.charAt(x - 1) == target.charAt(y - 1)) cost = 0; else cost = 1;
			var val = IntExtensions.min(costs[x - 1 + y * w] + 1,IntExtensions.min(costs[x + (y - 1) * w] + 1,costs[x - 1 + (y - 1) * w] + cost));
			costs[x + y * w] = val;
			if(enableTransposition && x > 1 && y > 1 && source.charAt(x) == target.charAt(y - 1) && source.charAt(x - 1) == target.charAt(y)) {
				var val1 = IntExtensions.min(costs[x + y * w],costs[x - 2 + (y - 2) * w] + cost);
				costs[x + y * w] = val1;
			}
		}
	}
	return costs;
};
EditDistanceMetrics.damerauLevenshtein = function(source,target,enableTransposition) {
	if(enableTransposition == null) enableTransposition = true;
	if(source.length == 0) return target.length;
	if(target.length == 0) return source.length;
	var table = EditDistanceMetrics.damerauLevenshteinMatrix(source,target,enableTransposition);
	return table[table.length - 1];
};
EditDistanceMetrics.jaro = function(first,second) {
	var f = first.length;
	var s = second.length;
	if(f == 0) if(s == 0) return 1.0; else return 0.0;
	var fMatches;
	var this1;
	this1 = new Array(f);
	fMatches = this1;
	var _g = 0;
	while(_g < f) {
		var i = _g++;
		fMatches[i] = false;
	}
	var sMatches;
	var this2;
	this2 = new Array(s);
	sMatches = this2;
	var _g1 = 0;
	while(_g1 < s) {
		var i1 = _g1++;
		sMatches[i1] = false;
	}
	var matchDistance;
	matchDistance = (f > s?f:s) / 2 - 1 | 0;
	var matches = 0;
	var transpositions = 0;
	var _g2 = 0;
	while(_g2 < f) {
		var i2 = _g2++;
		var start = IntExtensions.max(0,i2 - matchDistance);
		var end = IntExtensions.min(i2 + matchDistance + 1,s);
		var _g11 = start;
		while(_g11 < end) {
			var j = _g11++;
			if(sMatches[j]) continue;
			if(first.charAt(i2) != second.charAt(j)) continue;
			fMatches[i2] = true;
			sMatches[j] = true;
			matches++;
			break;
		}
	}
	if(matches == 0) return 0.0;
	var k = 0;
	var _g3 = 0;
	while(_g3 < f) {
		var i3 = _g3++;
		if(!fMatches[i3]) continue;
		while(!sMatches[k]) k++;
		if(first.charAt(i3) != second.charAt(k)) transpositions++;
		k++;
	}
	transpositions *= 0.5;
	var jaro = (matches / f + matches / s + (matches - transpositions) / matches) / 3.0;
	return jaro;
};
EditDistanceMetrics.jaroWinkler = function(first,second,maxPrefixLength) {
	if(maxPrefixLength == null) maxPrefixLength = 4;
	var jaroSimilarity = EditDistanceMetrics.jaro(first,second);
	var prefixLength = 0;
	if(first.length != 0 && second.length != 0) {
		var minLen = IntExtensions.min(first.length,second.length);
		var _g = 0;
		while(_g < minLen) {
			var i = _g++;
			if(first.charAt(i) == second.charAt(i)) {
				prefixLength++;
				if(prefixLength >= maxPrefixLength) break;
			} else break;
		}
	}
	return jaroSimilarity + prefixLength * 0.1 * (1 - jaroSimilarity);
};
EditDistanceMetrics.mongeElkan = function(first,second,similarityMeasure,delimiter) {
	if(delimiter == null) delimiter = " ";
	if(first.length == 0 && second.length == 0) return 1;
	var fTokens = first.split(delimiter);
	var sTokens = second.split(delimiter);
	if(fTokens.length == 0 || sTokens.length == 0) return 0;
	var sum = 0;
	var _g = 0;
	while(_g < fTokens.length) {
		var f = fTokens[_g];
		++_g;
		var max = 0;
		var _g1 = 0;
		while(_g1 < sTokens.length) {
			var s = sTokens[_g1];
			++_g1;
			max = Math.max(max,similarityMeasure(first,second));
		}
		sum += max;
	}
	return sum / fTokens.length;
};
EditDistanceMetrics.diceCoefficient = function(first,second,gramLength) {
	if(!(gramLength >= 1)) throw new js__$Boot_HaxeError("FAIL: gramLength >= 1");
	if(first.length == 0 || second.length == 0 || first.length <= gramLength || second.length <= gramLength) return 0;
	var firstNgrams = _$ArraySet_ArraySet_$Impl_$.create();
	var secondNgrams = _$ArraySet_ArraySet_$Impl_$.create();
	var _g1 = 0;
	var _g = first.length - (gramLength - 1);
	while(_g1 < _g) {
		var i = _g1++;
		_$ArraySet_ArraySet_$Impl_$.add(firstNgrams,HxOverrides.substr(first,i,gramLength));
	}
	var _g11 = 0;
	var _g2 = second.length - (gramLength - 1);
	while(_g11 < _g2) {
		var i1 = _g11++;
		_$ArraySet_ArraySet_$Impl_$.add(secondNgrams,HxOverrides.substr(second,i1,gramLength));
	}
	var intersections;
	var result = [];
	var _g3 = 0;
	while(_g3 < firstNgrams.length) {
		var item = firstNgrams[_g3];
		++_g3;
		if(_$ArraySet_ArraySet_$Impl_$.contains(secondNgrams,item)) result.push(item);
	}
	intersections = result;
	var total = firstNgrams.length + secondNgrams.length;
	var dice = intersections.length * 2.0 / total;
	return dice;
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var IntExtensions = function() { };
IntExtensions.__name__ = true;
IntExtensions.abs = function(v) {
	if(v < 0) return -v;
	return v;
};
IntExtensions.clamp = function(v,min,max) {
	if(v < min) return min;
	if(v > max) return max;
	return v;
};
IntExtensions.clampSym = function(v,bound) {
	if(v < bound) return bound; else if(v > bound) return bound; else return v;
};
IntExtensions.even = function(v) {
	return v % 2 == 0;
};
IntExtensions.odd = function(v) {
	return v % 2 != 0;
};
IntExtensions.max = function(a,b) {
	if(a > b) return a;
	return b;
};
IntExtensions.min = function(a,b) {
	if(a < b) return a;
	return b;
};
IntExtensions.toBool = function(v) {
	return v != 0;
};
IntExtensions.isPow2 = function(v) {
	return v > 0 && (v & v - 1) == 0;
};
IntExtensions.sign = function(x) {
	if(x > 0) return 1; else if(x < 0) return -1; else return 0;
};
var Main = function() {
	this.signal_selectableClicked = new msignal_Signal1();
	this.verbs = ["drumming","piping","a-leaping","dancing","a-milking","a-swimming","a-laying","golden","colly","turtle","in a pear tree"];
	this.nouns = ["drummers","pipers","lords","ladies","maids","swans","geese","rings","birds","hens","doves"];
	this.dt = 0.0;
	this.lastAnimationTime = 0.0;
	this.lyricLinesHandled = 0;
	this.signal_clicked = new msignal_Signal2();
	this.pointer = new THREE.Vector2(0.0,0.0);
	this.worldScene = new THREE.Scene();
	this.completeLyric = ["On the twelfth day of Christmas","My true love gave to me","Twelve drummers drumming","Eleven pipers piping","Ten lords a-leaping","Nine ladies dancing","Eight maids a-milking","Seven swans a-swimming","Six geese a-laying","Five golden rings","Four colly birds","Three French hens","Two turtle doves","And a partridge in a pear tree"];
	this.strings = [["Twelve days of Christmas...","Aim for the colored lyrics"],["On the first day of Christmas","My true love gave to me","A partridge in a pear tree"],["On the second day of Christmas","My true love gave to me","Two turtle doves","And a partridge in a pear tree"],["On the third day of Christmas","My true love gave to me","Three French hens","Two turtle doves","And a partridge in a pear tree"],["On the fourth day of Christmas","My true love gave to me","Four colly birds","Three French hens","Two turtle doves","And a partridge in a pear tree"],["On the fifth day of Christmas","My true love gave to me","Five golden rings","Four colly birds","Three French hens","Two turtle doves","And a partridge in a pear tree"],["On the sixth day of Christmas","My true love gave to me","Six geese a-laying","Five golden rings","Four colly birds","Three French hens","Two turtle doves","And a partridge in a pear tree"],["On the seventh day of Christmas","My true love gave to me","Seven swans a-swimming","Six geese a-laying","Five golden rings","Four colly birds","Three French hens","Two turtle doves","And a partridge in a pear tree"],["On the eighth day of Christmas","My true love gave to me","Eight maids a-milking","Seven swans a-swimming","Six geese a-laying","Five golden rings","Four colly birds","Three French hens","Two turtle doves","And a partridge in a pear tree"],["On the ninth day of Christmas","My true love gave to me","Nine ladies dancing","Eight maids a-milking","Seven swans a-swimming","Six geese a-laying","Five golden rings","Four colly birds","Three French hens","Two turtle doves","And a partridge in a pear tree"],["On the tenth day of Christmas","My true love gave to me","Ten lords a-leaping","Nine ladies dancing","Eight maids a-milking","Seven swans a-swimming","Six geese a-laying","Five golden rings","Four colly birds","Three French hens","Two turtle doves","And a partridge in a pear tree"],["On the eleventh day of Christmas","My true love gave to me","Eleven pipers piping","Ten lords a-leaping","Nine ladies dancing","Eight maids a-milking","Seven swans a-swimming","Six geese a-laying","Five golden rings","Four colly birds","Three French hens","Two turtle doves","And a partridge in a pear tree"],["On the twelfth day of Christmas","My true love gave to me","Twelve drummers drumming","Eleven pipers piping","Ten lords a-leaping","Nine ladies dancing","Eight maids a-milking","Seven swans a-swimming","Six geese a-laying","Five golden rings","Four colly birds","Three French hens","Two turtle doves","And a partridge in a pear tree"],["Merry Christmas!","The End..."]];
	window.onload = $bind(this,this.onWindowLoaded);
	this.nouns.reverse();
	this.verbs.reverse();
};
Main.__name__ = true;
Main.main = function() {
	new Main();
};
Main.prototype = {
	onWindowLoaded: function() {
		var _g = this;
		this.gameAttachPoint = window.document.getElementById("game");
		var gameDiv = window.document.createElement("attach");
		this.gameAttachPoint.appendChild(gameDiv);
		var glSupported = WebGLDetector.detect();
		if(glSupported != 0) {
			var unsupportedInfo = window.document.createElement("div");
			unsupportedInfo.style.position = "absolute";
			unsupportedInfo.style.top = "10px";
			unsupportedInfo.style.width = "100%";
			unsupportedInfo.style.textAlign = "center";
			unsupportedInfo.style.color = "#ffffff";
			switch(glSupported) {
			case 2:
				unsupportedInfo.innerHTML = "Your browser does not support WebGL. Click <a href=\"" + "https://github.com/Tw1ddle/Ludum-Dare-34" + "\" target=\"_blank\">here for screenshots</a> instead.";
				break;
			case 1:
				unsupportedInfo.innerHTML = "Your browser supports WebGL, but the feature appears to be disabled. Click <a href=\"" + "https://github.com/Tw1ddle/Ludum-Dare-34" + "\" target=\"_blank\">here for screenshots</a> instead.";
				break;
			default:
				unsupportedInfo.innerHTML = "Could not detect WebGL support. Click <a href=\"" + "https://github.com/Tw1ddle/Ludum-Dare-34" + "\" target=\"_blank\">here for screenshots</a> instead.";
			}
			gameDiv.appendChild(unsupportedInfo);
			return;
		}
		var credits = window.document.createElement("div");
		credits.style.position = "absolute";
		credits.style.bottom = "-70px";
		credits.style.width = "100%";
		credits.style.textAlign = "center";
		credits.style.color = "#333333";
		credits.innerHTML = "Created for <a href=" + "http://ludumdare.com/compo/ludum-dare-34/?uid=42276" + " target=\"_blank\"> " + "Ludum Dare 34" + "</a> using <a href=" + "http://haxe.org/" + " target=\"_blank\">Haxe</a> and <a href=" + "https://github.com/mrdoob/three.js/" + " target=\"_blank\">three.js</a>. Get the code <a href=" + "https://github.com/Tw1ddle/Ludum-Dare-34" + " target=\"_blank\">here</a>. Select colored words for points.";
		gameDiv.appendChild(credits);
		this.renderer = new THREE.WebGLRenderer({ antialias : false});
		this.renderer.sortObjects = true;
		this.renderer.autoClear = false;
		this.renderer.setSize(800,500);
		this.renderer.setClearColor(new THREE.Color(2236962));
		this.worldCamera = new THREE.PerspectiveCamera(30,1.6,0.5,2000000);
		this.skyEffectController = new shaders_SkyEffectController(this);
		var skyMaterial = new THREE.ShaderMaterial({ fragmentShader : shaders_SkyShader.fragmentShader, vertexShader : shaders_SkyShader.vertexShader, uniforms : shaders_SkyShader.uniforms, side : THREE.BackSide});
		var skyMesh = new THREE.Mesh(new THREE.SphereBufferGeometry(450000,32,15),skyMaterial);
		this.worldScene.add(skyMesh);
		this.selectableGroup = [];
		this.lyrics = new LyricsText(this.strings);
		this.lyrics.position.set(-2731,-1216,-6983);
		this.lyrics.rotation.set(5.4,0,0);
		this.worldScene.add(this.lyrics);
		this.scoreColorMap = new haxe_ds_IntMap();
		this.scoreColorMap.h[16777215] = 20;
		this.lyrics.transformingText.signal_operationHandled.add(function(op) {
			if(_g.lyricLinesHandled > 3) {
				var idx = _g.lyrics.textsIndex;
				var word;
				if(Math.random() < 0.5) word = _g.nouns[IntExtensions.clamp(Std.random(idx),0,_g.nouns.length - 1)]; else word = _g.verbs[IntExtensions.clamp(Std.random(idx),0,_g.nouns.length - 1)];
				_g.worldScene.add(new SelectableText(word,_g.worldScene,_g.selectableGroup));
			}
		});
		this.lyrics.transformingText.signal_operationsHandled.add(function() {
			var _g1 = _g.lyricLinesHandled;
			switch(_g1) {
			case 0:
				_g.skyEffectController.stellarDawn(3);
				break;
			case 5:
				_g.skyEffectController.blueDusk(8);
				break;
			case 10:
				_g.skyEffectController.bloodSky(10);
				break;
			case 15:
				_g.skyEffectController.purpleDusk(8);
				break;
			case 20:
				_g.skyEffectController.redSunset(5);
				break;
			case 25:
				_g.skyEffectController.alienDay(8);
				break;
			case 30:
				_g.skyEffectController.bloodSky(10);
				break;
			case 35:
				_g.skyEffectController.stellarDawn(3);
				break;
			case 40:
				_g.skyEffectController.alienDay(8);
				break;
			case 45:
				_g.skyEffectController.purpleDusk(8);
				break;
			case 50:
				_g.skyEffectController.blueDusk(8);
				break;
			case 55:
				_g.skyEffectController.redSunset(5);
				break;
			case 60:
				_g.skyEffectController.stellarDawn(3);
				break;
			default:
			}
			_g.lyricLinesHandled++;
			var color = Std["int"](Math.random() * 8947848) + 8947848;
			_g.scoreColorMap.set(color,Std["int"](Math.random() * 1000 + 1000));
			var _g11 = 0;
			var _g2 = _g.selectableGroup;
			while(_g11 < _g2.length) {
				var text = _g2[_g11];
				++_g11;
				if(_g.lyrics.target != null && text.text != null && _g.lyrics.target.indexOf(text.text) > 0) text.letter.material.color.setHex(color);
			}
		});
		this.lyrics.signal_allComplete.add(function() {
			null;
		});
		this.signal_selectableClicked.add(function(item) {
			if(!item.clicked) {
				if(item.letter.material.color.getHex() != 16777215) {
					var _g12 = _g;
					_g12.set_score(_g12.score + _g.getScoreForColor(item.letter.material.color.getHex()));
				}
			}
			item.onClicked();
		});
		this.scoreText = new TransformingText("0",[],5);
		this.scoreText.position.set(1600,-1140,-6365);
		this.scoreText.rotation.set(5.4,0,0);
		this.worldScene.add(this.scoreText);
		window.document.addEventListener("resize",function(event) {
		},false);
		window.document.addEventListener("contextmenu",function(event1) {
			event1.preventDefault();
		},true);
		this.signal_clicked.add(function(x,y) {
			var raycaster = new THREE.Raycaster();
			raycaster.setFromCamera(_g.pointer,_g.worldCamera);
			var _g13 = 0;
			var _g21 = _g.selectableGroup;
			while(_g13 < _g21.length) {
				var selectable = _g21[_g13];
				++_g13;
				var hovereds = raycaster.intersectObjects(selectable.children);
				if(hovereds.length > 0) {
					_g.signal_selectableClicked.dispatch(selectable);
					return;
				}
			}
		});
		window.document.addEventListener("mousedown",function(event2) {
			_g.pointer.x = markov_util_FloatExtensions.clamp((event2.x - _g.gameAttachPoint.offsetLeft) / _g.gameAttachPoint.clientWidth * 2 - 1,-1,1);
			_g.pointer.y = markov_util_FloatExtensions.clamp(-((event2.y - _g.gameAttachPoint.offsetTop) / _g.gameAttachPoint.clientHeight) * 2 + 1,-1,1);
			_g.signal_clicked.dispatch(_g.pointer.x,_g.pointer.y);
		},true);
		window.document.addEventListener("touchstart",function(event3) {
			_g.pointer.x = markov_util_FloatExtensions.clamp((event3.x - _g.gameAttachPoint.offsetLeft) / _g.gameAttachPoint.clientWidth * 2 - 1,-1,1);
			_g.pointer.y = markov_util_FloatExtensions.clamp(-((event3.y - _g.gameAttachPoint.offsetTop) / _g.gameAttachPoint.clientHeight) * 2 + 1,-1,1);
			_g.signal_clicked.dispatch(_g.pointer.x,_g.pointer.y);
		},true);
		this.set_score(0);
		gameDiv.appendChild(this.renderer.domElement);
		window.requestAnimationFrame($bind(this,this.animate));
	}
	,getScoreForColor: function(color) {
		var score = this.scoreColorMap.h[color];
		if(score == null) return 0;
		return score;
	}
	,updateMousePosition: function(x,y) {
		this.pointer.x = markov_util_FloatExtensions.clamp((x - this.gameAttachPoint.offsetLeft) / this.gameAttachPoint.clientWidth * 2 - 1,-1,1);
		this.pointer.y = markov_util_FloatExtensions.clamp(-((y - this.gameAttachPoint.offsetTop) / this.gameAttachPoint.clientHeight) * 2 + 1,-1,1);
	}
	,animate: function(time) {
		this.dt = (time - this.lastAnimationTime) * 0.001;
		this.lastAnimationTime = time;
		this.renderer.clear();
		this.renderer.render(this.worldScene,this.worldCamera);
		window.requestAnimationFrame($bind(this,this.animate));
	}
	,startScoreTransform: function(previous,next) {
		var _g = this;
		var source;
		if(previous == null) source = "null"; else source = "" + previous;
		var target;
		if(next == null) target = "null"; else target = "" + next;
		var matrix = EditDistanceMetrics.damerauLevenshteinMatrix(source,target,false);
		var ops = StringTransforms.optimalLevenshteinPath(source,target,matrix);
		this.scoreText.retarget(ops);
		if(this.scoreTransformTimer != null) this.scoreTransformTimer.stop();
		this.scoreTransformTimer = new haxe_Timer(100);
		this.scoreTransformTimer.run = function() {
			_g.scoreText.pump();
		};
	}
	,set_score: function(score) {
		if(this.score != null) this.startScoreTransform(this.score,score);
		return this.score = score;
	}
	,__class__: Main
	,__properties__: {set_score:"set_score"}
};
var LyricsText = function(texts) {
	this.signal_allComplete = new msignal_Signal0();
	this.signal_complete = new msignal_Signal0();
	var _g = this;
	THREE.Group.call(this);
	this.texts = texts;
	this.textsIndex = 0;
	this.lyricIndex = 0;
	this.source = "Ludum Dare 34";
	this.target = texts[this.lyricIndex][0];
	var matrix = EditDistanceMetrics.damerauLevenshteinMatrix(this.source,this.target,false);
	var ops = StringTransforms.optimalLevenshteinPath(this.source,this.target,matrix);
	this.transformingText = new TweeningTransformingText(this.source,ops);
	this.add(this.transformingText);
	this.transformingText.signal_operationHandled.add(function(e) {
	});
	this.transformingText.signal_operationsHandled.add(function() {
		if(_g.lyricIndex <= texts[_g.textsIndex].length) _g.startTransform(); else {
			_g.signal_complete.dispatch();
			if(_g.textsIndex < texts[_g.textsIndex].length) {
				_g.textsIndex++;
				_g.lyricIndex = 0;
				_g.startTransform();
			} else _g.signal_allComplete.dispatch();
		}
	});
	this.startTransform();
};
LyricsText.__name__ = true;
LyricsText.__super__ = THREE.Group;
LyricsText.prototype = $extend(THREE.Group.prototype,{
	getNext: function() {
		if(this.textsIndex >= this.texts.length || this.lyricIndex >= this.texts[this.lyricIndex].length) return "";
		return this.texts[this.textsIndex][this.lyricIndex++];
	}
	,startTransform: function() {
		var _g = this;
		this.source = this.transformingText.getText();
		if(this.textsIndex >= this.texts.length || this.lyricIndex >= this.texts[this.lyricIndex].length) this.target = ""; else this.target = this.texts[this.textsIndex][this.lyricIndex++];
		var matrix = EditDistanceMetrics.damerauLevenshteinMatrix(this.source,this.target,false);
		var ops = StringTransforms.optimalLevenshteinPath(this.source,this.target,matrix);
		this.transformingText.retarget(ops);
		if(this.timer != null) this.timer.stop();
		this.timer = new haxe_Timer(100);
		this.timer.run = function() {
			_g.transformingText.pump();
		};
	}
	,getCurrentWord: function() {
		if(this.textsIndex >= this.texts.length || this.lyricIndex >= this.texts[this.textsIndex].length) return "";
		return this.texts[this.textsIndex][this.lyricIndex];
	}
	,getCurrentWords: function() {
		if(this.textsIndex >= this.texts.length) return [];
		return this.texts[this.textsIndex];
	}
	,__class__: LyricsText
});
var SelectableText = function(text,scene,group) {
	this.clicked = false;
	this.signal_complete = new msignal_Signal0();
	var _g = this;
	THREE.Group.call(this);
	this.text = text;
	this.scene = scene;
	this.letter = new TransformingLetter(text,80,16777215);
	this.add(this.letter);
	this.group = group;
	group.push(this);
	var boundingBox = new THREE.Mesh(new THREE.CubeGeometry(60 * text.length,160,100));
	boundingBox.position.x = 60 * text.length / 2;
	boundingBox.material.visible = false;
	boundingBox.visible = true;
	this.add(boundingBox);
	this.position.set(-5000 + Math.random() * 8400,-340 + Math.random() * 1600,-12042);
	this.letter.material.opacity = 0;
	motion_Actuate.tween(this.letter.material,1,{ opacity : 1}).ease(motion_easing_Expo.get_easeInOut());
	motion_Actuate.tween(this.position,5,{ x : -2331 + Math.random() * 4386, y : -340 + Math.random() * 1600, z : -5442}).ease(motion_easing_Expo.get_easeInOut()).onComplete(function() {
		motion_Actuate.tween(_g.letter.material,1,{ opacity : 0}).ease(motion_easing_Expo.get_easeInOut()).onComplete(function() {
			if(!_g.clicked) {
				_g.signal_complete.dispatch();
				HxOverrides.remove(group,_g);
				scene.remove(_g);
			}
		});
	});
};
SelectableText.__name__ = true;
SelectableText.__super__ = THREE.Group;
SelectableText.prototype = $extend(THREE.Group.prototype,{
	onClicked: function() {
		var _g = this;
		if(!this.clicked) {
			this.clicked = true;
			motion_Actuate.stop(this.letter);
			motion_Actuate.stop(this.letter.material);
			motion_Actuate.stop(this.position);
			motion_Actuate.tween(this.letter.scale,0.5,{ x : 5, y : 5}).ease(motion_easing_Expo.get_easeInOut());
			motion_Actuate.tween(this.letter.material,0.5,{ opacity : 0}).ease(motion_easing_Expo.get_easeInOut()).onComplete(function() {
				_g.signal_complete.dispatch();
				HxOverrides.remove(_g.group,_g);
				_g.scene.remove(_g);
			});
		}
	}
	,__class__: SelectableText
});
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var EditOperation = { __ename__ : true, __constructs__ : ["KEEP","INSERT","DELETE","SUBSTITUTE"] };
EditOperation.KEEP = function(s,source) { var $x = ["KEEP",0,s,source]; $x.__enum__ = EditOperation; $x.toString = $estr; return $x; };
EditOperation.INSERT = function(s,source,target) { var $x = ["INSERT",1,s,source,target]; $x.__enum__ = EditOperation; $x.toString = $estr; return $x; };
EditOperation.DELETE = function(s,idx) { var $x = ["DELETE",2,s,idx]; $x.__enum__ = EditOperation; $x.toString = $estr; return $x; };
EditOperation.SUBSTITUTE = function(remove,insert,idx) { var $x = ["SUBSTITUTE",3,remove,insert,idx]; $x.__enum__ = EditOperation; $x.toString = $estr; return $x; };
var StringTransforms = function() { };
StringTransforms.__name__ = true;
StringTransforms.optimalLevenshteinPath = function(source,target,matrix) {
	var ops = [];
	if(matrix.length == 0) return ops;
	var x = source.length;
	var y = target.length;
	var w = x + 1;
	var h = y + 1;
	var current = StringTransforms.idx(x,y,w,h);
	while(matrix[current] != 0) {
		var left = StringTransforms.idx(x - 1,y,w,h);
		var right = StringTransforms.idx(x + 1,y,w,h);
		var upper = StringTransforms.idx(x,y - 1,w,h);
		var lower = StringTransforms.idx(x,y + 1,w,h);
		var diagonal = StringTransforms.idx(x - 1,y - 1,w,h);
		current = StringTransforms.idx(x,y,w,h);
		if(matrix[current] == 0) break;
		if(matrix[upper] <= matrix[left] && (matrix[current] == matrix[upper] || matrix[current] - 1 == matrix[upper])) {
			ops.push(EditOperation.INSERT(target.charAt(y - 1),y - 1,x - 1));
			y--;
		} else if(matrix[diagonal] <= matrix[left] && matrix[diagonal] <= matrix[upper] && (matrix[current] == matrix[diagonal] || matrix[current] - 1 == matrix[diagonal])) {
			if(matrix[current] - 1 == matrix[diagonal]) {
				if(y - 1 < 0) ops.push(EditOperation.DELETE(source.charAt(x - 1),x - 1)); else ops.push(EditOperation.SUBSTITUTE(source.charAt(x - 1),target.charAt(y - 1),x - 1));
				x--;
				y--;
			} else {
				ops.push(EditOperation.KEEP(source.charAt(x - 1),x - 1));
				x--;
				y--;
			}
		} else {
			ops.push(EditOperation.DELETE(source.charAt(x - 1),x - 1));
			x--;
		}
	}
	return ops;
};
StringTransforms.idx = function(x,y,w,h) {
	x = IntExtensions.clamp(x,0,w - 1);
	y = IntExtensions.clamp(y,0,h - 1);
	return x + y * w;
};
var TransformingLetter = function(text,size,color) {
	if(color == null) color = 16777215;
	if(size == null) size = 220;
	this.text = text;
	var material = new THREE.MeshBasicMaterial({ transparent : true, opacity : 1.0, color : color});
	var geometry = new THREE.TextGeometry(text,{ size : size, height : 12, curveSegments : 3, bevelEnabled : false, material : material, extrudeMaterial : 1});
	THREE.Mesh.call(this,geometry,material);
	geometry.computeBoundingBox();
	geometry.computeVertexNormals();
	this.name = "Letter: " + text;
};
TransformingLetter.__name__ = true;
TransformingLetter.__super__ = THREE.Mesh;
TransformingLetter.prototype = $extend(THREE.Mesh.prototype,{
	__class__: TransformingLetter
});
var TransformingText = function(initialText,operations,spacing) {
	if(spacing == null) spacing = 0;
	this.signal_operationsHandled = new msignal_Signal0();
	this.signal_operationHandled = new msignal_Signal1();
	THREE.Group.call(this);
	this.letters = [];
	this.operations = operations;
	this.spacing = spacing;
	var _g1 = 0;
	var _g = initialText.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.letters.push(this.getLetter(initialText.charAt(i)));
	}
	this.opIdx = 0;
	this.layoutLetters();
};
TransformingText.__name__ = true;
TransformingText.__super__ = THREE.Group;
TransformingText.prototype = $extend(THREE.Group.prototype,{
	pump: function() {
		if(!(this.opIdx >= 0)) throw new js__$Boot_HaxeError("FAIL: opIdx >= 0");
		if(this.opIdx < this.operations.length) {
			this.handle(this.operations[this.opIdx]);
			this.opIdx++;
		} else this.signal_operationsHandled.dispatch();
	}
	,retarget: function(ops) {
		while(this.opIdx < this.operations.length) {
			this.handle(this.operations[this.opIdx]);
			this.opIdx++;
		}
		this.opIdx = 0;
		this.operations = ops;
	}
	,getText: function() {
		var s = "";
		var _g = 0;
		var _g1 = this.letters;
		while(_g < _g1.length) {
			var letter = _g1[_g];
			++_g;
			s += letter.text;
		}
		return s;
	}
	,handle: function(e) {
		switch(e[1]) {
		case 2:
			var idx = e[3];
			var s = e[2];
			if(!(idx >= 0 && idx < this.letters.length)) throw new js__$Boot_HaxeError("FAIL: idx >= 0 && idx < letters.length");
			this["delete"](s,idx);
			break;
		case 1:
			var target = e[4];
			var src = e[3];
			var s1 = e[2];
			if(!(target >= 0 && target < this.letters.length)) throw new js__$Boot_HaxeError("FAIL: target >= 0 && target < letters.length");
			this.insert(s1,src,target);
			break;
		case 0:
			var idx1 = e[3];
			var s2 = e[2];
			if(!(idx1 >= 0 && idx1 < this.letters.length)) throw new js__$Boot_HaxeError("FAIL: idx >= 0 && idx < letters.length");
			this.keep(s2,idx1);
			break;
		case 3:
			var idx2 = e[4];
			var i = e[3];
			var r = e[2];
			if(!(idx2 >= 0 && idx2 < this.letters.length)) throw new js__$Boot_HaxeError("FAIL: idx >= 0 && idx < letters.length");
			this.substitute(r,i,idx2);
			break;
		}
		this.layoutLetters();
		this.signal_operationHandled.dispatch(e);
	}
	,keep: function(s,idx) {
	}
	,insert: function(s,src,target) {
		var x = this.getLetter(s);
		this.letters.splice(target + 1,0,x);
	}
	,'delete': function(s,idx) {
		var letter = this.letters.splice(idx,1);
		this.remove(letter[0]);
	}
	,substitute: function(r,i,idx) {
		this.remove(this.letters[idx]);
		this.letters[idx] = this.getLetter(i);
	}
	,layoutLetters: function() {
		var cumulativeX = 0;
		var bbox = new THREE.Box3();
		var _g = 0;
		var _g1 = this.letters;
		while(_g < _g1.length) {
			var letter = _g1[_g];
			++_g;
			if(letter.text != " ") {
				bbox.setFromObject(letter);
				letter.position.x = cumulativeX;
				cumulativeX += bbox.max.x - bbox.min.x + this.spacing;
			} else cumulativeX += 100;
		}
	}
	,getLetter: function(letter) {
		var txt = new TransformingLetter(letter);
		this.add(txt);
		return txt;
	}
	,destroy: function() {
	}
	,__class__: TransformingText
});
var TweeningTransformingText = function(initialText,operations,spacing) {
	if(spacing == null) spacing = 0;
	TransformingText.call(this,initialText,operations,spacing);
};
TweeningTransformingText.__name__ = true;
TweeningTransformingText.__super__ = TransformingText;
TweeningTransformingText.prototype = $extend(TransformingText.prototype,{
	retarget: function(ops) {
		this.opIdx = 0;
		this.operations = ops;
	}
	,keep: function(s,idx) {
		var letter = this.letters[idx];
		motion_Actuate.tween(letter.position,1,{ y : letter.position.y - 20.0}).reflect().repeat(1);
	}
	,insert: function(s,src,target) {
		var letter = this.getLetter(s);
		letter.material.opacity = 0;
		letter.position.y -= 500;
		this.letters.splice(target + 1,0,letter);
		motion_Actuate.tween(letter.position,2,{ y : letter.position.y + 500}).ease(motion_easing_Expo.get_easeInOut());
		motion_Actuate.tween(letter.material,2,{ opacity : 1}).ease(motion_easing_Expo.get_easeInOut());
	}
	,'delete': function(s,idx) {
		var _g = this;
		var letters = this.letters.splice(idx,1);
		var letter = letters[0];
		motion_Actuate.tween(letter.position,2,{ y : letter.position.y + 500}).ease(motion_easing_Expo.get_easeInOut()).onComplete(function() {
			_g.remove(letter);
		});
		motion_Actuate.tween(letter.material,2,{ opacity : 0}).ease(motion_easing_Expo.get_easeInOut());
	}
	,substitute: function(r,i,idx) {
		var _g = this;
		var oldLetter = this.letters[idx];
		var newLetter = this.getLetter(i);
		newLetter.material.opacity = 0;
		newLetter.position.y -= 500;
		this.letters[idx] = newLetter;
		motion_Actuate.tween(oldLetter.position,2,{ y : oldLetter.position.y + 500}).ease(motion_easing_Expo.get_easeInOut()).onComplete(function() {
			_g.remove(oldLetter);
		});
		motion_Actuate.tween(oldLetter.material,2,{ opacity : 0}).ease(motion_easing_Expo.get_easeInOut());
		motion_Actuate.tween(newLetter.position,2,{ y : newLetter.position.y + 500}).ease(motion_easing_Expo.get_easeInOut());
		motion_Actuate.tween(newLetter.material,2,{ opacity : 1}).ease(motion_easing_Expo.get_easeInOut());
	}
	,__class__: TweeningTransformingText
});
var Type = function() { };
Type.__name__ = true;
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = true;
haxe_Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
haxe_ds_ObjectMap.__name__ = true;
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,__class__: haxe_ds_ObjectMap
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var markov_util_ArrayExtensions = function() { };
markov_util_ArrayExtensions.__name__ = true;
markov_util_ArrayExtensions.randomElementFromArrays = function(arrays) {
	if(!(arrays != null && arrays.length != 0)) throw new js__$Boot_HaxeError("FAIL: arrays != null && arrays.length != 0");
	var totalLength = 0;
	var lengths = [];
	var _g = 0;
	while(_g < arrays.length) {
		var array = arrays[_g];
		++_g;
		if(!(array != null && array.length != 0)) throw new js__$Boot_HaxeError("FAIL: array != null && array.length != 0");
		totalLength += array.length;
		lengths.push(totalLength);
	}
	var n = Math.random() * totalLength;
	var i = 0;
	while(i < lengths.length) {
		if(n < lengths[i]) return markov_util_ArrayExtensions.randomElement(arrays[i]);
		i++;
	}
	throw new js__$Boot_HaxeError("Failed to get random element");
};
markov_util_ArrayExtensions.randomElement = function(array) {
	if(!(array != null && array.length != 0)) throw new js__$Boot_HaxeError("FAIL: array != null && array.length != 0");
	return array[Std.random(array.length)];
};
markov_util_ArrayExtensions.noNulls = function(array) {
	if(!(array != null)) throw new js__$Boot_HaxeError("FAIL: array != null");
	var _g = 0;
	while(_g < array.length) {
		var e = array[_g];
		++_g;
		if(e == null) return false;
	}
	return true;
};
markov_util_ArrayExtensions.binarySearchCmp = function(a,x,min,max,comparator) {
	if(!(a != null)) throw new js__$Boot_HaxeError("FAIL: a != null");
	if(!(min >= 0 && min < a.length)) throw new js__$Boot_HaxeError("FAIL: min >= 0 && min < a.length");
	if(!(max >= 0 && max < a.length)) throw new js__$Boot_HaxeError("FAIL: max >= 0 && max < a.length");
	if(!(comparator != null)) throw new js__$Boot_HaxeError("FAIL: comparator != null");
	var low = min;
	var high = max + 1;
	var middle;
	while(low < high) {
		middle = low + (high - low >> 1);
		if(comparator(a[middle],x) < 0) low = middle + 1; else high = middle;
	}
	if(low <= max && comparator(a[low],x) == 0) return low; else return ~low;
};
markov_util_ArrayExtensions.binarySearch = function(a,x,min,max) {
	if(!(a != null)) throw new js__$Boot_HaxeError("FAIL: a != null");
	if(!(min >= 0 && min < a.length)) throw new js__$Boot_HaxeError("FAIL: min >= 0 && min < a.length");
	if(!(max >= 0 && max < a.length)) throw new js__$Boot_HaxeError("FAIL: max >= 0 && max < a.length");
	var low = min;
	var high = max + 1;
	var middle;
	while(low < high) {
		middle = low + (high - low >> 1);
		if(a[middle] < x) low = middle + 1; else high = middle;
	}
	if(low <= max && a[low] == x) return low; else return ~low;
};
var markov_util_FileReader = function() { };
markov_util_FileReader.__name__ = true;
var markov_util_FloatExtensions = function() { };
markov_util_FloatExtensions.__name__ = true;
markov_util_FloatExtensions.clamp = function(v,min,max) {
	if(v < min) return min; else if(v > max) return max; else return v;
};
markov_util_FloatExtensions.max = function(a,b) {
	if(a > b) return a; else return b;
};
markov_util_FloatExtensions.min = function(a,b) {
	if(a < b) return a; else return b;
};
markov_util_FloatExtensions.inRangeInclusive = function(p,x1,x2) {
	return p >= Math.min(x1,x2) && p <= Math.max(x1,x2);
};
markov_util_FloatExtensions.inRangeExclusive = function(p,x1,x2) {
	return p > Math.min(x1,x2) && p < Math.max(x1,x2);
};
markov_util_FloatExtensions.lerp = function(v,a,b) {
	return (b - a) * v + a;
};
markov_util_FloatExtensions.coslerp = function(v,a,b) {
	var c = (1 - Math.cos(v * Math.PI)) / 2;
	return a * (1 - c) + b * c;
};
markov_util_FloatExtensions.sign = function(x) {
	if(x > 0) return 1; else if(x < 0) return -1; else return 0;
};
markov_util_FloatExtensions.fpart = function(x) {
	if(x < 0) return 1 - (x - Math.floor(x)); else return x - Math.floor(x);
};
markov_util_FloatExtensions.rfpart = function(x) {
	return 1.0 - (x < 0?1 - (x - Math.floor(x)):x - Math.floor(x));
};
markov_util_FloatExtensions.wrap = function(x,lower,upper) {
	if(!(lower <= upper)) throw new js__$Boot_HaxeError("FAIL: lower <= upper");
	var range = upper - lower + 1;
	x = (x - lower) % range;
	if(x < 0) return upper + 1 + x; else return lower + x;
};
var markov_util_StringExtensions = function() { };
markov_util_StringExtensions.__name__ = true;
markov_util_StringExtensions.reverse = function(s) {
	if(!(s != null)) throw new js__$Boot_HaxeError("FAIL: s != null");
	var arr = s.split("");
	arr.reverse();
	return arr.join("");
};
markov_util_StringExtensions.repeat = function(s,times) {
	if(!(s != null)) throw new js__$Boot_HaxeError("FAIL: s != null");
	if(!(times >= 1)) throw new js__$Boot_HaxeError("FAIL: times >= 1");
	var output = "";
	var _g = 0;
	while(_g < times) {
		var i = _g++;
		output += s;
	}
	return output;
};
markov_util_StringExtensions.contains = function(s,substr) {
	return s.indexOf(substr) >= 0;
};
markov_util_StringExtensions.capitalize = function(s) {
	return HxOverrides.substr(s,0,1).toUpperCase() + HxOverrides.substr(s,1,s.length - 1);
};
var motion_actuators_IGenericActuator = function() { };
motion_actuators_IGenericActuator.__name__ = true;
motion_actuators_IGenericActuator.prototype = {
	__class__: motion_actuators_IGenericActuator
};
var motion_actuators_GenericActuator = function(target,duration,properties) {
	this._autoVisible = true;
	this._delay = 0;
	this._reflect = false;
	this._repeat = 0;
	this._reverse = false;
	this._smartRotation = false;
	this._snapping = false;
	this.special = false;
	this.target = target;
	this.properties = properties;
	this.duration = duration;
	this._ease = motion_Actuate.defaultEase;
};
motion_actuators_GenericActuator.__name__ = true;
motion_actuators_GenericActuator.__interfaces__ = [motion_actuators_IGenericActuator];
motion_actuators_GenericActuator.prototype = {
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,i)) Reflect.setField(this.target,i,Reflect.field(this.properties,i)); else Reflect.setProperty(this.target,i,Reflect.field(this.properties,i));
		}
	}
	,autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		return this;
	}
	,callMethod: function(method,params) {
		if(params == null) params = [];
		return Reflect.callMethod(method,method,params);
	}
	,change: function() {
		if(this._onUpdate != null) this.callMethod(this._onUpdate,this._onUpdateParams);
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		if(sendEvent) {
			this.change();
			if(this._onComplete != null) this.callMethod(this._onComplete,this._onCompleteParams);
		}
		motion_Actuate.unload(this);
	}
	,delay: function(duration) {
		this._delay = duration;
		return this;
	}
	,ease: function(easing) {
		this._ease = easing;
		return this;
	}
	,move: function() {
	}
	,onComplete: function(handler,parameters) {
		this._onComplete = handler;
		if(parameters == null) this._onCompleteParams = []; else this._onCompleteParams = parameters;
		if(this.duration == 0) this.complete();
		return this;
	}
	,onRepeat: function(handler,parameters) {
		this._onRepeat = handler;
		if(parameters == null) this._onRepeatParams = []; else this._onRepeatParams = parameters;
		return this;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		return this;
	}
	,onPause: function(handler,parameters) {
		this._onPause = handler;
		if(parameters == null) this._onPauseParams = []; else this._onPauseParams = parameters;
		return this;
	}
	,onResume: function(handler,parameters) {
		this._onResume = handler;
		if(parameters == null) this._onResumeParams = []; else this._onResumeParams = parameters;
		return this;
	}
	,pause: function() {
		if(this._onPause != null) this.callMethod(this._onPause,this._onPauseParams);
	}
	,reflect: function(value) {
		if(value == null) value = true;
		this._reflect = value;
		this.special = true;
		return this;
	}
	,repeat: function(times) {
		if(times == null) times = -1;
		this._repeat = times;
		return this;
	}
	,resume: function() {
		if(this._onResume != null) this.callMethod(this._onResume,this._onResumeParams);
	}
	,reverse: function(value) {
		if(value == null) value = true;
		this._reverse = value;
		this.special = true;
		return this;
	}
	,smartRotation: function(value) {
		if(value == null) value = true;
		this._smartRotation = value;
		this.special = true;
		return this;
	}
	,snapping: function(value) {
		if(value == null) value = true;
		this._snapping = value;
		this.special = true;
		return this;
	}
	,stop: function(properties,complete,sendEvent) {
	}
	,__class__: motion_actuators_GenericActuator
};
var motion_actuators_SimpleActuator = function(target,duration,properties) {
	this.active = true;
	this.propertyDetails = [];
	this.sendChange = false;
	this.paused = false;
	this.cacheVisible = false;
	this.initialized = false;
	this.setVisible = false;
	this.toggleVisible = false;
	this.startTime = haxe_Timer.stamp();
	motion_actuators_GenericActuator.call(this,target,duration,properties);
	if(!motion_actuators_SimpleActuator.addedEvent) {
		motion_actuators_SimpleActuator.addedEvent = true;
		motion_actuators_SimpleActuator.timer = new haxe_Timer(33);
		motion_actuators_SimpleActuator.timer.run = motion_actuators_SimpleActuator.stage_onEnterFrame;
	}
};
motion_actuators_SimpleActuator.__name__ = true;
motion_actuators_SimpleActuator.stage_onEnterFrame = function() {
	var currentTime = haxe_Timer.stamp();
	var actuator;
	var j = 0;
	var cleanup = false;
	var _g1 = 0;
	var _g = motion_actuators_SimpleActuator.actuatorsLength;
	while(_g1 < _g) {
		var i = _g1++;
		actuator = motion_actuators_SimpleActuator.actuators[j];
		if(actuator != null && actuator.active) {
			if(currentTime >= actuator.timeOffset) actuator.update(currentTime);
			j++;
		} else {
			motion_actuators_SimpleActuator.actuators.splice(j,1);
			--motion_actuators_SimpleActuator.actuatorsLength;
		}
	}
};
motion_actuators_SimpleActuator.__super__ = motion_actuators_GenericActuator;
motion_actuators_SimpleActuator.prototype = $extend(motion_actuators_GenericActuator.prototype,{
	setField_motion_actuators_MotionPathActuator_T: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) target[propertyName] = value; else Reflect.setProperty(target,propertyName,value);
	}
	,setField_motion_actuators_SimpleActuator_T: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) target[propertyName] = value; else Reflect.setProperty(target,propertyName,value);
	}
	,autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		if(!value) {
			this.toggleVisible = false;
			if(this.setVisible) this.setField_motion_actuators_SimpleActuator_T(this.target,"visible",this.cacheVisible);
		}
		return this;
	}
	,delay: function(duration) {
		this._delay = duration;
		this.timeOffset = this.startTime + duration;
		return this;
	}
	,getField: function(target,propertyName) {
		var value = null;
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) value = Reflect.field(target,propertyName); else value = Reflect.getProperty(target,propertyName);
		return value;
	}
	,initialize: function() {
		var details;
		var start;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			var isField = true;
			if(Object.prototype.hasOwnProperty.call(this.target,i)) start = Reflect.field(this.target,i); else {
				isField = false;
				start = Reflect.getProperty(this.target,i);
			}
			if(typeof(start) == "number") {
				var value = this.getField(this.properties,i);
				if(start == null) start = 0;
				if(value == null) value = 0;
				details = new motion_actuators_PropertyDetails(this.target,i,start,value - start,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,move: function() {
		this.toggleVisible = Object.prototype.hasOwnProperty.call(this.properties,"alpha") && Object.prototype.hasOwnProperty.call(this.properties,"visible");
		if(this.toggleVisible && this.properties.alpha != 0 && !this.getField(this.target,"visible")) {
			this.setVisible = true;
			this.cacheVisible = this.getField(this.target,"visible");
			this.setField_motion_actuators_SimpleActuator_T(this.target,"visible",true);
		}
		this.timeOffset = this.startTime;
		motion_actuators_SimpleActuator.actuators.push(this);
		++motion_actuators_SimpleActuator.actuatorsLength;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		this.sendChange = true;
		return this;
	}
	,pause: function() {
		if(!this.paused) {
			this.paused = true;
			motion_actuators_GenericActuator.prototype.pause.call(this);
			this.pauseTime = haxe_Timer.stamp();
		}
	}
	,resume: function() {
		if(this.paused) {
			this.paused = false;
			this.timeOffset += haxe_Timer.stamp() - this.pauseTime;
			motion_actuators_GenericActuator.prototype.resume.call(this);
		}
	}
	,setProperty: function(details,value) {
		if(details.isField) details.target[details.propertyName] = value; else Reflect.setProperty(details.target,details.propertyName,value);
	}
	,stop: function(properties,complete,sendEvent) {
		if(this.active) {
			if(properties == null) {
				this.active = false;
				if(complete) this.apply();
				this.complete(sendEvent);
				return;
			}
			var _g = 0;
			var _g1 = Reflect.fields(properties);
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				if(Object.prototype.hasOwnProperty.call(this.properties,i)) {
					this.active = false;
					if(complete) this.apply();
					this.complete(sendEvent);
					return;
				}
			}
		}
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var i;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g1 = 0;
				var _g = this.detailsLength;
				while(_g1 < _g) {
					var i1 = _g1++;
					details = this.propertyDetails[i1];
					this.setProperty(details,details.start + details.change * easing);
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g11 = 0;
				var _g2 = this.detailsLength;
				while(_g11 < _g2) {
					var i2 = _g11++;
					details = this.propertyDetails[i2];
					if(this._smartRotation && (details.propertyName == "rotation" || details.propertyName == "rotationX" || details.propertyName == "rotationY" || details.propertyName == "rotationZ")) {
						var rotation = details.change % 360;
						if(rotation > 180) rotation -= 360; else if(rotation < -180) rotation += 360;
						endValue = details.start + rotation * easing;
					} else endValue = details.start + details.change * easing;
					if(!this._snapping) {
						if(details.isField) details.target[details.propertyName] = endValue; else Reflect.setProperty(details.target,details.propertyName,endValue);
					} else this.setProperty(details,Math.round(endValue));
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					if(this.toggleVisible && this.getField(this.target,"alpha") == 0) this.setField_motion_actuators_SimpleActuator_T(this.target,"visible",false);
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) this.callMethod(this._onRepeat,this._onRepeatParams);
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,__class__: motion_actuators_SimpleActuator
});
var motion_easing_Expo = function() { };
motion_easing_Expo.__name__ = true;
motion_easing_Expo.__properties__ = {get_easeOut:"get_easeOut",get_easeInOut:"get_easeInOut",get_easeIn:"get_easeIn"}
motion_easing_Expo.get_easeIn = function() {
	return new motion_easing_ExpoEaseIn();
};
motion_easing_Expo.get_easeInOut = function() {
	return new motion_easing_ExpoEaseInOut();
};
motion_easing_Expo.get_easeOut = function() {
	return new motion_easing_ExpoEaseOut();
};
var motion_easing_IEasing = function() { };
motion_easing_IEasing.__name__ = true;
motion_easing_IEasing.prototype = {
	__class__: motion_easing_IEasing
};
var motion_easing_ExpoEaseOut = function() {
};
motion_easing_ExpoEaseOut.__name__ = true;
motion_easing_ExpoEaseOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_ExpoEaseOut.prototype = {
	calculate: function(k) {
		if(k == 1) return 1; else return 1 - Math.pow(2,-10 * k);
	}
	,ease: function(t,b,c,d) {
		if(t == d) return b + c; else return c * (1 - Math.pow(2,-10 * t / d)) + b;
	}
	,__class__: motion_easing_ExpoEaseOut
};
var motion_Actuate = function() { };
motion_Actuate.__name__ = true;
motion_Actuate.apply = function(target,properties,customActuator) {
	motion_Actuate.stop(target,properties);
	if(customActuator == null) customActuator = motion_Actuate.defaultActuator;
	var actuator = Type.createInstance(customActuator,[target,0,properties]);
	actuator.apply();
	return actuator;
};
motion_Actuate.getLibrary = function(target,allowCreation) {
	if(allowCreation == null) allowCreation = true;
	if(!(motion_Actuate.targetLibraries.h.__keys__[target.__id__] != null) && allowCreation) motion_Actuate.targetLibraries.set(target,[]);
	return motion_Actuate.targetLibraries.h[target.__id__];
};
motion_Actuate.isActive = function() {
	var result = false;
	var $it0 = motion_Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		result = true;
		break;
	}
	return result;
};
motion_Actuate.motionPath = function(target,duration,properties,overwrite) {
	if(overwrite == null) overwrite = true;
	return motion_Actuate.tween(target,duration,properties,overwrite,motion_actuators_MotionPathActuator);
};
motion_Actuate.pause = function(target) {
	if(js_Boot.__instanceof(target,motion_actuators_IGenericActuator)) {
		var actuator = target;
		actuator.pause();
	} else {
		var library = motion_Actuate.getLibrary(target,false);
		if(library != null) {
			var _g = 0;
			while(_g < library.length) {
				var actuator1 = library[_g];
				++_g;
				actuator1.pause();
			}
		}
	}
};
motion_Actuate.pauseAll = function() {
	var $it0 = motion_Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var _g = 0;
		while(_g < library.length) {
			var actuator = library[_g];
			++_g;
			actuator.pause();
		}
	}
};
motion_Actuate.reset = function() {
	var $it0 = motion_Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var i = library.length - 1;
		while(i >= 0) {
			library[i].stop(null,false,false);
			i--;
		}
	}
	motion_Actuate.targetLibraries = new haxe_ds_ObjectMap();
};
motion_Actuate.resume = function(target) {
	if(js_Boot.__instanceof(target,motion_actuators_IGenericActuator)) {
		var actuator = target;
		actuator.resume();
	} else {
		var library = motion_Actuate.getLibrary(target,false);
		if(library != null) {
			var _g = 0;
			while(_g < library.length) {
				var actuator1 = library[_g];
				++_g;
				actuator1.resume();
			}
		}
	}
};
motion_Actuate.resumeAll = function() {
	var $it0 = motion_Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var _g = 0;
		while(_g < library.length) {
			var actuator = library[_g];
			++_g;
			actuator.resume();
		}
	}
};
motion_Actuate.stop = function(target,properties,complete,sendEvent) {
	if(sendEvent == null) sendEvent = true;
	if(complete == null) complete = false;
	if(target != null) {
		if(js_Boot.__instanceof(target,motion_actuators_IGenericActuator)) {
			var actuator = target;
			actuator.stop(null,complete,sendEvent);
		} else {
			var library = motion_Actuate.getLibrary(target,false);
			if(library != null) {
				if(typeof(properties) == "string") {
					var temp = { };
					Reflect.setField(temp,properties,null);
					properties = temp;
				} else if((properties instanceof Array) && properties.__enum__ == null) {
					var temp1 = { };
					var _g = 0;
					var _g1;
					_g1 = js_Boot.__cast(properties , Array);
					while(_g < _g1.length) {
						var property = _g1[_g];
						++_g;
						Reflect.setField(temp1,property,null);
					}
					properties = temp1;
				}
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(properties,complete,sendEvent);
					i--;
				}
			}
		}
	}
};
motion_Actuate.timer = function(duration,customActuator) {
	return motion_Actuate.tween(new motion__$Actuate_TweenTimer(0),duration,new motion__$Actuate_TweenTimer(1),false,customActuator);
};
motion_Actuate.tween = function(target,duration,properties,overwrite,customActuator) {
	if(overwrite == null) overwrite = true;
	if(target != null) {
		if(duration > 0) {
			if(customActuator == null) customActuator = motion_Actuate.defaultActuator;
			var actuator = Type.createInstance(customActuator,[target,duration,properties]);
			var library = motion_Actuate.getLibrary(actuator.target);
			if(overwrite) {
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(actuator.properties,false,false);
					i--;
				}
				library = motion_Actuate.getLibrary(actuator.target);
			}
			library.push(actuator);
			actuator.move();
			return actuator;
		} else return motion_Actuate.apply(target,properties,customActuator);
	}
	return null;
};
motion_Actuate.unload = function(actuator) {
	var target = actuator.target;
	if(motion_Actuate.targetLibraries.h.__keys__[target.__id__] != null) {
		HxOverrides.remove(motion_Actuate.targetLibraries.h[target.__id__],actuator);
		if(motion_Actuate.targetLibraries.h[target.__id__].length == 0) motion_Actuate.targetLibraries.remove(target);
	}
};
motion_Actuate.update = function(target,duration,start,end,overwrite) {
	if(overwrite == null) overwrite = true;
	var properties = { start : start, end : end};
	return motion_Actuate.tween(target,duration,properties,overwrite,motion_actuators_MethodActuator);
};
var motion__$Actuate_TweenTimer = function(progress) {
	this.progress = progress;
};
motion__$Actuate_TweenTimer.__name__ = true;
motion__$Actuate_TweenTimer.prototype = {
	__class__: motion__$Actuate_TweenTimer
};
var motion_MotionPath = function() {
	this._x = new motion_ComponentPath();
	this._y = new motion_ComponentPath();
	this._rotation = null;
};
motion_MotionPath.__name__ = true;
motion_MotionPath.prototype = {
	bezier: function(x,y,controlX,controlY,strength) {
		if(strength == null) strength = 1;
		this._x.addPath(new motion_BezierPath(x,controlX,strength));
		this._y.addPath(new motion_BezierPath(y,controlY,strength));
		return this;
	}
	,line: function(x,y,strength) {
		if(strength == null) strength = 1;
		this._x.addPath(new motion_LinearPath(x,strength));
		this._y.addPath(new motion_LinearPath(y,strength));
		return this;
	}
	,get_rotation: function() {
		if(this._rotation == null) this._rotation = new motion_RotationPath(this._x,this._y);
		return this._rotation;
	}
	,get_x: function() {
		return this._x;
	}
	,get_y: function() {
		return this._y;
	}
	,__class__: motion_MotionPath
	,__properties__: {get_y:"get_y",get_x:"get_x",get_rotation:"get_rotation"}
};
var motion_IComponentPath = function() { };
motion_IComponentPath.__name__ = true;
motion_IComponentPath.prototype = {
	__class__: motion_IComponentPath
	,__properties__: {get_end:"get_end"}
};
var motion_ComponentPath = function() {
	this.paths = [];
	this.start = 0;
	this.totalStrength = 0;
};
motion_ComponentPath.__name__ = true;
motion_ComponentPath.__interfaces__ = [motion_IComponentPath];
motion_ComponentPath.prototype = {
	addPath: function(path) {
		this.paths.push(path);
		this.totalStrength += path.strength;
	}
	,calculate: function(k) {
		if(this.paths.length == 1) return this.paths[0].calculate(this.start,k); else {
			var ratio = k * this.totalStrength;
			var lastEnd = this.start;
			var _g = 0;
			var _g1 = this.paths;
			while(_g < _g1.length) {
				var path = _g1[_g];
				++_g;
				if(ratio > path.strength) {
					ratio -= path.strength;
					lastEnd = path.end;
				} else return path.calculate(lastEnd,ratio / path.strength);
			}
		}
		return 0;
	}
	,get_end: function() {
		if(this.paths.length > 0) {
			var path = this.paths[this.paths.length - 1];
			return path.end;
		} else return this.start;
	}
	,__class__: motion_ComponentPath
	,__properties__: {get_end:"get_end"}
};
var motion_BezierPath = function(end,control,strength) {
	this.end = end;
	this.control = control;
	this.strength = strength;
};
motion_BezierPath.__name__ = true;
motion_BezierPath.prototype = {
	calculate: function(start,k) {
		return (1 - k) * (1 - k) * start + 2 * (1 - k) * k * this.control + k * k * this.end;
	}
	,__class__: motion_BezierPath
};
var motion_LinearPath = function(end,strength) {
	motion_BezierPath.call(this,end,0,strength);
};
motion_LinearPath.__name__ = true;
motion_LinearPath.__super__ = motion_BezierPath;
motion_LinearPath.prototype = $extend(motion_BezierPath.prototype,{
	calculate: function(start,k) {
		return start + k * (this.end - start);
	}
	,__class__: motion_LinearPath
});
var motion_RotationPath = function(x,y) {
	this.step = 0.01;
	this._x = x;
	this._y = y;
	this.offset = 0;
	this.start = this.calculate(0.0);
};
motion_RotationPath.__name__ = true;
motion_RotationPath.__interfaces__ = [motion_IComponentPath];
motion_RotationPath.prototype = {
	calculate: function(k) {
		var dX = this._x.calculate(k) - this._x.calculate(k + this.step);
		var dY = this._y.calculate(k) - this._y.calculate(k + this.step);
		var angle = Math.atan2(dY,dX) * (180 / Math.PI);
		angle = (angle + this.offset) % 360;
		return angle;
	}
	,get_end: function() {
		return this.calculate(1.0);
	}
	,__class__: motion_RotationPath
	,__properties__: {get_end:"get_end"}
};
var motion_actuators_MethodActuator = function(target,duration,properties) {
	this.currentParameters = [];
	this.tweenProperties = { };
	motion_actuators_SimpleActuator.call(this,target,duration,properties);
	if(!Object.prototype.hasOwnProperty.call(properties,"start")) this.properties.start = [];
	if(!Object.prototype.hasOwnProperty.call(properties,"end")) this.properties.end = this.properties.start;
	var _g1 = 0;
	var _g = this.properties.start.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.currentParameters.push(this.properties.start[i]);
	}
};
motion_actuators_MethodActuator.__name__ = true;
motion_actuators_MethodActuator.__super__ = motion_actuators_SimpleActuator;
motion_actuators_MethodActuator.prototype = $extend(motion_actuators_SimpleActuator.prototype,{
	apply: function() {
		this.callMethod(this.target,this.properties.end);
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		var _g1 = 0;
		var _g = this.properties.start.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
		}
		this.callMethod(this.target,this.currentParameters);
		motion_actuators_SimpleActuator.prototype.complete.call(this,sendEvent);
	}
	,initialize: function() {
		var details;
		var propertyName;
		var start;
		var _g1 = 0;
		var _g = this.properties.start.length;
		while(_g1 < _g) {
			var i = _g1++;
			propertyName = "param" + i;
			start = this.properties.start[i];
			this.tweenProperties[propertyName] = start;
			if(typeof(start) == "number" || ((start | 0) === start)) {
				details = new motion_actuators_PropertyDetails(this.tweenProperties,propertyName,start,this.properties.end[i] - start);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		motion_actuators_SimpleActuator.prototype.update.call(this,currentTime);
		if(this.active && !this.paused) {
			var _g1 = 0;
			var _g = this.properties.start.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
			}
			this.callMethod(this.target,this.currentParameters);
		}
	}
	,__class__: motion_actuators_MethodActuator
});
var motion_actuators_MotionPathActuator = function(target,duration,properties) {
	motion_actuators_SimpleActuator.call(this,target,duration,properties);
};
motion_actuators_MotionPathActuator.__name__ = true;
motion_actuators_MotionPathActuator.__super__ = motion_actuators_SimpleActuator;
motion_actuators_MotionPathActuator.prototype = $extend(motion_actuators_SimpleActuator.prototype,{
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) Reflect.setField(this.target,propertyName,(js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath)).get_end()); else Reflect.setProperty(this.target,propertyName,(js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath)).get_end());
		}
	}
	,initialize: function() {
		var details;
		var path;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			path = js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath);
			if(path != null) {
				var isField = true;
				if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) path.start = Reflect.field(this.target,propertyName); else {
					isField = false;
					path.start = Reflect.getProperty(this.target,propertyName);
				}
				details = new motion_actuators_PropertyPathDetails(this.target,propertyName,path,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g = 0;
				var _g1 = this.propertyDetails;
				while(_g < _g1.length) {
					var details1 = _g1[_g];
					++_g;
					if(details1.isField) Reflect.setField(details1.target,details1.propertyName,(js_Boot.__cast(details1 , motion_actuators_PropertyPathDetails)).path.calculate(easing)); else Reflect.setProperty(details1.target,details1.propertyName,(js_Boot.__cast(details1 , motion_actuators_PropertyPathDetails)).path.calculate(easing));
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g2 = 0;
				var _g11 = this.propertyDetails;
				while(_g2 < _g11.length) {
					var details2 = _g11[_g2];
					++_g2;
					if(!this._snapping) {
						if(details2.isField) Reflect.setField(details2.target,details2.propertyName,(js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing)); else Reflect.setProperty(details2.target,details2.propertyName,(js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing));
					} else if(details2.isField) Reflect.setField(details2.target,details2.propertyName,Math.round((js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing))); else Reflect.setProperty(details2.target,details2.propertyName,Math.round((js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing)));
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					if(this.toggleVisible && this.getField(this.target,"alpha") == 0) this.setField_motion_actuators_MotionPathActuator_T(this.target,"visible",false);
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) this.callMethod(this._onRepeat,this._onRepeatParams);
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,__class__: motion_actuators_MotionPathActuator
});
var motion_actuators_PropertyDetails = function(target,propertyName,start,change,isField) {
	if(isField == null) isField = true;
	this.target = target;
	this.propertyName = propertyName;
	this.start = start;
	this.change = change;
	this.isField = isField;
};
motion_actuators_PropertyDetails.__name__ = true;
motion_actuators_PropertyDetails.prototype = {
	__class__: motion_actuators_PropertyDetails
};
var motion_actuators_PropertyPathDetails = function(target,propertyName,path,isField) {
	if(isField == null) isField = true;
	motion_actuators_PropertyDetails.call(this,target,propertyName,0,0,isField);
	this.path = path;
};
motion_actuators_PropertyPathDetails.__name__ = true;
motion_actuators_PropertyPathDetails.__super__ = motion_actuators_PropertyDetails;
motion_actuators_PropertyPathDetails.prototype = $extend(motion_actuators_PropertyDetails.prototype,{
	__class__: motion_actuators_PropertyPathDetails
});
var motion_easing_ExpoEaseIn = function() {
};
motion_easing_ExpoEaseIn.__name__ = true;
motion_easing_ExpoEaseIn.__interfaces__ = [motion_easing_IEasing];
motion_easing_ExpoEaseIn.prototype = {
	calculate: function(k) {
		if(k == 0) return 0; else return Math.pow(2,10 * (k - 1));
	}
	,ease: function(t,b,c,d) {
		if(t == 0) return b; else return c * Math.pow(2,10 * (t / d - 1)) + b;
	}
	,__class__: motion_easing_ExpoEaseIn
};
var motion_easing_ExpoEaseInOut = function() {
};
motion_easing_ExpoEaseInOut.__name__ = true;
motion_easing_ExpoEaseInOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_ExpoEaseInOut.prototype = {
	calculate: function(k) {
		if(k == 0) return 0;
		if(k == 1) return 1;
		if((k /= 0.5) < 1.0) return 0.5 * Math.pow(2,10 * (k - 1));
		return 0.5 * (2 - Math.pow(2,-10 * --k));
	}
	,ease: function(t,b,c,d) {
		if(t == 0) return b;
		if(t == d) return b + c;
		if((t /= d / 2.0) < 1.0) return c / 2 * Math.pow(2,10 * (t - 1)) + b;
		return c / 2 * (2 - Math.pow(2,-10 * --t)) + b;
	}
	,__class__: motion_easing_ExpoEaseInOut
};
var msignal_Signal = function(valueClasses) {
	if(valueClasses == null) valueClasses = [];
	this.valueClasses = valueClasses;
	this.slots = msignal_SlotList.NIL;
	this.priorityBased = false;
};
msignal_Signal.__name__ = true;
msignal_Signal.prototype = {
	add: function(listener) {
		return this.registerListener(listener);
	}
	,addOnce: function(listener) {
		return this.registerListener(listener,true);
	}
	,addWithPriority: function(listener,priority) {
		if(priority == null) priority = 0;
		return this.registerListener(listener,false,priority);
	}
	,addOnceWithPriority: function(listener,priority) {
		if(priority == null) priority = 0;
		return this.registerListener(listener,true,priority);
	}
	,remove: function(listener) {
		var slot = this.slots.find(listener);
		if(slot == null) return null;
		this.slots = this.slots.filterNot(listener);
		return slot;
	}
	,removeAll: function() {
		this.slots = msignal_SlotList.NIL;
	}
	,registerListener: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		if(this.registrationPossible(listener,once)) {
			var newSlot = this.createSlot(listener,once,priority);
			if(!this.priorityBased && priority != 0) this.priorityBased = true;
			if(!this.priorityBased && priority == 0) this.slots = this.slots.prepend(newSlot); else this.slots = this.slots.insertWithPriority(newSlot);
			return newSlot;
		}
		return this.slots.find(listener);
	}
	,registrationPossible: function(listener,once) {
		if(!this.slots.nonEmpty) return true;
		var existingSlot = this.slots.find(listener);
		if(existingSlot == null) return true;
		if(existingSlot.once != once) throw new js__$Boot_HaxeError("You cannot addOnce() then add() the same listener without removing the relationship first.");
		return false;
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return null;
	}
	,get_numListeners: function() {
		return this.slots.get_length();
	}
	,__class__: msignal_Signal
	,__properties__: {get_numListeners:"get_numListeners"}
};
var msignal_Signal0 = function() {
	msignal_Signal.call(this);
};
msignal_Signal0.__name__ = true;
msignal_Signal0.__super__ = msignal_Signal;
msignal_Signal0.prototype = $extend(msignal_Signal.prototype,{
	dispatch: function() {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute();
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal_Slot0(this,listener,once,priority);
	}
	,__class__: msignal_Signal0
});
var msignal_Signal1 = function(type) {
	msignal_Signal.call(this,[type]);
};
msignal_Signal1.__name__ = true;
msignal_Signal1.__super__ = msignal_Signal;
msignal_Signal1.prototype = $extend(msignal_Signal.prototype,{
	dispatch: function(value) {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute(value);
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal_Slot1(this,listener,once,priority);
	}
	,__class__: msignal_Signal1
});
var msignal_Signal2 = function(type1,type2) {
	msignal_Signal.call(this,[type1,type2]);
};
msignal_Signal2.__name__ = true;
msignal_Signal2.__super__ = msignal_Signal;
msignal_Signal2.prototype = $extend(msignal_Signal.prototype,{
	dispatch: function(value1,value2) {
		var slotsToProcess = this.slots;
		while(slotsToProcess.nonEmpty) {
			slotsToProcess.head.execute(value1,value2);
			slotsToProcess = slotsToProcess.tail;
		}
	}
	,createSlot: function(listener,once,priority) {
		if(priority == null) priority = 0;
		if(once == null) once = false;
		return new msignal_Slot2(this,listener,once,priority);
	}
	,__class__: msignal_Signal2
});
var msignal_Slot = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	this.signal = signal;
	this.set_listener(listener);
	this.once = once;
	this.priority = priority;
	this.enabled = true;
};
msignal_Slot.__name__ = true;
msignal_Slot.prototype = {
	remove: function() {
		this.signal.remove(this.listener);
	}
	,set_listener: function(value) {
		if(value == null) throw new js__$Boot_HaxeError("listener cannot be null");
		return this.listener = value;
	}
	,__class__: msignal_Slot
	,__properties__: {set_listener:"set_listener"}
};
var msignal_Slot0 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal_Slot.call(this,signal,listener,once,priority);
};
msignal_Slot0.__name__ = true;
msignal_Slot0.__super__ = msignal_Slot;
msignal_Slot0.prototype = $extend(msignal_Slot.prototype,{
	execute: function() {
		if(!this.enabled) return;
		if(this.once) this.remove();
		this.listener();
	}
	,__class__: msignal_Slot0
});
var msignal_Slot1 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal_Slot.call(this,signal,listener,once,priority);
};
msignal_Slot1.__name__ = true;
msignal_Slot1.__super__ = msignal_Slot;
msignal_Slot1.prototype = $extend(msignal_Slot.prototype,{
	execute: function(value1) {
		if(!this.enabled) return;
		if(this.once) this.remove();
		if(this.param != null) value1 = this.param;
		this.listener(value1);
	}
	,__class__: msignal_Slot1
});
var msignal_Slot2 = function(signal,listener,once,priority) {
	if(priority == null) priority = 0;
	if(once == null) once = false;
	msignal_Slot.call(this,signal,listener,once,priority);
};
msignal_Slot2.__name__ = true;
msignal_Slot2.__super__ = msignal_Slot;
msignal_Slot2.prototype = $extend(msignal_Slot.prototype,{
	execute: function(value1,value2) {
		if(!this.enabled) return;
		if(this.once) this.remove();
		if(this.param1 != null) value1 = this.param1;
		if(this.param2 != null) value2 = this.param2;
		this.listener(value1,value2);
	}
	,__class__: msignal_Slot2
});
var msignal_SlotList = function(head,tail) {
	this.nonEmpty = false;
	if(head == null && tail == null) {
		if(msignal_SlotList.NIL != null) throw new js__$Boot_HaxeError("Parameters head and tail are null. Use the NIL element instead.");
		this.nonEmpty = false;
	} else if(head == null) throw new js__$Boot_HaxeError("Parameter head cannot be null."); else {
		this.head = head;
		if(tail == null) this.tail = msignal_SlotList.NIL; else this.tail = tail;
		this.nonEmpty = true;
	}
};
msignal_SlotList.__name__ = true;
msignal_SlotList.prototype = {
	get_length: function() {
		if(!this.nonEmpty) return 0;
		if(this.tail == msignal_SlotList.NIL) return 1;
		var result = 0;
		var p = this;
		while(p.nonEmpty) {
			++result;
			p = p.tail;
		}
		return result;
	}
	,prepend: function(slot) {
		return new msignal_SlotList(slot,this);
	}
	,append: function(slot) {
		if(slot == null) return this;
		if(!this.nonEmpty) return new msignal_SlotList(slot);
		if(this.tail == msignal_SlotList.NIL) return new msignal_SlotList(slot).prepend(this.head);
		var wholeClone = new msignal_SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			subClone = subClone.tail = new msignal_SlotList(current.head);
			current = current.tail;
		}
		subClone.tail = new msignal_SlotList(slot);
		return wholeClone;
	}
	,insertWithPriority: function(slot) {
		if(!this.nonEmpty) return new msignal_SlotList(slot);
		var priority = slot.priority;
		if(priority >= this.head.priority) return this.prepend(slot);
		var wholeClone = new msignal_SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(priority > current.head.priority) {
				subClone.tail = current.prepend(slot);
				return wholeClone;
			}
			subClone = subClone.tail = new msignal_SlotList(current.head);
			current = current.tail;
		}
		subClone.tail = new msignal_SlotList(slot);
		return wholeClone;
	}
	,filterNot: function(listener) {
		if(!this.nonEmpty || listener == null) return this;
		if(Reflect.compareMethods(this.head.listener,listener)) return this.tail;
		var wholeClone = new msignal_SlotList(this.head);
		var subClone = wholeClone;
		var current = this.tail;
		while(current.nonEmpty) {
			if(Reflect.compareMethods(current.head.listener,listener)) {
				subClone.tail = current.tail;
				return wholeClone;
			}
			subClone = subClone.tail = new msignal_SlotList(current.head);
			current = current.tail;
		}
		return this;
	}
	,contains: function(listener) {
		if(!this.nonEmpty) return false;
		var p = this;
		while(p.nonEmpty) {
			if(Reflect.compareMethods(p.head.listener,listener)) return true;
			p = p.tail;
		}
		return false;
	}
	,find: function(listener) {
		if(!this.nonEmpty) return null;
		var p = this;
		while(p.nonEmpty) {
			if(Reflect.compareMethods(p.head.listener,listener)) return p.head;
			p = p.tail;
		}
		return null;
	}
	,__class__: msignal_SlotList
	,__properties__: {get_length:"get_length"}
};
var shaders_SkyShader = function() { };
shaders_SkyShader.__name__ = true;
var shaders_SkyEffectController = function(main) {
	this.mieKCoefficient = new THREE.Vector3();
	this.primaries = new THREE.Vector3();
	this.cameraPos = new THREE.Vector3();
	this.sunPosition = new THREE.Vector3();
	this.main = main;
	this.sunPosition.set(0,-700000,0);
	this.cameraPos.set(100000.0,-40000.0,0.0);
	this.turbidity = 2.0;
	this.rayleigh = 1.0;
	this.mieCoefficient = 0.005;
	this.mieDirectionalG = 0.8;
	this.luminance = 1.0;
	this.inclination = 0.49;
	this.azimuth = 0.25;
	this.refractiveIndex = 1.0003;
	this.numMolecules = 2.542e25;
	this.depolarizationFactor = 0.035;
	this.primaries.set(6.8e-7,5.5e-7,4.5e-7);
	this.mieKCoefficient.set(0.686,0.678,0.666);
	this.mieV = 4.0;
	this.rayleighZenithLength = 8.4e3;
	this.mieZenithLength = 1.25e3;
	this.sunIntensityFactor = 1000.0;
	this.sunIntensityFalloffSteepness = 1.5;
	this.sunAngularDiameterDegrees = 0.0;
	this.tonemapWeighting = 1000.0;
	this.updateUniforms();
	this.presetTransitionDuration = 5.0;
	this.set_preset("stellarDawn");
};
shaders_SkyEffectController.__name__ = true;
shaders_SkyEffectController.prototype = {
	setInitialValues: function() {
		this.sunPosition.set(0,-700000,0);
		this.cameraPos.set(100000.0,-40000.0,0.0);
		this.turbidity = 2.0;
		this.rayleigh = 1.0;
		this.mieCoefficient = 0.005;
		this.mieDirectionalG = 0.8;
		this.luminance = 1.0;
		this.inclination = 0.49;
		this.azimuth = 0.25;
		this.refractiveIndex = 1.0003;
		this.numMolecules = 2.542e25;
		this.depolarizationFactor = 0.035;
		this.primaries.set(6.8e-7,5.5e-7,4.5e-7);
		this.mieKCoefficient.set(0.686,0.678,0.666);
		this.mieV = 4.0;
		this.rayleighZenithLength = 8.4e3;
		this.mieZenithLength = 1.25e3;
		this.sunIntensityFactor = 1000.0;
		this.sunIntensityFalloffSteepness = 1.5;
		this.sunAngularDiameterDegrees = 0.0;
		this.tonemapWeighting = 1000.0;
	}
	,updateUniforms: function() {
		shaders_SkyShader.uniforms.cameraPos.value = this.cameraPos;
		shaders_SkyShader.uniforms.turbidity.value = this.turbidity;
		shaders_SkyShader.uniforms.rayleigh.value = this.rayleigh;
		shaders_SkyShader.uniforms.mieCoefficient.value = this.mieCoefficient;
		shaders_SkyShader.uniforms.mieDirectionalG.value = this.mieDirectionalG;
		shaders_SkyShader.uniforms.luminance.value = this.luminance;
		var theta = Math.PI * (this.inclination - 0.5);
		var phi = 2 * Math.PI * (this.azimuth - 0.5);
		var distance = 400000;
		this.sunPosition.x = distance * Math.cos(phi);
		this.sunPosition.y = distance * Math.sin(phi) * Math.sin(theta);
		this.sunPosition.z = distance * Math.sin(phi) * Math.cos(theta);
		shaders_SkyShader.uniforms.sunPosition.value.copy(this.sunPosition);
		shaders_SkyShader.uniforms.refractiveIndex.value = this.refractiveIndex;
		shaders_SkyShader.uniforms.numMolecules.value = this.numMolecules;
		shaders_SkyShader.uniforms.depolarizationFactor.value = this.depolarizationFactor;
		shaders_SkyShader.uniforms.rayleighZenithLength.value = this.rayleighZenithLength;
		shaders_SkyShader.uniforms.primaries.value.copy(this.primaries);
		shaders_SkyShader.uniforms.mieKCoefficient.value.copy(this.mieKCoefficient);
		shaders_SkyShader.uniforms.mieV.value = this.mieV;
		shaders_SkyShader.uniforms.mieZenithLength.value = this.mieZenithLength;
		shaders_SkyShader.uniforms.sunIntensityFactor.value = this.sunIntensityFactor;
		shaders_SkyShader.uniforms.sunIntensityFalloffSteepness.value = this.sunIntensityFalloffSteepness;
		shaders_SkyShader.uniforms.sunAngularDiameterDegrees.value = this.sunAngularDiameterDegrees;
		shaders_SkyShader.uniforms.tonemapWeighting.value = this.tonemapWeighting;
	}
	,presetChanged: function(preset,duration) {
		if(duration == null) duration = 3;
		switch(preset) {
		case "stellarDawn":
			this.stellarDawn(duration);
			break;
		case "redSunset":
			this.redSunset(duration);
			break;
		case "alienDay":
			this.alienDay(duration);
			break;
		case "blueDusk":
			this.blueDusk(duration);
			break;
		case "bloodSky":
			this.bloodSky(duration);
			break;
		case "purpleDusk":
			this.purpleDusk(duration);
			break;
		default:
			null;
		}
	}
	,onPresetChanged: function(preset) {
		this.presetChanged(preset);
	}
	,stellarDawn: function(duration) {
		if(duration == null) duration = 3;
		var _g = this;
		motion_Actuate.tween(this,duration,{ turbidity : 1.25, rayleigh : 1.00, mieCoefficient : 0.00335, mieDirectionalG : 0.787, luminance : 1.0, inclination : 0.4945, azimuth : 0.2508, refractiveIndex : 1.000317, numMolecules : 2.542e25, depolarizationFactor : 0.067, rayleighZenithLength : 615, mieV : 4.012, mieZenithLength : 500, sunIntensityFactor : 1111, sunIntensityFalloffSteepness : 0.98, sunAngularDiameterDegrees : 0.00758, tonemapWeighting : 1000}).onUpdate(function() {
			_g.updateUniforms();
		});
		motion_Actuate.tween(this.primaries,duration,{ x : 6.8e-7, y : 5.5e-7, z : 4.5e-7}).onUpdate(function() {
			_g.updateUniforms();
		});
		motion_Actuate.tween(this.mieKCoefficient,duration,{ x : 0.686, y : 0.678, z : 0.666}).onUpdate(function() {
			_g.updateUniforms();
		});
		motion_Actuate.tween(this.cameraPos,duration,{ x : 100000, y : -40000, z : 0}).onUpdate(function() {
			_g.updateUniforms();
		});
	}
	,redSunset: function(duration) {
		if(duration == null) duration = 3;
		var _g = this;
		motion_Actuate.tween(this,duration,{ turbidity : 4.7, rayleigh : 2.28, mieCoefficient : 0.005, mieDirectionalG : 0.82, luminance : 1.00, inclination : 0.4983, azimuth : 0.1979, refractiveIndex : 1.00029, numMolecules : 2.542e25, depolarizationFactor : 0.02, rayleighZenithLength : 8400, mieV : 3.936, mieZenithLength : 34000, sunIntensityFactor : 1000, sunIntensityFalloffSteepness : 1.5, sunAngularDiameterDegrees : 0.00933, tonemapWeighting : 1000}).onUpdate(function() {
			_g.updateUniforms();
		});
		motion_Actuate.tween(this.primaries,duration,{ x : 6.8e-7, y : 5.5e-7, z : 4.5e-7}).onUpdate(function() {
			_g.updateUniforms();
		});
		motion_Actuate.tween(this.mieKCoefficient,duration,{ x : 0.686, y : 0.678, z : 0.666}).onUpdate(function() {
			_g.updateUniforms();
		});
		motion_Actuate.tween(this.cameraPos,duration,{ x : 100000, y : -40000, z : 0}).onUpdate(function() {
			_g.updateUniforms();
		});
	}
	,alienDay: function(duration) {
		if(duration == null) duration = 3;
		var _g = this;
		motion_Actuate.tween(this,duration,{ turbidity : 12.575, rayleigh : 5.75, mieCoefficient : 0.0074, mieDirectionalG : 0.468, luminance : 1.00, inclination : 0.4901, azimuth : 0.1866, refractiveIndex : 1.000128, numMolecules : 2.542e25, depolarizationFactor : 0.137, rayleighZenithLength : 3795, mieV : 4.007, mieZenithLength : 7100, sunIntensityFactor : 1024, sunIntensityFalloffSteepness : 1.4, sunAngularDiameterDegrees : 0.006, tonemapWeighting : 1000}).onUpdate(function() {
			_g.updateUniforms();
		});
		motion_Actuate.tween(this.primaries,duration,{ x : 6.8e-7, y : 5.5e-7, z : 4.5e-7}).onUpdate(function() {
			_g.updateUniforms();
		});
		motion_Actuate.tween(this.mieKCoefficient,duration,{ x : 0.686, y : 0.678, z : 0.666}).onUpdate(function() {
			_g.updateUniforms();
		});
		motion_Actuate.tween(this.cameraPos,duration,{ x : 100000, y : -40000, z : 0}).onUpdate(function() {
			_g.updateUniforms();
		});
	}
	,blueDusk: function(duration) {
		if(duration == null) duration = 3;
		var _g = this;
		motion_Actuate.tween(this,duration,{ turbidity : 2.5, rayleigh : 2.295, mieCoefficient : 0.011475, mieDirectionalG : 0.814, luminance : 1.00, inclination : 0.4987, azimuth : 0.2268, refractiveIndex : 1.000262, numMolecules : 2.542e25, depolarizationFactor : 0.095, rayleighZenithLength : 540, mieV : 3.979, mieZenithLength : 1000, sunIntensityFactor : 1151, sunIntensityFalloffSteepness : 1.22, sunAngularDiameterDegrees : 0.00639, tonemapWeighting : 1000}).onUpdate(function() {
			_g.updateUniforms();
		});
		motion_Actuate.tween(this.primaries,duration,{ x : 6.8e-7, y : 5.5e-7, z : 4.5e-7}).onUpdate(function() {
			_g.updateUniforms();
		});
		motion_Actuate.tween(this.mieKCoefficient,duration,{ x : 0.686, y : 0.678, z : 0.666}).onUpdate(function() {
			_g.updateUniforms();
		});
		motion_Actuate.tween(this.cameraPos,duration,{ x : 100000, y : -40000, z : 0}).onUpdate(function() {
			_g.updateUniforms();
		});
	}
	,purpleDusk: function(duration) {
		if(duration == null) duration = 3;
		var _g = this;
		motion_Actuate.tween(this,duration,{ turbidity : 3.6, rayleigh : 2.26, mieCoefficient : 0.005, mieDirectionalG : 0.822, luminance : 1.00, inclination : 0.502, azimuth : 0.2883, refractiveIndex : 1.000294, numMolecules : 2.542e25, depolarizationFactor : 0.068, rayleighZenithLength : 12045, mieV : 3.976, mieZenithLength : 34000, sunIntensityFactor : 1631, sunIntensityFalloffSteepness : 1.5, sunAngularDiameterDegrees : 0.00933, tonemapWeighting : 1000}).onUpdate(function() {
			_g.updateUniforms();
		});
		motion_Actuate.tween(this.primaries,duration,{ x : 7.5e-7, y : 4.5e-7, z : 5.1e-7}).onUpdate(function() {
			_g.updateUniforms();
		});
		motion_Actuate.tween(this.mieKCoefficient,duration,{ x : 0.686, y : 0.678, z : 0.666}).onUpdate(function() {
			_g.updateUniforms();
		});
		motion_Actuate.tween(this.cameraPos,duration,{ x : 100000, y : -40000, z : 0}).onUpdate(function() {
			_g.updateUniforms();
		});
	}
	,bloodSky: function(duration) {
		if(duration == null) duration = 3;
		var _g = this;
		motion_Actuate.tween(this,duration,{ turbidity : 4.75, rayleigh : 6.77, mieCoefficient : 0.0191, mieDirectionalG : 0.793, luminance : 1.1735, inclination : 0.4956, azimuth : 0.2174, refractiveIndex : 1.000633, numMolecules : 2.542e25, depolarizationFactor : 0.01, rayleighZenithLength : 1425, mieV : 4.042, mieZenithLength : 1600, sunIntensityFactor : 2069, sunIntensityFalloffSteepness : 2.26, sunAngularDiameterDegrees : 0.01487, tonemapWeighting : 1000}).onUpdate(function() {
			_g.updateUniforms();
		});
		motion_Actuate.tween(this.primaries,duration,{ x : 7.929e-7, y : 3.766e-7, z : 3.172e-7}).onUpdate(function() {
			_g.updateUniforms();
		});
		motion_Actuate.tween(this.mieKCoefficient,duration,{ x : 0.686, y : 0.678, z : 0.666}).onUpdate(function() {
			_g.updateUniforms();
		});
		motion_Actuate.tween(this.cameraPos,duration,{ x : 100000, y : -40000, z : 0}).onUpdate(function() {
			_g.updateUniforms();
		});
	}
	,randomSky: function(duration) {
		if(duration == null) duration = 3;
		var _g = this;
		motion_Actuate.tween(this,duration,{ turbidity : 4.75, rayleigh : 6.77, mieCoefficient : 0.0191, mieDirectionalG : 0.793, luminance : 1.1735, inclination : 0.4956, azimuth : 0.2174, refractiveIndex : 1.000633, numMolecules : 2.542e25, depolarizationFactor : 0.01, rayleighZenithLength : 1425, mieV : 4.042, mieZenithLength : 1600, sunIntensityFactor : 2069, sunIntensityFalloffSteepness : 2.26, sunAngularDiameterDegrees : 0.01487, tonemapWeighting : 1000}).onUpdate(function() {
			_g.updateUniforms();
		});
		motion_Actuate.tween(this.primaries,duration,{ x : 7.929e-7, y : 3.766e-7, z : 3.172e-7}).onUpdate(function() {
			_g.updateUniforms();
		});
		motion_Actuate.tween(this.mieKCoefficient,duration,{ x : 0.686, y : 0.678, z : 0.666}).onUpdate(function() {
			_g.updateUniforms();
		});
		motion_Actuate.tween(this.cameraPos,duration,{ x : 100000, y : -40000, z : 0}).onUpdate(function() {
			_g.updateUniforms();
		});
	}
	,addGUIItem: function(c,parentGui) {
		var controller = c;
		var updateValues = function(t) {
			controller.updateUniforms();
		};
		parentGui.add(controller,"preset",["stellarDawn","redSunset","bloodSky","alienDay","blueDusk","purpleDusk"]).listen().onChange($bind(this,this.onPresetChanged));
		var parametersFolder = parentGui.addFolder("parameters");
		parametersFolder.add(controller,"turbidity").step(0.025).listen().onChange(updateValues);
		parametersFolder.add(controller,"rayleigh").step(0.005).listen().onChange(updateValues);
		parametersFolder.add(controller,"mieCoefficient").step(0.000025).listen().onChange(updateValues);
		parametersFolder.add(controller,"mieDirectionalG").step(0.001).listen().onChange(updateValues);
		parametersFolder.add(controller,"luminance").step(0.0005).listen().onChange(updateValues);
		parametersFolder.add(controller,"inclination").step(0.0001).listen().onChange(updateValues);
		parametersFolder.add(controller,"azimuth").step(0.0001).listen().onChange(updateValues);
		parametersFolder.add(controller,"refractiveIndex").step(0.000001).listen().onChange(updateValues);
		parametersFolder.add(controller,"numMolecules",2.542e10,2.542e26,1e10).listen().onChange(updateValues);
		parametersFolder.add(controller,"depolarizationFactor").step(0.001).listen().onChange(updateValues);
		parametersFolder.add(controller,"rayleighZenithLength").step(15.0).listen().onChange(updateValues);
		parametersFolder.add(controller,"mieV").step(0.001).listen().onChange(updateValues);
		parametersFolder.add(controller,"mieZenithLength").step(100.0).listen().onChange(updateValues);
		parametersFolder.add(controller,"sunIntensityFactor").step(1.0).listen().onChange(updateValues);
		parametersFolder.add(controller,"sunIntensityFalloffSteepness").step(0.01).listen().onChange(updateValues);
		parametersFolder.add(controller,"sunAngularDiameterDegrees").step(0.00001).listen().onChange(updateValues);
		parametersFolder.add(controller,"tonemapWeighting").step(1).listen().onChange(updateValues);
		var primariesFolder = parentGui.addFolder("primaries");
		primariesFolder.add(controller.primaries,"x",5e-12,9e-7,5e-13).listen().onChange(updateValues);
		primariesFolder.add(controller.primaries,"y",5e-12,9e-7,5e-13).listen().onChange(updateValues);
		primariesFolder.add(controller.primaries,"z",5e-12,9e-7,5e-13).listen().onChange(updateValues);
		var mieFolder = parentGui.addFolder("mieCoefficient");
		mieFolder.add(controller.mieKCoefficient,"x").step(0.001).listen().onChange(updateValues);
		mieFolder.add(controller.mieKCoefficient,"y").step(0.001).listen().onChange(updateValues);
		mieFolder.add(controller.mieKCoefficient,"z").step(0.001).listen().onChange(updateValues);
		var camFolder = parentGui.addFolder("cameraPos");
		camFolder.add(controller.cameraPos,"x").step(250).listen().onChange(updateValues);
		camFolder.add(controller.cameraPos,"y").step(250).listen().onChange(updateValues);
		camFolder.add(controller.cameraPos,"z").step(250).listen().onChange(updateValues);
	}
	,set_preset: function(nextPreset) {
		this.preset = nextPreset;
		this.presetChanged(nextPreset,this.presetTransitionDuration);
		return this.preset;
	}
	,__class__: shaders_SkyEffectController
	,__properties__: {set_preset:"set_preset"}
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
msignal_SlotList.NIL = new msignal_SlotList(null,null);
Main.DEGREES_TO_RAD = 0.01745329;
Main.GAME_VIEWPORT_WIDTH = 800;
Main.GAME_VIEWPORT_HEIGHT = 500;
Main.REPO_URL = "https://github.com/Tw1ddle/Ludum-Dare-34";
Main.TWITTER_URL = "https://twitter.com/Sam_Twidale";
Main.LUDUM_DARE_URL = "http://ludumdare.com/compo/ludum-dare-34/?uid=42276";
Main.WEBSITE_URL = "http://samcodes.co.uk/";
Main.HAXE_URL = "http://haxe.org/";
Main.THREEJS_URL = "https://github.com/mrdoob/three.js/";
Main.COMPO_TITLE = "Ludum Dare 34";
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = {}.toString;
motion_actuators_SimpleActuator.actuators = [];
motion_actuators_SimpleActuator.actuatorsLength = 0;
motion_actuators_SimpleActuator.addedEvent = false;
motion_Actuate.defaultActuator = motion_actuators_SimpleActuator;
motion_Actuate.defaultEase = motion_easing_Expo.get_easeOut();
motion_Actuate.targetLibraries = new haxe_ds_ObjectMap();
shaders_SkyShader.uniforms = { luminance : { type : "f", value : 1.0}, turbidity : { type : "f", value : 1.0}, rayleigh : { type : "f", value : 1.0}, mieCoefficient : { type : "f", value : 1.0}, mieDirectionalG : { type : "f", value : 1.0}, sunPosition : { type : "v3", value : new THREE.Vector3()}, cameraPos : { type : "v3", value : new THREE.Vector3()}, refractiveIndex : { type : "f", value : 1.0}, numMolecules : { type : "f", value : 1.0}, depolarizationFactor : { type : "f", value : 1.0}, primaries : { type : "v3", value : new THREE.Vector3()}, mieKCoefficient : { type : "v3", value : new THREE.Vector3()}, mieV : { type : "f", value : 1.0}, rayleighZenithLength : { type : "f", value : 1.0}, mieZenithLength : { type : "f", value : 1.0}, sunIntensityFactor : { type : "f", value : 1.0}, sunIntensityFalloffSteepness : { type : "f", value : 1.0}, sunAngularDiameterDegrees : { type : "f", value : 1.0}, tonemapWeighting : { type : "f", value : 1000.0}};
shaders_SkyShader.vertexShader = "varying vec3 vWorldPosition;\r\n\r\nvoid main()\r\n{\r\n\tvec4 worldPosition = modelMatrix * vec4(position, 1.0);\r\n\tvWorldPosition = worldPosition.xyz;\r\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\r\n}";
shaders_SkyShader.fragmentShader = "varying vec3 vWorldPosition;\r\n\r\nuniform vec3 sunPosition;\r\nuniform float luminance;\r\nuniform float turbidity;\r\nuniform float rayleigh;\r\nuniform float mieCoefficient;\r\nuniform float mieDirectionalG;\r\nuniform vec3 cameraPos;\r\nuniform float refractiveIndex;\r\nuniform float numMolecules;\r\nuniform float depolarizationFactor;\r\nuniform vec3 primaries;\r\nuniform vec3 mieKCoefficient;\r\nuniform float mieV;\r\nuniform float rayleighZenithLength;\r\nuniform float mieZenithLength;\r\nuniform float sunIntensityFactor;\r\nuniform float sunIntensityFalloffSteepness;\r\nuniform float sunAngularDiameterDegrees;\r\nuniform float tonemapWeighting;\r\n\r\nconst float pi = 3.141592653589793238462643383279502884197169;\r\nconst vec3 up = vec3(0.0, 1.0, 0.0);\r\n\r\nvec3 totalRayleigh(vec3 lambda)\r\n{\r\n\treturn (8.0 * pow(pi, 3.0) * pow(pow(refractiveIndex, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * depolarizationFactor)) / (3.0 * numMolecules * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * depolarizationFactor));\r\n}\r\n\r\nvec3 totalMie(vec3 lambda, vec3 K, float T)\r\n{\r\n\tfloat c = 0.2 * T * 10e-18;\r\n\treturn 0.434 * c * pi * pow((2.0 * pi) / lambda, vec3(mieV - 2.0)) * K;\r\n}\r\n\r\nfloat rayleighPhase(float cosTheta)\r\n{\r\n\treturn (3.0 / (16.0 * pi)) * (1.0 + pow(cosTheta, 2.0));\r\n}\r\n\r\nfloat henyeyGreensteinPhase(float cosTheta, float g)\r\n{\r\n\treturn (1.0 / (4.0 * pi)) * ((1.0 - pow(g, 2.0)) / pow(1.0 - 2.0 * g * cosTheta + pow(g, 2.0), 1.5));\r\n}\r\n\r\nfloat sunIntensity(float zenithAngleCos)\r\n{\r\n\tfloat cutoffAngle = pi / 1.95; // Earth shadow hack\r\n\treturn sunIntensityFactor * max(0.0, 1.0 - exp(-((cutoffAngle - acos(zenithAngleCos)) / sunIntensityFalloffSteepness)));\r\n}\r\n\r\n// Whitescale tonemapping calculation, see http://filmicgames.com/archives/75\r\n// Also see http://blenderartists.org/forum/showthread.php?321110-Shaders-and-Skybox-madness\r\nconst float A = 0.15; // Shoulder strength\r\nconst float B = 0.50; // Linear strength\r\nconst float C = 0.10; // Linear angle\r\nconst float D = 0.20; // Toe strength\r\nconst float E = 0.02; // Toe numerator\r\nconst float F = 0.30; // Toe denominator\r\nvec3 Uncharted2Tonemap(vec3 W)\r\n{\r\n\treturn ((W * (A * W + C * B) + D * E) / (W * (A * W + B) + D * F)) - E / F;\r\n}\r\n\r\nvoid main()\r\n{\r\n\t// Rayleigh coefficient\r\n\tfloat sunfade = 1.0 - clamp(1.0 - exp((sunPosition.y / 450000.0)), 0.0, 1.0);\r\n\tfloat rayleighCoefficient = rayleigh - (1.0 * (1.0 - sunfade));\r\n\tvec3 betaR = totalRayleigh(primaries) * rayleighCoefficient;\r\n\t\r\n\t// Mie coefficient\r\n\tvec3 betaM = totalMie(primaries, mieKCoefficient, turbidity) * mieCoefficient;\r\n\t\r\n\t// Optical length, cutoff angle at 90 to avoid singularity\r\n\tfloat zenithAngle = acos(max(0.0, dot(up, normalize(vWorldPosition - cameraPos))));\r\n\tfloat denom = cos(zenithAngle) + 0.15 * pow(93.885 - ((zenithAngle * 180.0) / pi), -1.253);\r\n\tfloat sR = rayleighZenithLength / denom;\r\n\tfloat sM = mieZenithLength / denom;\r\n\t\r\n\t// Combined extinction factor\r\n\tvec3 Fex = exp(-(betaR * sR + betaM * sM));\r\n\t\r\n\t// In-scattering\r\n\tvec3 sunDirection = normalize(sunPosition);\r\n\tfloat cosTheta = dot(normalize(vWorldPosition - cameraPos), sunDirection);\r\n\tvec3 betaRTheta = betaR * rayleighPhase(cosTheta * 0.5 + 0.5);\r\n\tvec3 betaMTheta = betaM * henyeyGreensteinPhase(cosTheta, mieDirectionalG);\r\n\tfloat sunE = sunIntensity(dot(sunDirection, up));\r\n\tvec3 Lin = pow(sunE * ((betaRTheta + betaMTheta) / (betaR + betaM)) * (1.0 - Fex), vec3(1.5));\r\n\tLin *= mix(vec3(1.0), pow(sunE * ((betaRTheta + betaMTheta) / (betaR + betaM)) * Fex, vec3(0.5)), clamp(pow(1.0 - dot(up, sunDirection), 5.0), 0.0, 1.0));\r\n\t\r\n\t// Composition + solar disc\r\n\tfloat sunAngularDiameterCos = cos(sunAngularDiameterDegrees);\r\n\tfloat sundisk = smoothstep(sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta);\r\n\tvec3 L0 = vec3(0.1) * Fex;\r\n\tL0 += sunE * 19000.0 * Fex * sundisk;\r\n\tvec3 texColor = Lin + L0;\r\n\ttexColor *= 0.04;\r\n\ttexColor += vec3(0.0, 0.001, 0.0025) * 0.3;\r\n\t\r\n\t// Tonemapping\r\n\tvec3 whiteScale = 1.0 / Uncharted2Tonemap(vec3(tonemapWeighting)); \r\n\tvec3 curr = Uncharted2Tonemap((log2(2.0 / pow(luminance, 4.0))) * texColor);\r\n\tvec3 color = curr * whiteScale;\r\n\tvec3 retColor = pow(color, vec3(1.0 / (1.2 + (1.2 * sunfade))));\r\n\t\r\n\tgl_FragColor.xyz = retColor;\r\n\tgl_FragColor.w = 1.0;\r\n}";
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
