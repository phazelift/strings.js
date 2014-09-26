Strings.js
==========

A flexible, robust and powerful Javascript string manipulation library, packed with the usual suspects and loads of
very handy additions, written for myself, available for all.

String.prototype is not affected by Strings.js


General description:
--------------------

All indexes in Strings are 1 based and translated to 0 based internally. Negative indexes can be used
in most functions. -1 references the last character in the string, 1 references the first character in the string.

The `new Strings()` object is made for chaining operations on strings. Most methods return their own context by default.
To return the actual value of the string, one can use `someString.get()` or `someString.$` or `someString.string`.

All input and output is checked for type validity, so the output is in pretty much all cases 'type correct'.

Almost all functionality of Strings prototypes, and some extra functions, are available from Strings static
function library.

Strings.js depends on Types.js, which is included in strings.min.js. Types.js and the other included tools can be
used as static methods from Strings. Descriptions for all included methods can be found in the API below.

Some examples:
------------
```javascript

// all comments reflect the value of s.string, except for .wrap

var s= new Strings( 'HELLO', ' ', 'STRINGS!' );		// HELLO STRINGS! (combine on create)

s.lower('ello', 'trings').insert(' library', -1);	// Hello Strings library!
s.lower('h').toCamel(' ').remove('!');					// helloStringsLibrary
s.unCamel(' ').upper(1, 7).push('!');				// Hello Strings library!
s.remove('Hello', 'library', ' ');					// Strings!
s.shift('reversed ').reverse();						// !sgnirtS desrever
s.set( {someObjectValue:'won\'t set objects'} );	// !sgnirtS desrever
s.shuffle();										// getriever!nrss dS (random on every run)

// let's get a little more funky:
s.set('scgbnaicrbtas').shift('!').upper(-1)
	.remove('a', 'b', 'c').reverse();				// Strings!
s.remove(-1).setWrap( '<3 ' ).wrap;					// <3 Strings (.wrap only returns the wrapped string, this.string is still 'Strings')
s.applyWrap( 'I ', '!' ).get();						// I <3 Strings!
s.get(88, 3, 4, 99);								// <3 (88 and 99 are out of range and thus ignored)

// Static Methods
// all comments reflect the value of s, except for Strings.split()

s= '      spaces        or tabs     in here?      ';//        spaces        or tabs     in here?
s= Strings.replace( s, 'not in s', 'ignored..' ); 	//        spaces        or tabs     in here?
array= Strings.split( s+ '\t\t  \t sparse?' );      // [ 'spaces', 'or', 'tabs', 'in', 'here?', 'sparse?' ]
s= Strings.oneSpaceAndTrim( s );                  	// spaces or tabs in here?
s= Strings.remove( s, ' in here?' );              	// spaces or tabs
// below is just to show how .xs works, use my Words.js library to do this way easier.
s= Strings.xs( s, function(char, index){          	// SpAcEs oR TaBs
    if (index %2 === 0)
        return char.toUpperCase();
    return true;
});

s= 'a,comma,seperated,string';						// a,comma,seperated,string
s= Strings.toCamel( s, ',' );						// aCommaSeperatedString
s= Strings.unCamel( s+ '?', '_' );					// a_comma_seperated_string?
s= Strings.times( 'A', 3 );							// AAA
// etc...

// Check the API, there's a lot more!

```
___
API
---


**Strings** constructor
> `Strings( string,  [string1, ..., stringN] )`

> Calls .set internally, so .set rules apply.

**Strings.prototype.string**
> `string`

> Internal/contextual string, do not set direct, use someString.set() instead.

**Strings.prototype.set**
> `set( string,  [string1, ..., stringN] )`

> 	Sets this.string to string arguments, or resets this.string to '' if no argument is given. Arguments that or not of
> type String or Number will not be set.

**Strings.prototype.xs**
> `xs( function(char, index){} )`

> Access every index of this.string and apply the result of callback to it.

> If the callback returns true, char is applied. If the callback returns false or undefined, char will be skipped.
> Any character, String or Number returned by callback will be applied to index in string.

