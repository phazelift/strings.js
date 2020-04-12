# strings.coffee - A Javascript string manipulation library, written in Coffeescript.
#
# MIT License
#
# Copyright (c) 2014 Dennis Raymondo van der Sluis
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#

"use strict"

Types= require 'types.js'



# returns the amount of successful parseInt's on array
mapStringToNumber= ( array ) ->
	return 0 if _.notArray array
	for value, index in array
		nr= _.forceNumber value
		return index if nr.void
		array[ index ]= nr
	return array.length

#															_ (selection of tools)

class _

	@inRange: ( nr, range ) ->
		return false if (Types.isNaN nr= parseInt nr, 10) or (mapStringToNumber( range ) < 2)
		return (nr >= range[0]) and (nr <= range[1])

	@limitNumber= ( nr, range ) ->
		nr= Types.forceNumber nr, 0
		return nr if mapStringToNumber( range ) < 2
		return range[0] if nr < range[0]
		return range[1] if nr > range[1]
		return nr

	@randomNumber: ( min, max ) ->
		return 0 if mapStringToNumber([min, max]) < 2
		return min if max < min
		max= (max- min)+ 1
		return Math.floor ( Math.random()* max )+ min

	@shuffleArray: ( array ) ->
		return [] if Types.notArray(array) or array.length < 1
		length= array.length- 1
		for i in [length..0]
			rand= _.randomNumber 0, i
			temp= array[ i ]
			array[ i ]= array[ rand ]
			array[ rand ]= temp
		return array

	@positiveIndex: ( index, max ) ->
		return false if 0 is index= Types.forceNumber index, 0
		max= Math.abs Types.forceNumber max
		if Math.abs( index ) <= max
			return index- 1 if index > 0
			return max+ index
		return false

	@insertSort: ( array ) ->
		length= array.length- 1
		for index in [ 1..length ]
			current	= array[ index ]
			prev		= index- 1
			while (prev >= 0) && (array[ prev ] > current)
				array[ prev+1 ]= array[ prev ]
				--prev
			array[ +prev+1 ]= current
		return array

	# only for sorted arrays
	@noDupAndReverse: ( array ) ->
		length= array.length- 1
		newArr= []
		for index in [length..0]
			newArr.push array[ index ] if newArr[ newArr.length- 1 ] isnt array[ index ]
		return newArr

	# process arguments list to contain only positive indexes, sorted, reversed order, and duplicates removed
	@sortNoDupAndReverse: ( array, maxLength ) ->
		processed= []
		for value, index in array
			value= Types.forceNumber value
			continue if value.void
			if value <= maxLength
				value= _.positiveIndex value, maxLength
			processed.push Types.forceNumber value, 0
		return _.noDupAndReverse _.insertSort processed

	constructor: ->

# copy types.js as static methods into _
for type of Types then _[ type ] = Types[ type ]
		
#																	Chars (selection of chars.js)

class Chars extends _

	@ASCII_RANGE_UPPERCASE	: [65, 90]
	@ASCII_RANGE_LOWERCASE	: [97, 122]
	@ASCII_RANGE_NUMBERS		: [48, 57]
	@ASCII_RANGE_SPECIAL_1	: [32, 47]
	@ASCII_RANGE_SPECIAL_2	: [58, 64]
	@ASCII_RANGE_SPECIAL_3	: [91, 96]
	@ASCII_RANGE_SPECIAL_4	: [123, 126]
	@ASCII_RANGE_ALL			: [32, 126]

	@REGEXP_SPECIAL_CHARS: ['?', '\\', '[', ']', '(', ')', '*', '+', '.', '/', '|', '^', '$', '<', '>', '-', '&']

	@ascii: ( ordinal ) -> String.fromCharCode _.forceNumber ordinal
	@ordinal: ( char ) -> _.forceNumber _.forceString(char).charCodeAt(), 0

	@random: ( range ) ->
		if (not _.isArray(range)) or (range.length < 2)
			range= Chars.ASCII_RANGE_ALL
		min= _.limitNumber( range[0], range )
		max= _.limitNumber( range[1], range )
		return Chars.ascii _.randomNumber min, max

	constructor: ->
		super()

#
#																	Strings

# refactor this later, and get rid of the ..., arguments[n] are ~10 times faster.
changeCase= ( string= '', caseMethod, args... ) ->
	return string if '' is string= _.forceString string
	if (args.length < 1) or args[0] is undefined
		return string[ caseMethod ]()
	else if _.isNumber( args[0] ) then for arg in args
		pos= _.positiveIndex( arg, string.length )
		string= Strings.xs string, ( char, index ) ->
			return char[ caseMethod ]() if index is pos
			return char
	else if _.isString( args[0] ) then for arg in args
		string= Strings.replace string, arg, arg[ caseMethod ](), 'gi'
	return string

