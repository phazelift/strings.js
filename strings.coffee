# Strings.coffee - My Javascript string manipulation library, written in Coffeescript.
#
# Copyright (c) 2014 Dennis Raymondo van der Sluis
#
# This program is free software: you can redistribute it and/or modify
#     it under the terms of the GNU General Public License as published by
#     the Free Software Foundation, either version 3 of the License, or
#     (at your option) any later version.
#
#     This program is distributed in the hope that it will be useful,
#     but WITHOUT ANY WARRANTY; without even the implied warranty of
#     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#     GNU General Public License for more details.
#
#     You should have received a copy of the GNU General Public License
#     along with this program.  If not, see <http://www.gnu.org/licenses/>

"use strict"

#														types.js

Types= {}

do ->

	testValues= ( predicate, breakState, values= [] ) ->
		return false if values.length < 1
		for value in values
			return breakState if (predicate value) is breakState
		return not breakState

	typesPredicates=
		'Undefined'	: (value) -> value is undefined
		'Null'		: (value) -> value is null
		'Boolean'	: (value) -> typeof value is 'boolean'
		'String'		: (value) -> typeof value is 'string'
		'Function'	: (value) -> typeof value is 'function'
		'Number'		: (value) -> (typeof value is 'number') and (value is value)
		'Array'		: (value) -> (typeof value is 'object') and ( value instanceof Array )
		'RegExp'		: (value) -> value instanceof RegExp
		'Date'		: (value) -> value instanceof Date
		'Object'		: (value) -> (typeof value is 'object') and not (value instanceof Array) and not (value instanceof RegExp) and not (value is null)
		'NaN'			: (value) -> (typeof value is 'number') and (value isnt value)

	typesPredicates.StringOrNumber		= (value) -> typesPredicates['String'](value) or typesPredicates['Number'](value)

	breakIfEqual= true
	do -> for name, predicate of typesPredicates then do ( name, predicate ) ->
		Types[ 'is'+ name ]	= predicate
		Types[ 'not'+ name ]	= ( value ) -> not predicate value
		Types[ 'has'+ name ]	= -> testValues predicate, breakIfEqual, arguments
		Types[ 'all'+ name ]	= -> testValues predicate, not breakIfEqual, arguments

	Types.typeof= ( value ) ->
		for type, predicate of typesPredicates
			return type.toLowerCase() if predicate(value) is true
		return 'unknown'

#																	Numbers

class Numbers

	@force: ( nr, replacement ) ->
		return nr if _.notNaN nr= parseInt nr, 10
		return replacement if _.notNaN replacement= parseInt replacement, 10
		return 0


# returns the amount of successful parseInt's on array
mapStringToNumber= ( array ) ->
	return 0 if _.notArray array
	for value, index in array
		return index if _.isNaN nr= parseInt array[index], 10
		array[ index ]= nr
	return array.length

#															_ (selection of Tools)

class _ extends Types

	@inRange: ( nr, range ) ->
		return false if (_.isNaN nr= parseInt nr, 10) or (mapStringToNumber( range ) < 2)
		return (nr >= range[0]) and (nr <= range[1])

	@limitNumber= ( nr, range ) ->
		return 0 if mapStringToNumber( range ) < 2
		return range[0] if ( _.isNaN nr= parseInt nr, 10 ) or ( nr < range[0] )
		return range[1] if nr > range[1]
		return nr

	@randomNumber: ( min, max ) ->
		return 0 if mapStringToNumber([min, max]) < 2
		return min if max < min
		max= (max- min)+ 1
		return Math.floor ( Math.random()* max )+ min

	@shuffleArray: ( array ) ->
		return [] if _.notArray(array) or array.length < 1
		length= array.length- 1
		for i in [length..0]
			rand= _.randomNumber 0, i
			temp= array[ i ]
			array[ i ]= array[ rand ]
			array[ rand ]= temp
		return array

	@positiveIndex: ( index, max ) ->
		return false if 0 is index= Numbers.force index
		max= Numbers.force max
		if Math.abs( index ) <= max
			return index- 1 if index > 0
			return max+ index
		return false

#																	Chars (selection of Chars)

# put here instead of in Strings, Chars.ordinal needs it
forceString= ( string, replacement ) ->
	return (string+ '') if _.isStringOrNumber string
	return (replacement+ '') if _.isStringOrNumber replacement
	return ''