**Strings.prototype.times**
> `times( amount )`

> Duplicates this.string by amount, or leaves this.string unchanged if no amount is given.

**Strings.prototype.get**
> `get( indexes, [index1, ..., [indexN] )`

> Returns one or more indexes in a new string, without affecting this.string.
> Without arguments get() returns the full this.string.

**Strings.prototype.$**
> `$` getter

> Returns this.get()

**Strings.prototype.copy**
> `copy( offset, amount )`

> Returns a substring of this.string from offset to offset+amount.
> If amount is not given, all characters from offset to end of this.string are returned.
> If no arguments are given, a full copy of this.string is returned.

**Strings.prototype.copy**
> `copy( offset, amount )`

> Returns a substring of this.string, starting at offset, with amount characters. If offset is greater than
> the length of this.string, an empty string will be returned.

**Strings.prototype.empty**
> `empty()`

> Returns true if this.string.length is < 1, false if > 0.

**Strings.isAlpha**
> `isAlpha( string,  [string1, ..., stringN] )`

> Returns true if all arguments are of type String in the range ['a'..'z'] and/or ['A'..'Z']

**Strings.isNumeric**
> `isNumeric( string,  [string1, ..., stringN] )`

> Returns true if all arguments are of type String in the range ['0'..'9']

**Strings.isAlphaNumeric**
> 'isAlphaNumeric( string,  [string1, ..., stringN] )`

> Returns true if all arguments are of type String in the range ['a'..'z'] and/or ['A'..'Z'] and/or ['0'..'9']

**Strings.prototype.isSpace**
> `isSpace( string )`

> Returns true if this.string contains no characters other than spaces or horizontal tabs.

**Strings.prototype.push**
> `push ( string )`

> 	Append string to this.string.

**Strings.prototype.pop**
> pop `( amount )`

> 	Removes amount characters starting from the end of this.string going backwards, no arguments pops only one
> character.

**Strings.prototype.shift**
> `shift ( string )`

> 	Prepend this.string with string.

**Strings.prototype.insert**
> `insert ( index, insertion )`

> 	Insert insertion at position index in this.string, the insertion will be inserted before the character at index.

**Strings.prototype.trim**
> `trim()`

> Removes white space characters, including spaces, tabs, form feeds, line feeds and other Unicode spaces.

**Strings.prototype.trimLeft**
> `trimLeft()`

> Removes white space characters, including spaces, tabs, form feeds, line feeds and other Unicode spaces
> from the start of this.string.

**Strings.prototype.trimRight**
> `trimRight()`

> Removes white space characters, including spaces, tabs, form feeds, line feeds and other Unicode spaces
> from the end of this.string.

**Strings.prototype.oneSpace**
> `oneSpace()`

> 	Reduces all tabs and/or spaces found in this.string to a maximum of one.

**Strings.prototype.oneSpaceAndTrim**
> `oneSpaceAndTrim()`

>	Applies this.trim() and this.oneSpace() on this.string.

**Strings.prototype.find**
> `find( string )`

> 	Returns an array containing all indexes where string is found, or an empty array if there is no match.

**Strings.prototype.count**
> `count( substring )`

> Returns the amount of times substring is found in this.string.

**Strings.prototype.contains**
> `contains( string )`

> Returns true if string is a substring of this.string, false if not.

**Strings.prototype.between**
> `between( before, after )`

> Returns the string between before and after. The first occurance of before and the last occurance of
> after are matched. An empty string is returned in case of no match.

**Strings.prototype.slice**
> `slice( offset, amount )`

> Crop this.string from offset with amount.

**Strings.prototype.truncate**
> `truncate( offset, suffix= '' )`

> Removes all characters after offset from this.string, with the option to add a suffix.

**Strings.prototype.remove**
> `remove( string,  [string1, ..., stringN] )`

> 	Removes all found/matching string arguments from this.string.

**Strings.prototype.removeIndex**
> `removeIndex( index, amount )`

