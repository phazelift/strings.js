strings.js
==========

A flexible, robust and powerful Javascript string manipulation library. Contains the usual suspects and loads of
very handy additions. Written for myself, as I wanted some solid fundaments to build upon. There are more string
manipulation libs out there, but for many reasons I don't like them.. I expect not to be that unique, so give
strings.js a try, it's pretty cool and you might prefer it above the others as well!

String.prototype is not affected by strings.js
<br/>
<br/>
___
<br/>
Made for browser and/or node.js. You can use `npm install strings.js` if you like.
<br/>
<br/>
___
General description:
--------------------

Because strings.js is build upon types.js it is very robust. Almost any String type argument accepts a Number type and vice versa.
All input and output is checked for type validity. If you expect a `typeof 'string'`, you won't get `undefined` or
any other type that can break following code.

IMHO we shouldn't accept n-1 for strings in Javascript, it sucks and is not necessary.
All string indexes in strings.js are 1 based and translated to 0 based internally. Negative indexes can be used in most functions. -1 references
the last character in the string, 1 references the first character in the string.

The `new Strings()` object is made for chaining operations on strings, most of it's methods return their own context.
To return the actual value of the string, one can use `.get()` or `.$` or `.string`.

Almost all functionality of Strings prototypes, and some extra functions, are available from Strings static
function library.

types.js is included in strings.js as it is the fundament for strings.js. types.js and some other included tools
can be used as static methods from Strings. Descriptions for all included methods can be found in the API below.
The types.js API can be found in the phazelift/types.js repo.

I hope to give some better and more detailed examples later when I have time available for that. I am Also still working
on the API.. For now I recommend to check the Jasmine tests to see what strings.js is capable of, and do some fun
experiments yourself of course.

Some examples:
------------
```javascript

var Strings= require("strings.js");					// with node.js

// all comments reflect the value of s.string, except for .wrap
var s= new Strings( 'HELLO STRINGS!' );

s.lower('ello', 'trings').insert(' library', -1);	// Hello Strings library!
s.lower('h').toCamel(' ').remove('!');				// helloStringsLibrary
s.unCamel(' ').upper(1, 7).push('!');				// Hello Strings library!
s.remove('Hello', 'library', ' ');					// Strings!
s.prepend('reversed ').reverse();						// !sgnirtS desrever
s.shuffle();										// getriever!nrss dS (random on every run)
s.set();											// (.set with no usable argument wipes the string)

// let's get a little more funky:
s.set('scgbnaicrbtas').prepend('!').upper(-1)
	.remove('a', 'b', 'c').reverse();				// Strings!
s.setWrap( '<3 ' ).wrap;							// <3 Strings! (.wrap only returns the wrapped string, this.string is still <3)
s.applyWrap( 'I ', '!' ).get(88, 3, 4, 99);			// <3 (88 and 99 are out of range and thus ignored)
s.get();											// I <3 Strings! (wrap was applied to this.string)

// some static Methods
// all comments reflect the value of s
s= '      spaces        or tabs     in here?        ' ;
s= Strings.replace( s, 'not in s', 'ignored..' );	//        spaces        or tabs     in here?
Strings.split( s+ '\t\t  \t sparse?'  );			// [ 'spaces', 'or', 'tabs', 'in', 'here?' ]
s= Strings.oneSpaceAndTrim( s );                    // spaces or tabs in here?
s= Strings.remove( s, ' in here?' );                // spaces or tabs
s= Strings.xs( s, function(char, index){            // SpAcEs oR TaBs
    if (index %2 === 0)
        return char.toUpperCase();
    return true;
});
Strings.toCamel( 'a,comma,seperated,string', ',' );	// aCommaSeperatedString
Strings.unCamel( 'aCommaSeperatedString?', '_' );	// a_comma_seperated_string?
Strings.times('A', 3 );								// AAA
s= Strings.random( 20 );							// j#4-s,t0]`bRd86!,>=Z (create password/random string)
s= Strings.random( 10, Strings.ASCII_RANGE_NUMBERS );
													// 6206002371	(create random string in specific range)