asciiStringType= ( string, method ) ->
	return false if '' is string= _.forceString string
	for char in string
		return false if not method char
	return true



class Strings extends Chars

	@Types: Types
	@Chars: Chars

	@create: ->
		string= ''
		string+= _.forceString( arg ) for arg in arguments
		return string

	@get: ( string, positions... ) ->
		return '' if arguments.length < 2
		string	= _.forceString string
		length	= string.length
		result	= ''
		argsLength= arguments.length
		for pos in [1..argsLength]
			pos= _.positiveIndex arguments[pos], length
			result+= string[ pos ] if pos isnt false
		return result

	@sort: ( string ) ->
		string= _.forceString( string ).trim().split( '' )
		return _.insertSort( string ).join ''

	@random: ( amount, charSet ) ->
		amount= _.forceNumber amount, 1
		string= ''
		string+= Chars.random(charSet) for i in [1..amount]
		return string;

	@times: ( string, amount ) ->
		return '' if '' is string= _.forceString string
		amount= _.forceNumber amount, 1
		multi= ''
		multi+= string while amount-- > 0
		return multi

	@regEscape: ( string ) ->
		return string if '' is string= _.forceString string
		return Strings.xs string, ( char ) ->
			return '\\'+ char	if char in Chars.REGEXP_SPECIAL_CHARS
			return true

	@empty: ( string ) ->
		return false if _.notString(string) or (string.length > 0)
		return true

	@isAlpha: ( string ) ->
		return false if '' is string= _.forceString string
		/^[a-z]*$/ig.test string

	@isNumeric: ( string ) ->
		return false if '' is string= _.forceString string
		/^[0-9]*$/g.test string

	@isAlphaNumeric: ( string ) ->
		return false if '' is string= _.forceString string
		/^[0-9|a-z]*$/ig.test string

	@isSpecial: ( string ) ->
		return false if '' is string= _.forceString string
		/^[^0-9|a-z]*$/ig.test string

	@isSpace: ( string ) -> /^[ \t]+$/g.test string

	@hasUpper: ( string ) -> /[A-Z]+/g.test string
	@isUpper: ( string ) -> /^[A-Z]+$/g.test string
	@isLower: ( string ) -> /^[a-z]+$/g.test string

	@xs: ( string= '', callback ) ->
		string= _.forceString string
		return '' if -1 is length= string.length- 1
		callback	= _.forceFunction callback, (char) -> char
		result= ''
		for index in [0..length]
			if response= callback( string[index], index )
				if response is true then result+= string[ index ]
				else if _.isStringOrNumber response
					result+= response
		return result

	@copy: ( string, offset, amount ) ->
		offset= _.forceNumber offset
		return '' if ( '' is string= _.forceString string ) or ( Math.abs(offset) > string.length )
		offset-= 1 if offset > 0
		return string.substr offset, _.forceNumber amount, string.length

	@replace: ( string= '', toReplace= '', replacement= '', flags= 'g' ) ->
		if not ( _.isStringOrNumber(string) and (_.typeof(toReplace) in [ 'string', 'number', 'regexp' ]) )
			return _.forceString string
		if _.notRegExp toReplace
			toReplace= Strings.regEscape (toReplace+ '')
			toReplace= new RegExp toReplace, flags	# check if needed -> _.forceString flags
		return (string+ '').replace toReplace, replacement

	@trim: ( string ) -> Strings.replace string, /^\s+|\s+$/g

	@trimLeft: ( string ) -> Strings.replace string, /^\s+/g

	@trimRight: ( string ) -> Strings.replace string, /\s+$/g

	@oneSpace: ( string ) -> Strings.replace string, /\s+/g, ' '

	@oneSpaceAndTrim: ( string ) -> Strings.oneSpace( Strings.trim(string) )

	@toCamel: ( string, char ) ->
		string= _.forceString string
		char	= _.forceString char, '-'
		match	= new RegExp( Strings.regEscape( char )+ '([a-z])', 'ig' )
		Strings.replace string, match, (all, found) -> found.toUpperCase()

	@unCamel: ( string, insertion ) ->
		string	= _.forceString string
		insertion= _.forceString insertion, '-'
		return Strings.replace( string, /([A-Z])/g, insertion+ '$1' ).toLowerCase()

	@shuffle: ( string ) ->
		string= _.forceString string
		return _.shuffleArray( (string+ '').split '' ).join('')

	@find: ( string, toFind, flags ) ->
		indices= []
		return indices if '' is string= _.forceString string
		flags= _.forceString flags, 'g'
		if _.isStringOrNumber toFind
			toFind= new RegExp Strings.regEscape(toFind+ ''), flags
		else if _.isRegExp toFind
			toFind= new RegExp toFind.source, flags
		else return indices
		# check for global flag, without it a while/exec will hang the system..
		if toFind.global
			indices.push( result.index+ 1 ) while result= toFind.exec string
		else
			indices.push( result.index+ 1 ) if result= toFind.exec string
		return indices

	@count: ( string, toFind ) -> Strings.find( string, toFind ).length

	@contains: ( string, substring ) -> Strings.count( string, substring ) > 0

	@between: ( string, before, after ) ->
		return '' if not _.allStringOrNumber string, before, after
		before= Strings.regEscape before+ ''
		after	= Strings.regEscape after+ ''
		reg	= new RegExp before+ '(.+)'+ after
		return reg.exec( string+ '' )?[1] or ''

	@slice: ( string, start, size ) ->
		string= _.forceString string
		start	= _.forceNumber (start or 1)
		if false isnt start= _.positiveIndex start, string.length
			size= _.forceNumber size
			return string.slice start, start+ size
		return ''

	@truncate= ( string, length, appendix ) ->
		string= _.forceString string
		length= _.forceNumber length, string.length
		string= Strings.slice string, 1, length
		return string+ _.forceString appendix

	@pop: ( string, amount ) ->
		string= _.forceString string
		amount= _.forceNumber amount, 1
		return string.slice 0, -Math.abs amount

	@split: ( string, delimiter ) ->
		string= Strings.oneSpaceAndTrim string
		result= []
		return result if string.length < 1
		delimiter= _.forceString delimiter, ' '
		array= string.split delimiter[0] or ''
		for word in array
			continue if word.match /^\s$/
			result.push Strings.trim word
		return result

	@reverse: ( string= '' ) ->
		string= _.forceString string
		return string if (length= string.length- 1) < 1
		reversed= ''
		reversed+= string[ ch ] for ch in [length..0]
		return reversed

	@upper: ( string, args... ) -> changeCase string, 'toUpperCase', args...

	@lower: ( string, args... ) -> changeCase string, 'toLowerCase', args...

	@insert: ( string, insertion, positions... ) ->
		return string if ('' is string= _.forceString string) or ('' is insertion= _.forceString insertion)
		positions= _.sortNoDupAndReverse positions, string.length
		posCount= mapStringToNumber( positions )- 1
		return string if 0 > posCount
		for index in [0..posCount]
			index= positions[ index ]
			if index > string.length
				string= ( string+ insertion )
				continue
			string= string.substr( 0, index )+ insertion+ string.substr index
		return string

	@removeRange: ( string, offset, amount ) ->
		string= _.forceString string
		return string if ( string is '' ) or
			( false is offset= _.positiveIndex offset, string.length )	or
			( 0 > amount= _.forceNumber amount, 1 )
		endpoint= offset+ amount
		return Strings.xs string, ( char, index ) ->
			true if (index < offset) or (index >= endpoint)

	@removePos: ( string, positions... ) ->
		return '' if '' is string= _.forceString string
		pos= positions.map ( value ) -> _.positiveIndex value, string.length
		return Strings.xs string, ( char, index ) -> true if not ( index in pos )

	@remove: ( string= '', toRemove... ) ->
		return string if ('' is string= _.forceString string) or (toRemove.length < 1)
		string= Strings.replace( string, remove ) for remove in toRemove
		return string

	@startsWith: ( string, start ) ->
		return false if ('' is string= _.forceString string) or ('' is start= _.forceString start)
		start= new RegExp '^'+ Strings.regEscape start
		start.test string

	@endsWith: ( string, ending ) ->
		return false if ('' is string= _.forceString string) or ('' is ending= _.forceString ending)
		ending= new RegExp Strings.regEscape( ending )+ '$'
		return ending.test string


	#
	# checks wether the count for each specific character is equal for both strings
	#
	@charactersMatch: ( string1, string2 ) ->
		return false if (not _.allString string1, string2) or (string1.length isnt string2.length)
		string2= string2.split ''
		for char in string1
			return false if not string2.length
			pos= string2.indexOf char
			if pos > -1
				string2.splice pos, 1
			else return false
		return true


