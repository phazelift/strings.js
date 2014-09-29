strings.js
==========

A flexible, robust and powerful Javascript string manipulation library, packed with the usual suspects and loads of
very handy additions, written in Coffeescript, available for all.

String.prototype is not affected by strings.js

Made for browser and/or node.js. You can use `npm install strings.js` if you like.

General description:
--------------------

strings.js is ROCK-SOLID! Almost any `<string>` type argument accepts `<number>` type as well, and will be parsed correctly
if possible. If not, an empty string will be returned or used for processing. All input and output is checked for type
validity. If you expect a `typeof 'string'`, you won't get `undefined` or any other type that can break following code.

All string indexes in strings.js are 1 based and translated to 0 based internally. Negative indexes can be used
in most functions. -1 references the last character in the string, 1 references the first character in the string.

The `new Strings()` object is made for chaining operations on strings. Most methods return their own context by default.
To return the actual value of the string, one can use `someString.get()` or `someString.$` or `someString.string`.

Almost all functionality of Strings prototypes, and some extra functions, are available from Strings static
function library.

strings.js depends on types.js, which is included in strings.min.js. types.js and the other included tools can be
used as static methods from Strings. Descriptions for all included methods can be found in the API below. The types.js
API can be found in the phazelift/types.js repo.

I expect typo's in this README.md as I don't have the time to make it waterproof, please let me know if you found some, thx.

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

// When I have a little time available I will try to update the examples to have it more meaningful and elaborate.
// For now, check the API, there's a lot more!

```
___
API
---


**Strings** constructor
> `Strings( <string>/<number> string,  [string1, ..., stringN] )`

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

> 	Insert insertion at position in this.string, the insertion will be inserted before the character at position.

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
> `<array> find( <string>/<number> substring )`

> 	Returns an array containing all indexes where substring is found, or an empty array if there is no match.

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
> `<this> removeRange( <string>/<number> index, <string>/<number> amount )`

> 	Removes amount character(s) from this.string, starting from index.

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

**Strings.force**
> `<string> Strings.force( <anyType> string, <string>/<number> replacement )`

> Returns/Forces string to be of type string. If conversion is not possible, replacement will be returned. If
> replacements cannot be converted to <string>, an empty string '' will be returned.

**Strings.create**
> `<string> Strings.create( <string>/<number> string,  [string1, ..., stringN] )`

> Returns an assembled string from given arguments of type String. Non String arguments are omitted.
> If no valid arguments are given, an empty string will be returned.

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
> `<array> Strings.find( <string>/<number> string, <string>/<number> query )`

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
> that it destroys spaces and empty strings to avoid ending up with a sparse array.

> The default delimiter is a (white)space.

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
**From chars.js**		( to be found in the phazelift repo's now or soon )
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
**From tools.js**	( to be found in the phazelift repo's now or soon )
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
> The entire (1.3kb minified) library is included in strings.js. Check the repo for general info and API.