// etc...

// The included libs/tools. Most methods can be directly used from Strings, only a few specific overloaded methods.
Types= require("strings.js").Types;
Chars= require("strings.js").Chars;

// When I have a little time available I will try to update the examples to have it more meaningful and elaborate.
// For now, check the API, there's a lot more!

```
___
API
---

In this API, the type of a dynamic Strings object is denoted with `<this>`. Therefore, all methods returning
`<this>` can be used for chaining.

this.string represents the actual state of the internal dynamic string.

This API is still a work in progress.
____
**Strings** constructor
> `<this> Strings( <string>/<number> string,  [string1, ..., stringN] )`

> Calls .set internally, so .set rules apply.

**Strings.prototype.string**
> `<string> string`

> Internal/contextual string, do not set direct, use someString.set() instead.

**Strings.prototype.set**
> `<this> set( <string>/<number> string,  [string1, ..., stringN] )`

> 	Sets this.string to string arguments, or resets this.string to '' if no argument is given. Arguments that or not of
> type String or Number will not be set.

**Strings.prototype.random**
> `<this> random( <string>/<number> amount, <array> asciiRange= Chars.ASCII_RANGE_ALL )`

> Applies a random string with amount characters within asciiRange. asciiRange is an Array with two indices; [min, max].
> If you want a custom range, you can better use: new Strings('mysecret007shuffle').shuffle()

**Strings.prototype.xs**
> `<string> xs( <function> callback(char, index){} )`

> Access every index of this.string and apply the result of the callback to it.

> If the callback returns true, char is applied. If the callback returns false or undefined, char will be skipped.
> Any character, String or Number returned by callback will be applied to index in string.

**Strings.prototype.times**
> `<this> times( <string>/<number> amount )`

> Duplicates this.string by amount, or leaves this.string unchanged if no amount is given.

**Strings.prototype.get**
> `<string> get( <string>/<number> indexes, [index1, ..., [indexN] )`

> Returns one or more indexes in a new string, without affecting this.string.
> Without arguments get() returns the full this.string.

**Strings.prototype.$**
> `<string> $` (getter)

> Returns this.get()

**Strings.prototype.copy**
> `<string> copy( <string>/<number> offset, <string>/<number> amount )`

> Returns a substring of this.string from offset to offset+amount.
> If amount is not given, all characters from offset to end of this.string are returned.
> If no arguments are given, a full copy of this.string is returned.

**Strings.prototype.empty**
> `<boolean> empty()`

> Returns true if this.string.length is < 1.

**Strings.isAlpha**
> `<boolean> isAlpha()`

> Returns true if this.string is in the range ['a'..'z'] and/or ['A'..'Z']

**Strings.isNumeric**
> `<boolean> isNumeric()`

> Returns true if this.string is in the range ['0'..'9']

**Strings.isAlphaNumeric**
> `<boolean> isAlphaNumeric()`

> Returns true if this.string is in the range ['a'..'z'] and/or ['A'..'Z'] and/or ['0'..'9']

**Strings.isSpecial**
> `<boolean> isSpecial()`

> Returns true if this.string is *NOT* in the range ['a'..'z'] and/or ['A'..'Z'] and/or ['0'..'9']

**Strings.prototype.isSpace**
> `<boolean> isSpace()`

> Returns true if this.string contains no characters other than spaces and/or horizontal tabs.

**Strings.prototype.push**
> `<this> push ( <string>/<number> string, [string1, ..., stringN] )`

> Append string(s) to this.string.

**Strings.prototype.pop**
> `<this> pop ( <string>/<number> amount )`

> 	Removes amount characters starting from the end of this.string going backwards, no arguments pops only one
> character.

**Strings.prototype.prepend**
> `<this> prepend ( <string>/<number> string, [string1, ..., stringN] )`

> 	Prepend this.string with string(s).

**Strings.prototype.insert**
> `<this> insert ( <string>/<number> insertion, <string>/<number> position= 1 )`

> Insert insertion at position in this.string, the insertion will be inserted before the character at position.
> If insert is invalid, or index is less than the negative length of the string, insertion will be prepended to the string.
> If position is greater than the length of the string, insertion will be appended to the string.

**Strings.prototype.trim**
> `<this> trim()`

> Removes white space characters, including spaces, tabs, form feeds, line feeds and other Unicode spaces, from the
> beginning and the end of the string.

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

> 	Reduces all horizontal tabs and/or spaces found in this.string to a maximum of one.

**Strings.prototype.oneSpaceAndTrim**
> `<this> oneSpaceAndTrim()`

>	Applies this.trim() and this.oneSpace() on this.string.

**Strings.prototype.find**
> `<array> find( <string>/<number> substring, <string> flags )`

> Returns an array containing all indexes where substring is found, or an empty array if there is no match.
> If flags is set to an empty string, only the first occurance of the found substring will be pushed into the array.
> find internally uses RegExp, so flags is 100% compatible with RegExp flags.

**Strings.prototype.count**
> `<number> count( <string>/<number> substring )`

> Returns the amount of times substring is found in this.string.

**Strings.prototype.contains**
> `<boolean> contains( <string>/<number> string )`

> Returns true if string is a substring of this.string, false if not.

**Strings.prototype.between**
> `<string> between( <string>/<number> before, <string>/<number> after )`

> Returns the string between before and after. The first occurance of before and the last occurance of
> after are matched. An empty string is returned in case of no match.

**Strings.prototype.slice**
> `<this> slice( <string>/<number> offset, <string>/<number> amount )`

> Crop this.string from offset with amount.

**Strings.prototype.crop**
> An alias for slice.

**Strings.prototype.truncate**
> `<this> truncate( <string>/<number> offset, <string>/<number> suffix )`

> Removes all characters after offset from this.string, and optionally add a suffix.

**Strings.prototype.remove**
> `<this> remove( <string>/<number> string,  [string1, ..., stringN] )`

> - Arguments are substrings - Remove all found/matching strings given as arguments from this.string.

**Strings.prototype.removeRange**
> `<this> removeRange( <string>/<number> index, <string>/<number> amount= 1 )`

> Removes amount character(s) from this.string, starting from index.

**Strings.prototype.removePos**
> `<this> removePos( <string>/<number> positions, [pos1, ..., posN] )`

> - Arguments are indices - Remove all (one character) positions given as arguments, from this.string.

**Strings.prototype.replace**
> `<this> replace( <string>/<number>/<regexp> subString, <string>/<number> replacement, <string> flags )`

> 	Replace the first or every occurence of subString in this.string with replacement depending on flags.
>	As Strings.replace internally uses RegExp you can set flags to your liking. flags defaults to 'g' (global)

**Strings.prototype.reverse**
> `<this> reverse()`

> 	Reverses this.string.

**Strings.prototype.upper**
> `<this> upper( <string>/<number> arg,  [arg1, ..., argN] )`

> 	If arg(s) are number(s), the character(s) in this.string at index or indexes are changed to uppercase.
> 	If arg(s) are character, all matching characters in this.string are changed to uppercase.
> 	Multiple character strings are matched as well.

**Strings.prototype.lower**
> `<this> lower( <string>/<number> arg,  [arg1, ..., argN] )`

> 	If arg(s) are number(s), the character(s) in this.string at index or indexes are changed to lowercase.
> 	If arg(s) are character, all matching characters in this.string are changed to lowercase.
> 	Multiple character strings are matched as well.

**Strings.prototype.shuffle**
> `<this> shuffle()`

> 	Randomizes the position of each character in this.string.

**Strings.prototype.toCamel**
> `<this> toCamel( <string> char= '-' )`

> 	Converts every following character matching char in this.string to uppercase, and removes char.

**Strings.prototype.unCamel**
> `<this> unCamel( <string>/<number> insertion= '-' )`

> Converts this.string camels to lower-case with insertion prepended. Insertion defaults to dashes, but can be set
> to any character of your liking.

**Strings.prototype.startsWith**
> `<boolean> startsWith( <string>/<number> start )`

> Returns true if this.string starts with start, false if not.

**Strings.prototype.endsWith**
> `<boolean> endsWith( <string>/<number> ending )`

> Returns true if this.string ends with ending, false if not.

**Strings.prototype.setWrap**
> `<this> setWrap( <string>/<number> prepend, <string>/<number> append )`

> Sets a wrapper that wraps this.string between prepend and append.
> Output of .get() or .$ is not affected by setWrap. Fetch .wrap to return the wrapped this.string

> You can add to prepend and append (outwards) by calling .setWrap again.

**Strings.prototype.removeWrap**
> `<this> removeWrap()`

> Removes the wrapper.

**Strings.prototype.applyWrap**
> `<this> applyWrap( <string>/<number> prepend, <string>/<number> append )`

> Calls setWrap and wraps the wrapper with prepend and append if set already. Then the total wrap is applied
> to this.string. Finally the wrapper method will be reset with removeWrap.

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

**Strings.wrap**
> `<object> Strings.wrap( <string>/<number> prepend, <string>/<number> append )`

> A functional method. Returns a function that takes a string as argument. The string passed as argument when calling
> the function will be returned wrapped, by prepend and append.

> You can add to prepend and append by calling .wrap on the wrapper as in myWrapper.wrap( 'outer prepend', 'outer append' );


___________________
Inherited functions
-------------------

_________________
**From chars.js**		( to be found in the phazelift repositories )
_________________

**Strings.ASCII_RANGE_UPPERCASE**
> `<array> Strings.ASCII_RANGE_UPPERCASE`

> An array with two indexes: [0] is the bottom of range, [1] is the top of range of the ordinal
> value of uppercase ascii characters.

**Strings.ASCII_RANGE_LOWERCASE**
> `<array> Strings.ASCII_RANGE_LOWERCASE`

> An array with two indexes: [0] is the bottom of range, [1] is the top of range of the ordinal
> value of lowercase ascii characters.

**Strings.ASCII_RANGE_NUMBERS**
> `<array> Strings.ASCII_RANGE_NUMBERS`

> An array with two indexes: [0] is the bottom of range, [1] is the top of range of the ordinal
> value of ascii number characters.

**Strings.ASCII_RANGE_ALL**
> `<array> Strings.ASCII_RANGE_ALL`

> An array with two indexes: [0] is the bottom of range, [1] is the top of range of the ordinal
> value of all 'printable' ascii characters.

**Strings.REGEXP_SPECIAL_CHARS**
> `<array> Strings.REGEXP_SPECIAL_CHARS`

> An array holding all special characters used in regular expressions.

**Strings.ascii**
> `<string> Strings.ascii( <string>/<number> ordinalNr )`

> Returns the ascii character with ordinalNr.

**Strings.ordinal**
> `<number> Strings.ordinal( <string>/<number> char )`

> Returns the ordinal value of an Ascii character.

**Strings.isUpper**
> `Strings.isUpper( <string> char )`

> Returns true if char is uppercase.

**Strings.isLower**
> `Strings.isLower( <string> char )`

> Returns true if char is lowercase.

**Strings.random**
>`Strings.random( asciiRange= Strings.ASCII_RANGE_ALL )`

> Returns a random character within the given asciiRange. See format above.

_________________
**From tools.js**	( to be found in the phazelift repositories now or soon )
_________________


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

_________________
**From types.js**	( to be found in phazelift repositories )
_________________

**types.js**
> The entire library is included in strings.js. Check the repo for general info and API.


__________

change log
==========

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