# test below this line:
	@wrap: ( prepend= '', append= '' ) ->
		wrapper= ( string ) -> Strings.create prepend, string, append
		wrapper.wrap= ( outerPrepend= '', outerAppend= '' ) ->
			prepend= _.forceString( outerPrepend )+ prepend
			append+= _.forceString( outerAppend )
		return wrapper

# end of statics

	constructor: ->
		super()
		@set.apply @, arguments
		@wrapMethod= null
		@crop= @slice

	set: -> @string= Strings.create.apply @, arguments; @

	sort: -> @string= Strings.sort @string; @

	random: ( amount, charSet ) -> @string= Strings.random amount, charSet; @

	xs: ( callback ) -> @string= Strings.xs @string, callback; @

	times: ( times= 1 ) -> @string= Strings.times @string, times; @

	get: ->
		if arguments.length > 0
			string= ''
			for position in arguments
				position= _.positiveIndex position, @length
				string+= @string[ position ] if position isnt false
			return string
		return @string

	copy: ( offset, amount ) -> Strings.copy @string, offset, amount

	empty: -> Strings.empty @string

	isAlpha: -> Strings.isAlpha @string
	isNumeric: -> Strings.isNumeric @string
	isAlphaNumeric: -> Strings.isAlphaNumeric @string
	isSpecial: -> Strings.isSpecial @string
	isUpper: -> Strings.isUpper @string
	hasUpper: -> Strings.hasUpper @string
	isLower: -> Strings.isLower @string

	isSpace: -> Strings.isSpace @string

	push: ->	@string= @string+ Strings.create.apply @, arguments; @

	prepend: -> @string= Strings.create.apply( @, arguments )+ @string; @

	pop: ( amount ) -> @string= Strings.pop @string, amount; @

	insert: ( string, positions... ) -> @string= Strings.insert @string, string, positions...; @

	trim: ->	@string= Strings.trim( @string ); @

	trimLeft: -> @string= Strings.trimLeft( @string ); @

	trimRight: -> @string= Strings.trimRight( @string ); @

	oneSpace: -> @string= Strings.oneSpace( @string ); @

	oneSpaceAndTrim: -> @string= Strings.oneSpaceAndTrim( @string ); @

	find: ( string ) -> Strings.find @string, string

	count: ( string ) -> Strings.count @string, string

	contains: ( string ) -> Strings.contains @string, string

	between: ( before, after ) -> Strings.between @string, before, after

	slice: ( start, size ) -> @string= Strings.slice @string, start, size; @

	truncate: ( size, suffix ) -> @string= Strings.truncate @string, size, suffix; @

	remove: ( strings... ) -> @string= Strings.remove @string, strings...; @

	removeRange: ( offset, amount ) -> @string= Strings.removeRange( @string, offset, amount ); @

	removePos: ( positions... ) -> @string= Strings.removePos @string, positions...; @

	replace: ( subString, replacement, flags ) -> @string= Strings.replace( @string, subString, replacement, flags ); @

	reverse: -> @string= Strings.reverse @string; @

	upper: ( args... ) -> @string= Strings.upper @string, args...; @

	lower: ( args... ) -> @string= Strings.lower @string, args...; @

	shuffle: -> @string= Strings.shuffle @string; @

	toCamel: ( char ) -> @string= Strings.toCamel @string, char; @

	unCamel: ( insertion ) -> @string= Strings.unCamel @string, insertion; @

	startsWith: ( start ) -> Strings.startsWith @string, start

	endsWith: ( ending ) -> Strings.endsWith @string, ending

	charactersMatch: ( string ) -> Strings.charactersMatch @string, string

	setWrap: ( prepend, append ) ->
		if _.isNull @wrapMethod then @wrapMethod= Strings.wrap prepend, append
		else @wrapMethod.wrap prepend, append
		return @

	removeWrap: -> @wrapMethod= null; @

	applyWrap: ( prepend, append ) ->
		@string= @setWrap( prepend, append ).wrap
		@removeWrap()
		return @

Object.defineProperty Strings::, '$', { get: -> @.get() }
Object.defineProperty Strings::, 'length', { get: -> @string.length }
Object.defineProperty Strings::, 'wrap',
	get: ->
		return @wrapMethod @string	if not _.isNull @wrapMethod
		return @string

# aliases:
Strings.crop= Strings.slice
Strings::crop= Strings::slice
Strings::append= Strings::push


if define? and ( 'function' is typeof define ) and define.amd
	define 'strings', [], -> Strings

else if module?
	module.exports= Strings

else if window?
	window.Types	= Types
	window.Strings	= Strings