> 	Removes amount character(s) from this.string, starting from position at index.

**Strings.prototype.replace**
> `replace( subString, replacement, flags )`

> 	Replace the first or every occurence of subString in this.string with replacement depending on flags.
>	As Strings.replace internally uses RegExp you can set flags to your liking. flags defaults to 'g' (global)

**Strings.prototype.reverse**
> `reverse()`

> 	Reverses this.string.

**Strings.prototype.upper**
> `upper( arg,  [arg1, ..., argN] )`

> 	If arg(s) are number(s), the character(s) in this.string at index or indexes are changed to uppercase.
> 	If arg(s) are character, all matching characters in this.string are changed to uppercase.
> 	Multiple character strings are matched as well.

**Strings.prototype.lower**
> `lower( arg,  [arg1, ..., argN] )`

> 	If arg(s) are number(s), the character(s) in this.string at index or indexes are changed to lowercase.
> 	If arg(s) are character, all matching characters in this.string are changed to lowercase.
> 	Multiple character strings are matched as well.

**Strings.prototype.shuffle**
> `shuffle()`

> 	Randomizes the position of each character in this.string.

**Strings.prototype.toCamel**
> `toCamel( char= '-' )`

> 	Converts all characters in this.string matching to char to camelcase.

**Strings.prototype.unCamel**
> `unCamel( insertion= '-' )`

> 	Converts this.string camels to lower-case with insertion prepended. Insertion defaults to dashes.

**Strings.prototype.startsWith**
> `startsWith( start )`

> Returns true if this.string starts with start, false if not.

**Strings.prototype.endsWith**
> `endsWith( end )`

> Returns true if this.string ends with ending, false if not.

**Strings.prototype.setWrap**
> `setWrap( prepend, append )`

> Sets a wrapper that wraps this.string between prepend and append.
> Output of .get() or .$ is not affected by setWrap. Fetch .wrap to return the wrapped this.string

> You can add to prepend and append (outwards) by calling .setWrap again.

**Strings.prototype.removeWrap**
> `removeWrap()`

> Removes the wrapper.

**Strings.prototype.applyWrap**
> `applyWrap( prepend, append )`

> Calls setWrap and wraps the wrapper with prepend and append if set already. Then the total wrap is applied
> to this.string. Finally the wrapper method will be reset with removeWrap.

**Strings.prototype.wrap**
> `wrap`

> Returns this.string wrapped by the text set with setWrap(). If setWrap() has not been called yet, only this.string
> will return.

Static functions
----------------

See descriptions for similar functions above..


**Strings.create**
> `Strings.create( string,  [string1, ..., stringN] )`

> Returns an assembled string from given arguments of type String. Non String arguments are omitted.
> If no valid arguments are given, an empty string will be returned.

**Strings.times**
> `Strings.times( string, amount )`

**Strings.regEscape**
> `Strings.regEscape( string )`

> Returns string with all found special regular expression characters in string escaped.

**Strings.empty**
> `Strings.empty( string )`

> In addition to Strings.prototype.empty; returns false if string is not of type String.

**Strings.isAlpha**
> `Strings.isAlpha( string,  [string1, ..., stringN] )`

**Strings.isNumeric**
> `Strings.isNumeric( string,  [string1, ..., stringN] )`

**Strings.isAlphaNumeric**
> 'Strings.isAlphaNumeric( string,  [string1, ..., stringN] )`

**Strings.isSpace**
> `Strings.isSpace( string )`

**Strings.xs**
> `Strings.xs( string, callback(char, index){} )`

> In addition to Strings.prototype.xs: xs returns the resulting string.

**Strings.copy**
> `Strings.copy( string, offset, amount )`

**Strings.replace**
> `Strings.replace( string, toReplace, replacement, flags )`

**Strings.trim**
> `Strings.trim( string )`

**Strings.trimLeft**
> `Strings.trimLeft( string )`

**Strings.trimRight**
> `Strings.trimRight( string )`

**Strings.oneSpace**
> `Strings.oneSpace( string )`