class Chars extends _

	@ASCII_RANGE_UPPERCASE	: [65, 90]
	@ASCII_RANGE_LOWERCASE	: [97, 122]
	@ASCII_RANGE_NUMBERS		: [48, 57]
	@ASCII_RANGE_ALL			: [32, 126]

	@REGEXP_SPECIAL_CHARS: ['?', '\\', '[', ']', '(', ')', '*', '+', '.', '/', '|', '^', '$', '<', '>', '-', '&']

	@ascii: ( ordinal ) -> String.fromCharCode Numbers.force ordinal
	@ordinal: ( char ) -> Numbers.force forceString( char ).charCodeAt()

	@isUpper: ( char ) -> _.inRange( Chars.ordinal(char), Chars.ASCII_RANGE_UPPERCASE )
	@isLower: ( char ) -> _.inRange( Chars.ordinal(char), Chars.ASCII_RANGE_LOWERCASE )

	@isAlpha		: ( char ) -> Chars.isUpper(char) or Chars.isLower(char)
	@isNumeric	: ( char ) -> _.inRange Chars.ordinal(char), Chars.ASCII_RANGE_NUMBERS
	@isSpecial	: ( char ) -> not ( Chars.isAlphaNumeric(char) or (char is ' ') )
	@isAlphaNumeric: ( char ) -> Chars.isAlpha(char) or Chars.isNumeric(char)

	@random: ( range= Chars.ASCII_RANGE_ALL ) ->
		return '' if _.notArray(range) or range.length < 2
		min= _.limitNumber( range[0], range )
		max= _.limitNumber( range[1], range )
		return Chars.ascii _.randomNumber min, max

#																	Strings

# refactor this later, and get rid of the..., arguments[n] are ~10 times faster.
changeCase= ( string= '', caseMethod, args... ) ->
	return string if _.notString string
	if args.length < 1
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
	return false if '' is string= Strings.force string
	for char in string
		return false if not method char
	return true

