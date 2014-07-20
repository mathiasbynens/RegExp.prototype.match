var assert = require('assert');
var assertEquals = assert.equal;
var assertDeepEquals = assert.deepEqual;
var assertThrows = assert['throws'];

require('../regexp-prototype-match.js');

assertEquals(RegExp.prototype.match.length, 1);
assertEquals(RegExp.prototype.propertyIsEnumerable('match'), false);

assertThrows(function() { RegExp.prototype.match.call(undefined, 'x'); }, TypeError);
assertThrows(function() { RegExp.prototype.match.call(null, 'x'); }, TypeError);
assertThrows(function() { RegExp.prototype.match.call(true, 'x'); }, TypeError);
assertThrows(function() { RegExp.prototype.match.call(false, 'x'); }, TypeError);
assertThrows(function() { RegExp.prototype.match.call('x', 'x'); }, TypeError);
assertThrows(function() { RegExp.prototype.match.call(42, 'x'); }, TypeError);
assertThrows(function() { /a/.match({ 'toString': function() { throw RangeError(); } }); }, RangeError);
assertThrows(function() { RegExp.prototype.match.call({ 'exec': function() { throw RangeError(); }}, 'x'); }, RangeError);
assertThrows(function() { RegExp.prototype.match.call({ 'exec': function() { return undefined; }}, 'x'); }, TypeError);
assertThrows(function() { RegExp.prototype.match.call({ 'exec': function() { return true; }}, 'x'); }, TypeError);
assertThrows(function() { RegExp.prototype.match.call({ 'exec': function() { return false; }}, 'x'); }, TypeError);
assertThrows(function() { RegExp.prototype.match.call({ 'exec': function() { return 'x'; }}, 'x'); }, TypeError);
assertThrows(function() { RegExp.prototype.match.call({ 'exec': function() { return 42; }}, 'x'); }, TypeError);

var regex = /b/g;
regex.lastIndex = 1;
var tests = {
	'abc': /a/,
	'ababab': /a/g,
	'bababa': regex,
	'bcd': /x/g
};

Object.keys(tests).forEach(function(string) {
	var regexA = tests[string];
	var regexB = regexA;
	var a = regexA.match(string);
	var b = string.match(regexB);
	assertDeepEquals(a, b);
	assertEquals(regexA.lastIndex, regexB.lastIndex);
});

var tmp = 0;
assertDeepEquals(/a/.match({ 'toString': function() { ++tmp; return 'a'; } }), 'a'.match(/a/));
assertEquals(tmp, 1);