**Strings.oneSpaceAndTrim**
> `Strings.oneSpaceAndTrim( string )`

**Strings.toCamel**
> `Strings.toCamel( string, char= '-' )`

**Strings.unCamel**
> `Strings.unCamel( string, insertion= '-' )`

**Strings.shuffle**
> `Strings.shuffle( string )`

**Strings.find**
> `Strings.find( string, query )`

**Strings.count**
> `Strings.count( string, query )`

**Strings.contains**
> `Strings.contains( string, subString )`

**Strings.between**
> `Strings.between( string, before, after )`

**Strings.slice**
> `Strings.slice( string, start, size )`

**Strings.truncate**
> `Strings.truncate( string, length, suffix= '' )`

**Strings.pop**
> `Strings.pop( string, amount)`

**Strings.split**
> `Strings.split( string, delimiter )`

> Warning, this is a custom .split. It splits the string into an array by delimiter, with the difference
> that it destroys spaces and empty strings to avoid ending up with a sparse array

> The default delimiter is a (white)space.

**Strings.reverse**
> `Strings.reverse( string )`

**Strings.upper**
> `Strings.upper( string, args )`

**Strings.lower**
> `Strings.lower( string, args )`

**Strings.insert**
> `Strings.insert( string, index, insertion )`

**Strings.removeIndex**
> `Strings.removeIndex( string, offset, amount )`

**Strings.remove**
> `Strings.remove( string, toRemove )`

**Strings.startsWith**
> `Strings.startsWith( string, start )`

**Strings.endsWith**
> `Strings.endsWith( string, end )`

**Strings.wrap**
> `Strings.wrap( prepend, append )`

> A functional method. Returns a function that takes a string as argument. The string passed as argument when calling
> the function will be returned wrapped, by prepend and append.

> You can add to prepend and append by calling .wrap on the wrapper as in myWrapper.wrap( 'outer prepend', 'outer append' );



___________________
Inherited functions
-------------------

_______________
**From Chars:**
_______________

**Strings.ASCII_RANGE_UPPERCASE**

> An array with two indexes: [0] is the bottom of range, [1] is the top of range of the ordinal
> value of uppercase ascii characters.

**Strings.ASCII_RANGE_LOWERCASE**

> An array with two indexes: [0] is the bottom of range, [1] is the top of range of the ordinal
> value of lowercase ascii characters.

**Strings.ASCII_RANGE_NUMBERS**

> An array with two indexes: [0] is the bottom of range, [1] is the top of range of the ordinal
> value of ascii number characters.

**Strings.REGEXP_SPECIAL_CHARS**

> An array holding all special characters used in regular expressions.

**Strings.ascii**
> `Strings.ascii( ordinalNr )`

> Returns the ascii character with ordinalNr.

**Strings.ordinal**
> `Strings.ordinal( char )`

> Returns the ordinal value of an Ascii character.

**Strings.isUpper**
> `Strings.isUpper( char )`

> Returns true if char is uppercase.

**Strings.isLower**
> `Strings.isLower( char )`

> Returns true if char is lowercase.

**Strings.isAlpha**
> `Strings.isAlpha( char )`

> Returns true if char is a letter.

__________________
**From _ (Tools)**
__________________


**Strings.inRange**
> `Strings.inRange( nr, min, max )`

> Returns true if nr is >= min or <= max.

**Strings.randomNumber**
> `Strings.randomNumber( min, max )`

> Returns a (pseudo) random number in the range min..max. Only one argument given, will be evaluated as: 0..min.

**Strings.shuffleArray**
> `Strings.shuffleArray( array )`

> Returns array (pseudo)randomly shuffled.

**Strings.positiveIndex**
> `Strings.positiveIndex( index, range )`

> Returns a positive, 0 based index from a 1 based index positive or negative. If index is negative then
> it`s relative inverse (positive) number will be returned. If index is 0 or exceeding range, false is returned.

__________________
**From Types.js**
__________________

**Types.js**
> The entire (1.2kb) library is included in Strings.js. Check the repo for general info and API.