class Strings extends Chars

	@force: ( string, replacement ) -> forceString string, replacement

	@create: ->
		string= ''
		for arg in arguments
			string+= arg if _.isStringOrNumber arg
		return string

	@random: ( amount, charSet ) ->
		amount= Numbers.force amount, 1
		string= ''
		string+= Chars.random(charSet) for i in [1..amount]
		return string;

	@times: ( string, amount ) ->
		return '' if '' is Strings.force string
		amount= Numbers.force amount, 1
		multi= ''
		multi+= string while amount-- > 0
		return multi

	@regEscape: ( string ) ->
		return string if '' is string= Strings.force string
		# not sure now if number-to-string is right here..
		# return '' if _.notString string
		return Strings.xs string, ( char ) ->
			return '\\'+ char	if char in Chars.REGEXP_SPECIAL_CHARS
			return true

	@empty: ( string ) ->
		return false if _.notString(string) or (string.length > 0)
		return true

	@isAlpha: ( string ) -> asciiStringType string, Chars.isAlpha
	@isNumeric: ( string ) -> asciiStringType string, Chars.isNumeric
	@isAlphaNumeric: ( string ) -> asciiStringType string, Chars.isAlphaNumeric
	@isSpecial: ( string ) -> asciiStringType string, Chars.isSpecial

	@isSpace: ( string ) -> /^[ \t]+$/g.test string

	@xs: ( string= '', callback= (char) -> char ) ->
		return '' if _.notString(string) or _.notFunction(callback)
		result= ''
		return result if (length= string.length- 1) < 0
		for index in [0..length]
			if response= callback( string[index], index )
				if response is true then result+= string[ index ]
				else if _.isStringOrNumber response
					result+= response
		return result

	@copy: ( string, offset, amount ) ->
		return '' if '' is string= Strings.force string
		return string if not offset?
		offset= Numbers.force offset
		return '' if Math.abs(offset) > string.length
		--offset if offset > 0
		return string.substr offset, Numbers.force( amount, 1 )

	@replace: ( string= '', toReplace= '', replacement= '', flags= 'g' ) ->
		if not ( _.isStringOrNumber(string) and ( (toReplaceIsString= _.isStringOrNumber(toReplace)) or _.isRegExp(toReplace)) )
			return Strings.force string
		if toReplaceIsString
			toReplace= Strings.regEscape(toReplace+ '')
			toReplace= new RegExp toReplace, flags
		return (string+ '').replace toReplace, replacement

	@trim: ( string ) -> Strings.replace string, /^\s+|\s+$/g

	@trimLeft: ( string ) -> Strings.replace string, /^\s+/g

	@trimRight: ( string ) -> Strings.replace string, /\s+$/g

	@oneSpace: ( string ) -> Strings.replace string, /([ \t]+)/g, ' '

	@oneSpaceAndTrim: ( string ) -> Strings.oneSpace( Strings.trim(string) )

	@toCamel: ( string, char= '-' ) ->
		string= Strings.force string
		char	= Strings.force char
		match	= new RegExp( Strings.regEscape( char )+ '([a-z])', 'ig' )
		Strings.replace string, match, (all, found) -> found.toUpperCase()

	@unCamel: ( string, insertion= '-' ) ->
		string	= Strings.force string
		insertion= Strings.force insertion
		return Strings.replace( string, /([A-Z])/g, insertion+ '$1' ).toLowerCase()

	@shuffle: ( string ) ->
		string= Strings.force string
		return _.shuffleArray( (string+ '').split '' ).join('')

	@find: ( string, toFind ) ->
		indices= []
		return indices if '' is string= Strings.force string
		if _.isStringOrNumber toFind
			toFind= new RegExp( (Strings.regEscape toFind+ ''), 'g' )
		else if _.isRegExp toFind
			toFind= new RegExp toFind.source, 'g'
		else return indices
		indices.push( result.index+ 1 ) while result= toFind.exec string
		return indices

	@count: ( string, toFind ) -> Strings.find( string, toFind ).length

	@contains: ( string, substring ) -> Strings.find( string, substring ).length > 0

	@between: ( string, before, after ) ->
		return '' if not _.allStringOrNumber string, before, after
		before= Strings.regEscape before+ ''
		after	= Strings.regEscape after+ ''
		reg	= new RegExp before+ '(.+)'+ after
		return reg.exec( string+ '' )?[1] or ''

	@slice: ( string, start, size ) ->
		string= Strings.force string
		start	= Numbers.force start
		if false isnt start= _.positiveIndex start, string.length
			size= Numbers.force size
			return string.slice start, start+ size
		return ''

	@truncate= ( string, length, appendix ) ->
		string= Strings.force string
		length= Numbers.force length, string.length
		string= Strings.slice string, 1, length
		return string+ Strings.force appendix

	@pop: ( string, amount ) ->
		string= Strings.force string
		amount= Numbers.force amount, 1
		return string.slice 0, -Math.abs amount

	@split: ( string, delimiter ) ->
		string= Strings.oneSpaceAndTrim string
		delimiter= Strings.force delimiter, ' '
		result= []
		array= string.split delimiter
		for index in array
			continue if index is ''
			result.push index
		return result

	@reverse: ( string= '' ) ->
		string= Strings.force string
		return string if (length= string.length- 1) < 1
		reversed= ''
		reversed+= string[ ch ] for ch in [length..0]
		return reversed

	@upper: ( string, args... ) -> changeCase string, 'toUpperCase', args...

	@lower: ( string, args...) -> changeCase string, 'toLowerCase', args...

	@insert: ( string, insertion, index= 1 ) ->
		string= Strings.force string
		insertion= Strings.force insertion
		return string if false is index= _.positiveIndex index, string.length
		return string.substr( 0, index )+ insertion+ string.substr index

	@removeRange: ( string, offset, amount ) ->
		return string if '' is string= Strings.force string
		return string if false is offset= _.positiveIndex offset, string.length
		amount= Numbers.force amount, 1
		if amount < 0 then endpoint= offset+ _.positiveIndex amount, string.length- offset
		else endpoint= offset+ amount
		return Strings.xs string, ( char, index ) ->
			true if (index < offset) or (index >= endpoint)

	@removePos: ( string, positions... ) ->
		return '' if '' is string= Strings.force string
		pos= positions.map ( value, index ) -> _.positiveIndex value, string.length
		return Strings.xs string, ( char, index ) -> true if not ( index in pos )

	@remove: ( string= '', toRemove... ) ->
		return string if ('' is string= Strings.force string) or (toRemove.length < 1)
		string= Strings.replace( string, remove ) for remove in toRemove
		return string

	@startsWith: ( string, start ) -> Strings.find( string, start )[0] is 1

	@endsWith: ( string, ending ) ->
		return false if ('' is string= Strings.force string) or ('' is ending= Strings.force ending)
		ending= new RegExp Strings.regEscape( ending )+ '$'
		return ending.test string


	@wrap: ( prepend= '', append= '' ) ->
		wrapper= ( string ) -> Strings.create prepend, string, append
		wrapper.wrap= ( outerPrepend= '', outerAppend= '' ) ->
			prepend= Strings.force( outerPrepend )+ prepend
			append+= Strings.force( outerAppend )
		return wrapper

# end of statics

	constructor: ->
		@set.apply @, arguments
		Object.defineProperty @, '$', { get: -> @.get() }
		Object.defineProperty @, 'length', { get: -> @string.length }
		Object.defineProperty @, 'wrap',
			get: ->
				return @wrapMethod @string	if not _.isNull @wrapMethod
				return @string
		@wrapMethod= null
		@crop= @slice

	set: -> @string= Strings.create.apply @, arguments; @

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

	isSpace: -> Strings.isSpace @string

	push: ->	@string= @string+ Strings.create.apply @, arguments; @

	pop: ( amount ) -> @string= Strings.pop @string, amount; @

	prepend: -> @string= Strings.create.apply( @, arguments )+ @string; @

	insert: ( string, position ) -> @string= Strings.insert @string, string, position; @

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

	setWrap: ( prepend, append ) ->
		if _.isNull @wrapMethod then @wrapMethod= Strings.wrap prepend, append
		else @wrapMethod.wrap prepend, append
		return @

	removeWrap: -> @wrapMethod= null; @

	applyWrap: ( prepend, append ) ->
		@string= @setWrap( prepend, append ).wrap
		@removeWrap()
		return @

# aliases:
Strings.crop= Strings.slice

if window? then window.Strings= Strings
else module.exports= Strings