strings.js
==========
<br/>

A Javascript string manipulation library. No cryptic names, no methods returning undefined when you expect a string, etc.. Contains the usual suspects and some handy additions.

**key features:**
- most methods are available both static and dynamic
- most methods are chainable for the dynamic part
- Strings is 1 based; 1 is the first character of the string, -1 the last
- can use negative numbers in almost all methods to target from the end of the string
- can target with indexes and substring arguments mixed in some methods
- all methods are dynamically type checked if needed
- methods should always return the expected type

<br/>

______________________________________________
### a quick example:
```javascript
// discover strings:
var strings= new Strings( 'asagcnaicrbtas' )
	.reverse().remove('a','b','c').upper(1).append('!');
console.log( strings.$ );
// Strings!
strings.lower('s').remove('!').append( '.js' );
console.log( strings.$ );
// strings.js

// 33 character password from all printable ascii:
console.log( Strings.random(33) );
// 9&@w=Q+|Gxe`NzL='Q8?4IxAg0dUyq}]s (pseudo)

// or from numbers only:
console.log( Strings.random(33, Strings.ASCII_RANGE_NUMBERS) );
// 326579354237121359463402643861378

console.log( Strings.sort('326579354237121359463402643861378') );
// '011122223333333444455566667778899'

var sparse= '  \t\t max.   1  \t  consecutive   \t \tspace! \t ';
console.log( Strings.oneSpaceAndTrim(sparse) );
// max 1 consecutive space!

// there is so much more, see below
```

___
### node.js

Made for browser and/or node.js. You can use `npm install strings.js` at the base directory of your project, after that:
```javascript
var Strings= require( 'strings.js' );
```

### AMD
```javascript
require.config({
	paths: {
		'strings', [ 'path/to/strings.min.js' ]
	}
});

require( ['strings'], function( Strings ){
	console.log( Strings.times(':)', 3) );
	// :):):)
});
```
<br/>
___
### general description:

Because strings.js is build upon types.js it is very robust. Almost any String type argument accepts a Number type and viceversa.
All input and output is checked for type validity. If you expect a `typeof 'string'`, you won't get `undefined` or
any other type that can break following code.

IMHO we shouldn't accept n-1 for strings in Javascript, it sucks and is not necessary.
All string indexes in strings.js are 1 based and translated to 0 based internally. Negative indexes can be used in most functions. -1 references
the last character in the string, 1 references the first character in the string.

The `new Strings()` object is made for chaining operations on strings, most of it's methods return their own context.
To return the actual value of the string, one can use `.get()` or `.$` or `.string`.

Almost all functionality of Strings prototypes, and some extra functions, are available from Strings static
function library.

### included:

types.js essential type-checker/enforcer is included in strings.js. It is the fundament for strings.js and can be found after loading strings.js. 
```javascript
var types= Strings.Types;
```

The types.js API can be found at: https://github.com/phazelift/types.js.

### some more examples:
```javascript

var Strings= require("strings.js");					// with node.js

// all comments reflect the value of s.string, except for .wrap
var s= new Strings( 'HELLO STRINGS!' );

s.lower('ello', 'trings').insert(' library', -1);	// Hello Strings library!
s.lower('h').toCamel(' ').remove('!');				// helloStringsLibrary
s.unCamel(' ').upper(1, 7).push('!');				// Hello Strings library!
s.remove('Hello', 'library', ' ');					// Strings!
s.prepend('reversed ').reverse();					// !sgnirtS desrever
s.shuffle();										// getriever!nrss dS (random on every run)
s.set();											// (.set with no usable argument wipes the string)

// wrap 'Strings' .wrap returns the wrapped string
s.set('Strings').setWrap('<3 ', '!').wrap;			// <3 Strings!

// apply the wrap to s while wrapping it once again
s.applyWrap('I ', '!!')
s.get();											// I <3 Strings!!!

// some static Methods
// all comments reflect the value of s
s= '      spaces        or tabs     in here?        ' ;
s= Strings.replace(s, 'not in s', 'ignored..');		//        spaces        or tabs     in here?
Strings.split(s+ '\t\t  \t ');						// [ 'spaces', 'or', 'tabs', 'in', 'here?' ]
s= Strings.oneSpaceAndTrim(s);						// spaces or tabs in here?
s= Strings.remove(s, ' in here?');					// spaces or tabs
s= Strings.xs(s, function(char, index){				// SpAcEs oR TaBs
    if (index %2 === 0)
        return char.toUpperCase();
    return true;
});
Strings.toCamel('a,comma,seperated,string?', ',');	// aCommaSeperatedString?
Strings.unCamel('aUnderscoredString', '_');			// a_underscored_string
Strings.times('A', 3);								// AAA
s= Strings.random(20);								// j#4-s,t0]`bRd86!,>=Z (create password/random string)
s= Strings.random(10, Strings.ASCII_RANGE_NUMBERS);
													// 6206002371	(create random string in specific range)
// find more examples in the API below
```
___
API
---

In this API, the type of a dynamic Strings object is denoted with `<this>`. Therefore, all methods returning
`<this>` can be used for chaining.

this.string represents the actual state of the internal dynamic string.
____
**Strings** constructor
> `<this> Strings( <string>/<number> string,  [string1, ..., stringN] )`

> Calls .set internally, so .set rules apply, see below.
```javascript
var string= new Strings( 'All those characters..' );
```

**Strings.prototype.string**
> `<string> string`

> Internal/contextual string, do not set directly, use .set() instead to prevent bugs. You can of course use
> .string as a getter to fetch the string.
```javascript
	var myString= new Strings('The actual string');
	console.log( myString.string );
	// The actual string
```

**Strings.prototype.set**
> `<this> set( <string>/<number> string,  [string1, ..., stringN] )`

> 	Sets this.string to string arguments, or resets this.string to '' if no argument is given. Arguments that are not of
> type String or Number will not be set.
```javascript
var string= new Strings();
string.set('James ', 'Bond ', 'is ', 0, 0, 7);
// James Bond is 007
```
**Strings.prototype.sort**
> `<this> sort()`

> Returns this.string's characters sorted by their ordinal value.
```javascript
var string= new Strings( 'sort', 'charcters', 'and', 5, 2, 9, 1 );
console.log( string.sort().$ );
// 1259aaccdehnorrrsstt
```

**Strings.prototype.random**
> `<this> random( <string>/<number> amount, <array> asciiRange= Chars.ASCII_RANGE_ALL )`

> Applies a random string with amount characters within asciiRange. asciiRange is an Array with two indices; [min, max].
```javascript
// 10 random special characters
console.log( new Strings().random(10, Strings.ASCII_RANGE_SPECIAL_1) );
// &!! %.,./*
```

**Strings.prototype.xs**
> `<string> xs( <function> callback(char, index){} )`

> Access every index of this.string and apply the result of the callback to it.

> If the callback returns true, char is applied. If the callback returns false or undefined, char will be skipped.
> Any character, String or Number returned by callback will be applied to index in string.
```javascript
var string= new Strings('It is easy to change characters in any way!');
string.xs( function(ch){
	return (ch === ' ') ? ' * ' : true;
});
console.log( string.$ );
// It * is * easy * to * change * characters * in * any * way!
```

**Strings.prototype.times**
> `<this> times( <string>/<number> amount )`

> Duplicates this.string by amount, or leaves this.string unchanged if no amount is given.
```javascript
console.log( new Strings('<3 ').times(3).$ );
// <3 <3 <3
```

**Strings.prototype.get**
> `<string> get( <string>/<number> indexes, [index1, ..., [indexN] )`

> Returns one or more indexes in a new string, without affecting this.string.
> Without arguments get() returns the full this.string.
```javascript
var string= new Strings('sdblaem');
console.log( string.get(5, 1, 1, -2, -1, 3, 4, -2, 2) );
// assembled
```

**Strings.prototype.$**
> `<string> $` (getter)

> Returns this.get()

**Strings.prototype.copy**
> `<string> copy( <string>/<number> offset, <string>/<number> amount )`

> Returns a substring of this.string from offset to offset+amount.
> If amount is not given, all characters from offset to end of this.string are returned.
> If no arguments are given, a full copy of this.string is returned.
```javascript
var string= new Strings('copy a part');
console.log( string.copy(-4, 4) );
// part
```

**Strings.prototype.empty**
> `<boolean> empty()`

> Returns true if this.string.length is < 1.
```javascript
console.log( new Strings().empty() );
// true
```

**Strings.isAlpha**
> `<boolean> isAlpha()`

> Returns true if this.string is in the range ['a'..'z'] and/or ['A'..'Z']
```javascript
console.log( new Strings('abcIsAlpha').isAlpha() );
// true
```

**Strings.isNumeric**
> `<boolean> isNumeric()`

> Returns true if this.string is in the range ['0'..'9']
```javascript
console.log( new Strings('123').isNumeric() );
// true
```

**Strings.isAlphaNumeric**
> `<boolean> isAlphaNumeric()`

> Returns true if this.string is in the range ['a'..'z'] and/or ['A'..'Z'] and/or ['0'..'9']
```javascript
console.log( new Strings('abc123').isAlphaNumeric() );
// true
```

**Strings.isSpecial**
> `<boolean> isSpecial()`

> Returns true if this.string is *NOT* in the range ['a'..'z'] and/or ['A'..'Z'] and/or ['0'..'9'], but *in* the
> range of all printable ascii characters.
```javascript
console.log( new Strings('!@ #$').isSpecial() );
// true
// note that space is a special character!
```

**Strings.prototype.isSpace**
> `<boolean> isSpace()`

> Returns true if this.string contains no characters other than spaces and/or horizontal tabs.
```javascript
console.log( new Strings(' \t ').isSpace() );
// true
```

**Strings.prototype.isUpper**
> `<boolean> isUpper()`

> Returns true if this.string contains only uppercase characters.
```javascript
console.log( new Strings('ABC').isUpper() );
// true
```

**Strings.prototype.hasUpper**
> `<boolean> hasUpper()`

> Returns true if this.string contains at least one uppercase character.
```javascript
console.log( new Strings('aBc').hasUpper() );
// true
```

**Strings.prototype.isLower**
> `<boolean> isLower()`

> Returns true if this.string contains only lowercase characters.
```javascript
console.log( new Strings('abc').isLower() );
// true
```

**Strings.prototype.push**
> `<this> push ( <string>/<number> string, [string1, ..., stringN] )`

> Append string(s) to this.string.
```javascript
var string= new Strings('add to this ').push('string', '?');
console.log( string.$ );
// add to this string?
```

**Strings.prototype.pop**
> `<this> pop ( <string>/<number> amount )`

> 	Removes amount characters starting from the end of this.string going backwards, no arguments pops only one
> character.
```javascript
var string= new Strings('remove characters from the end').pop(13);
console.log( string.$ );
// remove characters
```

**Strings.prototype.prepend**
> `<this> prepend ( <string>/<number> string, [string1, ..., stringN] )`

> 	Prepend this.string with string(s).
```javascript
var string= new Strings('to prepend').prepend(1, '. some', ' strings ');
console.log( string.$ );
// 1. some strings to prepend

**Strings.prototype.insert**
> `<this> insert ( <string>/<number> insertion, <string>/<number> pos, [pos, ..., posN] )`

> Insert insertion at pos in this.string, the insertion will be inserted before the character at pos. If insertion is invalid,
> or index is less than the negative length of the string, insertion will be prepended to the string. If pos is greater than
> the length of the string, insertion will be appended to the string.

> Multiple positions are allowed, but duplicate positions ignored. Positions are relative to the string before insertion,
> so, if our string is `'123'` and we insert `'-'` at position 2 and 3, we will get `'1-2-3'`.
```javascript
var string= new Strings('wherearethespaces?').insert(' ', 6, 9, 12 );
console.log( string.$ );
// where are the spaces?

**Strings.prototype.trim**
> `<this> trim()`

> Removes white space characters, including spaces, tabs, form feeds, line feeds and other Unicode spaces, from the
> beginning and the end of the string.
```javascript
var string= new Strings('   \t remove leading and trailing tabs and spaces    \t').trim();
console.log( string.$ );
// remove leading and trailing tabs and spaces
```

**Strings.prototype.trimLeft**
> `<this> trimLeft()`

> Removes white space characters, including spaces, tabs, form feeds, line feeds and other Unicode spaces
> from the start of this.string.

**Strings.prototype.trimRight**
> `<this> trimRight()`

> Removes white space characters, including spaces, tabs, form feeds, line feeds and other Unicode spaces
> from the end of this.string.

**Strings.prototype.oneSpace**
> `<this> oneSpace()`

> 	Reduces all consecutive horizontal tabs and/or spaces found in this.string to a maximum of one.
```javascript
var string= new Strings('sparse   	 	 strings   \t  cleaned  up!').oneSpace();
console.log( string.$ );
// sparse strings cleaned up!

**Strings.prototype.oneSpaceAndTrim**
> `<this> oneSpaceAndTrim()`

>	Applies this.trim() and this.oneSpace() on this.string.
```javascript
var string= new Strings('  \t  sparse    strings   \t  cleaned  up!  \t ').oneSpaceAndTrim();
console.log( string.$ );
// sparse strings cleaned up!

**Strings.prototype.find**
> `<array> find( <string>/<number> substring, <string> flags )`

> Returns an array containing all indexes where substring is found, or an empty array if there is no match.
> If flags is set to an empty string, only the first occurance of the found substring will be pushed into the array.
> find internally uses RegExp, so flags is 100% compatible with RegExp flags.
```javascript
console.log( new Strings('find character positions').find(' ') );
// [ 5, 15 ]
```

**Strings.prototype.count**
> `<number> count( <string>/<number> substring )`

> Returns the amount of times substring is found in this.string.
```javascript
console.log( new Strings('now count the spaces in this string').count(' ') );
// 6
console.log( new Strings('count substrings in this string').count('string') );
// 2
```

**Strings.prototype.contains**
> `<boolean> contains( <string>/<number> string )`

> Returns true if string is a substring of this.string, false if not.
```javascript
console.log( new Strings('any spaces in here?').contains('spaces') );
// true
```

**Strings.prototype.between**
> `<string> between( <string>/<number> before, <string>/<number> after )`

> Returns the string between before and after. The first occurance of before and the last occurance of
> after are matched. An empty string is returned in case of no match.
```javascript
console.log( new Strings('what is (between) the braces?').between('(', ')') );
// between
```

**Strings.prototype.slice**
> `<this> slice( <string>/<number> offset, <string>/<number> amount )`

> Crop this.string from offset with amount.
```javascript
console.log( new Strings('fetch a slice of this').slice(9, 5).$ );
// slice
```

**Strings.prototype.crop**
> An alias for slice.

**Strings.prototype.truncate**
> `<this> truncate( <string>/<number> offset, <string>/<number> suffix )`

> Removes all characters after offset from this.string, and optionally add a suffix.
```javascript
var string= new Strings('is truncate pop with a suffix?')
	.truncate(15, '? No, it counts from the start, and you can add a suffix.');
console.log( string.$ );
// is truncate pop? No, it counts from the start and you can add a suffix.
```

**Strings.prototype.remove**
> `<this> remove( <string>/<number> string,  [string1, ..., stringN] )`

> - Arguments are substrings - Remove all found/matching strings given as arguments from this.string.
```javascript
var string= new Strings('what is the lifetime of a string?');
console.log( string.remove( 'what', 'is ', '?').$ );
// the lifetime of a string
```

**Strings.prototype.removeRange**
> `<this> removeRange( <string>/<number> index, <string>/<number> amount= 1 )`

> Removes amount character(s) from this.string, starting from index.
```javascript
var string= new Strings('what is the lifetime of a string?');
console.log( string.removeRange(8, 16).$ );
// what is a string?
```

**Strings.prototype.removePos**
> `<this> removePos( <string>/<number> positions, [pos1, ..., posN] )`

> - Arguments are indices - Remove all (one character) positions given as arguments, from this.string.
```javascript
var string= new Strings('remove single characters from this string?');
console.log( string.removePos(-1, 1, 2) );
// move single characters from this string
```

**Strings.prototype.replace**
> `<this> replace( <string>/<number>/<regexp> subString, <string>/<number> replacement, <string> flags )`

> 	Replace the first or every occurence of subString in this.string with replacement depending on flags.
>	As Strings.replace internally uses RegExp you can set flags to your liking. flags defaults to 'g' (global)
```javascript
console.log( new Strings('almost standard..').replace('almost', 'not so').$ );
// not so standard
```

**Strings.prototype.reverse**
> `<this> reverse()`

> 	Reverses this.string.
```javascript
console.log( new Strings('desrever').reverse().$ );
// reversed
```

**Strings.prototype.upper**
> `<this> upper( <string>/<number> arg,  [arg1, ..., argN] )`

> 	If arg(s) are number(s), the character(s) in this.string at index or indexes are changed to uppercase.
> 	If arg(s) are character, all matching characters in this.string are changed to uppercase.
> 	Multiple character strings are matched as well.
```javascript
console.log( new Strings('change case').upper('c').$ );
// Change Case
console.log( new Strings('change case').upper(1, 3, 5, -2, -4).$ );
// ChAnGe CaSe
```

**Strings.prototype.lower**
> `<this> lower( <string>/<number> arg,  [arg1, ..., argN] )`

> Same as .upper, it only changes uppercase characters to lowercase.

**Strings.prototype.shuffle**
> `<this> shuffle()`

> 	Randomizes(pseudo) the position of each character in this.string.
```javascript
console.log( new Strings('shuffle').shuffle().$ );
// fsfluhe (pseudo random)
```

**Strings.prototype.toCamel**
> `<this> toCamel( <string> char= '-' )`

> 	Converts every following character matching char in this.string to uppercase, and removes char.
```javascript
console.log( new Strings('underscores_to_camels').toCamel('_').$ );
underscoresToCamels
```

**Strings.prototype.unCamel**
> `<this> unCamel( <string>/<number> insertion= '-' )`

> Converts this.string camels to lower-case with insertion prepended. Insertion defaults to dashes, but can be set
> to any character of your liking.
```javascript
console.log( new Strings('underscoresFromCamels').unCamel('_').$ );
underscores_from_camels
```

**Strings.prototype.startsWith**
> `<boolean> startsWith( <string>/<number> start )`

> Returns true if this.string starts with start, false if not.
```javascript
console.log( new Strings('abc 123').startsWith('ab') );
// true
```

**Strings.prototype.endsWith**
> `<boolean> endsWith( <string>/<number> ending )`

> Returns true if this.string ends with ending, false if not.
```javascript
console.log( new Strings('abc 123').endsWith('23') );
// true
```

**Strings.prototype.charactersMatch**
> `<boolean> charactersMatch( <string> string )`

> Returns true if the count for each specific character in this.string is equal to the string given
```javascript
console.log( new Strings('abc').charactersMatch('cba') );
// true
```

**Strings.prototype.setWrap**
> `<this> setWrap( <string>/<number> prepend, <string>/<number> append )`

> Sets a wrapper that wraps this.string between prepend and append.
> Output of .get() or .$ is not affected by setWrap. Fetch .wrap to return the wrapped this.string

> You can add to prepend and append (outwards) by calling .setWrap again.
```javascript
var string= new Strings('<3').setWrap( 'she ', ' me');
// string is unchanged
console.log( string.$ );
// <3

// but .wrap shows the string wrapped
console.log( string.wrap+ '!' );
// she <3 me!

// and why not wrap once more:
string.setWrap('Will ', ' forever?');
console.log( string.wrap );
// Will she <3 me forever?

// still not applied to string
console.log( string.$+ '..' );
// <3..

// use .setWrap to apply the wrap to string
string.applyWrap();
console.log( string.$ );
// Will she <3 me forever?
```

**Strings.prototype.removeWrap**
> `<this> removeWrap()`

> Removes the wrapper.

**Strings.prototype.applyWrap**
> `<this> applyWrap( <string>/<number> prepend, <string>/<number> append )`

> Calls setWrap and wraps the wrapper with prepend and append if set already. Then the total wrap is applied
> to this.string. Finally the wrapper method will be reset with removeWrap.
```javascript
var string= new Strings('<3').applyWrap( 'She ', '\'s me!');
console.log( string.$ );
// She <3's me!
```

**Strings.prototype.wrap**
> `<string> wrap` (getter)

> Returns this.string wrapped by the text set with setWrap(). If setWrap() has not been called yet, only this.string
> will return.

________________
Static functions
----------------

See descriptions for similar functions above.
______________________________________________

**Strings.create**
> `<string> Strings.create( <string>/<number> string,  [string1, ..., stringN] )`

> Returns an assembled string from given arguments of type String. Non String arguments are omitted.
> If no valid arguments are given, an empty string will be returned.

**Strings.get**
> `<string> Strings.get( <string>/<number> string, [<number> position1, ..., positionN] )`

> Returns a string containing every position from string given, in the order they were given.
> Invalid positions are ignored and won't disrupt the process.

**Strings.sort**
> `<string> Strings.sort( <string>/<number> string )`

**Strings.random**
> `<string> Strings.random( <string>/<number> amount= 1, <array> asciiRange= Chars.ASCII_RANGE_ALL )`

**Strings.times**
> `<string> Strings.times( <string>/<number> string, <string>/<number> amount )`

**Strings.regEscape**
> `<string> Strings.regEscape( <string>/<number> string )`

> Returns string with all found special regular expression characters in string escaped.

**Strings.empty**
> `<boolean> Strings.empty( <string>/<number> string )`

**Strings.isAlpha**
> `<boolean> Strings.isAlpha( <string>/<number> string,  [string1, ..., stringN] )`

**Strings.isNumeric**
> `<boolean> Strings.isNumeric( <string>/<number> string,  [string1, ..., stringN] )`

**Strings.isAlphaNumeric**
> `<boolean> Strings.isAlphaNumeric( <string>/<number> string,  [string1, ..., stringN] )`

**Strings.isSpecial**
> `<boolean> Strings.isSpecial( <string>/<number> string )`

> Returns true if string contains only special ascii characters.

**Strings.isSpace**
> `<boolean> Strings.isSpace( <string>/<number> string )`

**Strings.isUpper**
> `<boolean> Strings.isUpper( <string>/<number> string )`

**Strings.hasUpper**
> `<boolean> Strings.hasUpper( <string>/<number> string )`

**Strings.isLower**
> `<boolean> Strings.isLower( <string>/<number> string )`

**Strings.xs**
> `<string> Strings.xs( <string>/<number> string, <function> callback( <string> char, <number> index ){} )`

**Strings.copy**
> `<string> Strings.copy( <string>/<number> string, <string>/<number> offset, <string>/<number> amount )`

**Strings.replace**
> `<string> Strings.replace( <string>/<number> string, <string>/<number>/<regexp> toReplace, <string>/<number> replacement, <string> flags )`

**Strings.trim**
> `<boolean> Strings.trim( <string>/<number> string )`

**Strings.trimLeft**
> `<boolean> Strings.trimLeft( <string>/<number> string )`

**Strings.trimRight**
> `<boolean> Strings.trimRight( <string>/<number> string )`

**Strings.oneSpace**
> `<boolean> Strings.oneSpace( <string>/<number> string )`

**Strings.oneSpaceAndTrim**
> `<boolean> Strings.oneSpaceAndTrim( <string>/<number> string )`

**Strings.toCamel**
> `<string> Strings.toCamel( <string>/<number> string, <string>/<number> char= '-' )`

**Strings.unCamel**
> `<string> Strings.unCamel( <string>/<number> string, <string>/<number> insertion= '-' )`

**Strings.shuffle**
> `<string> Strings.shuffle( <string>/<number> string )`

**Strings.find**
> `<array> Strings.find( <string>/<number> string, <string>/<number> query, <string> flags )`

**Strings.count**
> `<number> Strings.count( <string>/<number> string, <string>/<number> query )`

**Strings.contains**
> `<boolean> Strings.contains( <string>/<number> string, <string>/<number> subString )`

**Strings.between**
> `<string> Strings.between( <string>/<number> string, <string>/<number> before, <string>/<number> after )`

**Strings.slice**
> `<string> Strings.slice( <string>/<number> string, <string>/<number> start, <string>/<number> size )`

**Strings.crop**
> An alias for Strings.slice.

**Strings.truncate**
> `<string> Strings.truncate( <string>/<number> string, <string>/<number> length, <string>/<number> suffix= '' )`

**Strings.pop**
> `<string> Strings.pop( <string>/<number> string, <string>/<number> amount)`

**Strings.split**
> `<array> Strings.split( <string>/<number> string, <string>/<number> delimiter )`

> Warning, this is a custom .split. It splits the string into an array by delimiter, with the difference
> that it destroys spaces, tabs, line-feeds, carriage-returns and skips empty strings to avoid ending up with a
> sparse array.

> The default delimiter is a (white)space. delimiter is truncated to 1 character.

**Strings.reverse**
> `<string> Strings.reverse( <string>/<number> string )`

**Strings.upper**
> `<string> Strings.upper( <string> string, <string>/<number> args [args1, ..., argsN] )`

**Strings.lower**
> `<string> Strings.lower( <string> string, <string>/<number> args [args1, ..., argsN] )`

**Strings.insert**
> `<string> Strings.insert( <string>/<number> string, <string>/<number> index, <string>/<number> insertion )`

**Strings.removeRange**
> `<string> Strings.removeRange( <string>/<number> string, <string>/<number> offset, <string>/<number> amount )`

**Strings.removePos**
> `<string> removePos( <string>/<number> positions, [pos1, ..., posN] )`

**Strings.remove**
> `<string> Strings.remove( <string>/<number> string, <string>/<number> toRemove )`

**Strings.startsWith**
> `<boolean> Strings.startsWith( <string>/<number> string, <string>/<number> start )`

**Strings.endsWith**
> `<boolean> Strings.endsWith( <string>/<number> string, <string>/<number> end )`

**Strings.charactersMatch**
> `<boolean> Strings.charactersMatch( <string> string1, <string> string2 )`


**Strings.wrap**
> `<object> Strings.wrap( <string>/<number> prepend, <string>/<number> append )`

> A functional method. Returns a function that takes a string as argument. The string passed as argument when calling
> the function will be returned wrapped, by prepend and append.

> You can add to prepend and append by calling .wrap on the wrapper as in myWrapper.wrap( 'outer prepend', 'outer append' );


___________________
###Tools and imports from my other libraries:


**Strings.ASCII_RANGE_...**

|Range										|Ordinal range	|Characters found in range
|:----------------------------------|--------------|:-----------------------------
|Strings.ASCII_RANGE_UPPERCASE		|[65,90]			|`ABCDEFGHIJKLMNOPQRSTUVWXYZ`
|Strings.ASCII_RANGE_LOWERCASE		|[97,122]		|`abcdefghijklmnopqrstuvwxyz`
|Strings.ASCII_RANGE_NUMBERS			|[48,57]			|`0123456789`
|Strings.ASCII_RANGE_SPECIAL_1		|[32,47]			|` !"#$%&'()*+,-./`
|Strings.ASCII_RANGE_SPECIAL_2		|[58,64]			|`:;<=>?@`
|Strings.ASCII_RANGE_SPECIAL_3		|[91,96]			|`[\]^_`\`
|Strings.ASCII_RANGE_SPECIAL_4		|[123,126]		|`{|}~`
|Strings.ASCII_RANGE_ALL(printable)	|[32,126]		|` !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`\``abcdefghijklmnopqrstuvwxyz{|}~`

**Strings.REGEXP_SPECIAL_CHARS**
> `<array> Strings.REGEXP_SPECIAL_CHARS`

> An array holding all special characters used in regular expressions.

**Strings.ascii**
> `<string> Strings.ascii( <string>/<number> ordinalNr )`

> Returns the ascii character with ordinalNr.

**Strings.ordinal**
> `<number> Strings.ordinal( <string>/<number> char )`

> Returns the ordinal value of an Ascii character.

**Strings.random**
>`Strings.random( asciiRange= Strings.ASCII_RANGE_ALL )`

> Returns a random character within the given asciiRange. See format above.


**Strings.inRange**
> `<boolean> Strings.inRange( <string>/<number> nr, <array> range )`

> Returns true if nr is in range, including the bounds of range. range is an Array with two indices; [min, max].

**Strings.limitNumber**
> `<number> Strings.limitNumber( <string>/<number> nr, <array> range )`

> Returns nr limited to range. range is an Array with two indices; [min, max].

**Strings.randomNumber**
> `<number> Strings.randomNumber( <string>/<number> min, <string>/<number> max )`

> Returns a (pseudo) random number in the range min..max.

**Strings.shuffleArray**
> `<array> Strings.shuffleArray( <array> array )`

> Returns array (pseudo)randomly shuffled.

**Strings.positiveIndex**
> `<number> Strings.positiveIndex( <string>/<number> index, <string>/<number> limit )`

> Returns an absolute, 0 based index from a 1 based index positive or negative number. If index is negative then
> it`s relative positive number will be returned. If index is 0 or exceeding limit, false is returned.

**Strings.insertSort**
> `<array> Strings.insertSort( <array> array )`

> A basic insert-sort on array. Return value is just for convenience.

**Strings.noDupAndReverse**
> `<array> Strings.noDupAndReverse( <array> array )`

> Removes duplicates from, and reverses the array. Only works on sorted arrays, which you can do with insertSort.

_________________
##types.js

> The full library (~2kB) is included in strings.js. Check https://github.com/phazelift/types.js for general info and API.


__________

change log
==========


**1.3.1**

changes license to MIT

---
**1.3.0**

Adds charactersMatch method, now we can check for example wether 'cnei' matches 'nice' in length and characters used

---
**1.2.8**

Removes the included types.js code. For node.js there are no changes, but if you want to load strings.js in the browser you'll now first have to load types.js:

>```html
<script src="your-path-to-js-libs/types.min.js"></script>
<script src="your-path-to-js-libs/strings.min.js"></script>
```

---
**1.2.7**

Updated the included types.js to (the current) version 1.5.0
___
**1.2.5**

Added AMD support.
___
**1.2.3**

Added Strings.prototype.isUpper(), Strings.prototype.isLower(), Strings.isUpper() and Strings.isLower().
They were missing after removal in 1.2.0... Also added Strings.hasUpper().
___
**1.2.2**

Updated the included types.js to (the current) version 1.4.2
___
**1.2.0**

Started improving the running-speed of all methods. It's a work in progress.

Removed due to optimization:
-	Chars.isUpper, Chars.isLower, Chars.isAlpha, Chars.isNumeric, Chars.isSpecial, Chars.isAlphaNumeric

Optimized (some stage..):
-	Strings.isUpper, Strings.isLower, Strings.isAlpha, Strings.isNumeric, Strings.isSpecial,
	Strings.isAlphaNumeric, Strings.startsWith

Added elementary running-speed results, to be found in tests.

Updated Jasmine tests and readme.
__________________________________
**1.1.9**

Made available `Strings.insertSort()` and `Strings.noDupAndReverse()` in the Tools section, I can now remove them from words.js.

Updated readme.

__________________________________
**1.1.7**

Added:
-	`Strings.sort( string )`, `Strings.prototype.sort()`, now you can sort the characters of your string by ordinal value.

Changed:
-	Strings.insert now allows for inserting to multiple positions. Invalid or no index given will now return the original string.

Updated:
-	Readme
-	Jasmine tests

___________________________________
**1.1.4**

Updated types.js to version 1.3.4
___________________________________
**1.1.3**

Added Jasmine tests for the static part of the library. The dynamic part was thorougly tested already, but I hope
to add soon some tests for that as well.

types.js included in strings.js is updated to the latest version now.

Many little enhancements and a few minor bug fixes.

Added:
- Strings.get().

Removed:

- Strings.force, as force is now implemented in types.js. Use Strings.forceString, or the other force'Types'
from types.js.

__________

###license

MIT