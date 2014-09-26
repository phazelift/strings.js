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

#														Types.js

Types= {}

do ->

	testValues= ( predicate, breakState, values= [] ) ->
		return false if arguments[2].length < 1
		for value in arguments[2]
			return breakState if (predicate value) is breakState
		return not breakState

	hasType=
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

	breakIfEqual= true
	do -> for name, predicate of hasType then do ( name, predicate ) ->
		Types[ 'all'+ name ]	= -> testValues predicate, not breakIfEqual, arguments
		Types[ 'has'+ name ]	= -> testValues predicate, breakIfEqual, arguments
		Types[ 'is'+ name ]	= predicate
		Types[ 'not'+ name ]	= ( value ) -> not predicate value


	Types.stringOrNumber= -> testValues ((value) -> Types.isString(value) or Types.isNumber(value)), not breakIfEqual, arguments

	Types.typeof= ( value ) ->
		for type, predicate of hasType
			return type.toLowerCase() if predicate(value) is true

#															_ (selection of Tools)

class _ extends Types

	@inRange: ( nr, min, max ) ->
		[min, max]= min if _.isArray min
		return nr >= min and nr <= max

	@randomNumber: ( min, max ) ->
		if not max?
			if min < 0 then max= 0
			else
				max= min
				min= 0
		range= (max- (min?= 0) )+ 1
		return Math.floor ( Math.random()* range )+ min


	@shuffleArray: ( target ) ->
		return target if _.notArray(target) or target.length < 1
		length= target.length- 1
		for i in [length..0]
			rand= _.randomNumber i
			temp= target[ i ]
			target[ i ]= target[ rand ]
			target[ rand ]= temp
		return target

	@positiveIndex: ( index, max= 0 ) ->
		if _.isNumber( index ) and index isnt 0
			if Math.abs( index ) <= max
				return index- 1 if index > 0
				return max+ index
		return false

#																	Chars (selection of Chars)

class Chars extends _

	@ASCII_RANGE_UPPERCASE	: [65, 90]
	@ASCII_RANGE_LOWERCASE	: [97, 122]
	@ASCII_RANGE_NUMBERS		: [48, 57]

	@REGEXP_SPECIAL_CHARS: ['?', '\\', '[', ']', '(', ')', '*', '+', '.', '/', '|', '^', '$', '<', '>', '-', '&']

	@ascii: ( ordinal ) -> String.fromCharCode ordinal
	@ordinal: ( char ) ->
		return null if _.notString char
		return char.charCodeAt()

	@isUpper: ( char ) -> _.inRange( Chars.ordinal(char), Chars.ASCII_RANGE_UPPERCASE )
	@isLower: ( char ) -> _.inRange( Chars.ordinal(char), Chars.ASCII_RANGE_LOWERCASE )
	@isAlpha: ( char ) -> ( Chars.isUpper( char ) or Chars.isLower( char ) )
	@isNumeric: ( char ) -> _.inRange( Chars.ordinal(char), Chars.ASCII_RANGE_NUMBERS )
	@isAlphaNumeric: ( char ) -> Chars.isAlpha(char) or Chars.isNumeric(char)


#																	Strings

# refactor this one, and get rid of the..., arguments is ~10x faster.
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
	return false if not string or _.notString(string)
	for char in string
		return false if not method char
	return true


class Strings extends Chars

	@create: ->
		string= ''
		for arg in arguments
			string+= arg if ( _.isString(arg) or _.isNumber(arg) )
		return string

	@times: ( string, amount= 1 ) ->
		return '' if _.notString string or _.notNumber amount
		copy= string
		string+= copy while --amount > 0
		return string

	@regEscape: ( string ) ->
		return '' if _.notString string
		return Strings.xs string, ( char ) ->
			if char in Chars.REGEXP_SPECIAL_CHARS then return '\\'+ char
			else return true

	@empty: ( string ) ->
		return false if _.notString string
		return true	if string.length < 1
		return false

	@isAlpha: ( string ) -> asciiStringType string, Chars.isAlpha
	@isNumeric: ( string ) -> asciiStringType string, Chars.isNumeric
	@isAlphaNumeric: ( string ) -> asciiStringType string, Chars.isAlphaNumeric

	@isSpace: ( string= '' ) ->
		return false if _.notString string
		string= Strings.oneSpace string
		return string is ' ' or string is '\t'

	@xs: ( string= '', callback= (char) -> char ) ->
		return '' if _.notString(string) or _.notFunction(callback)
		result= ''
		length= string.length- 1
		return result if length < 0
		for index in [0..length]
			if response= callback( string[index], index )
				if response is true then result+= string[ index ]
				else if _.stringOrNumber response
					result+= response
		return result

	@copy: ( string, offset, amount ) ->
		return '' if _.notString string
		--offset if offset > 0
		return string.substr offset, amount

	@replace: ( string= '', toReplace= '', replacement= '', flags= 'g' ) ->
		if not ( _.isString(string) and ( (toReplaceIsString= _.stringOrNumber(toReplace)) or _.isRegExp(toReplace)) )
			return string if _.isString string
			return ''
		if toReplaceIsString
			toReplace= Strings.regEscape(toReplace+ '')
			toReplace= new RegExp toReplace, flags
		return string.replace toReplace, replacement

	@trim: ( string ) -> Strings.replace string, /^\s+|\s+$/g

	@trimLeft: ( string ) -> Strings.replace string, /^\s+/g

	@trimRight: ( string ) -> Strings.replace string, /\s+$/g

	@oneSpace: ( string ) ->
		skip= false
		return Strings.xs string, ( char ) ->
			if char in [' ', '\t']
				if skip is false
					skip= true
					return ' '
			else
				skip= false
				return true

	@oneSpaceAndTrim: ( string ) -> Strings.oneSpace( Strings.trim(string) )

	@toCamel: ( string, char= '-' ) ->
		return string if _.notString char
		match= new RegExp( Strings.regEscape( char )+ '([a-z])', 'ig' )
		Strings.replace( string, match, (all, found) -> found.toUpperCase() )

	@unCamel: ( string, insertion= '-' ) ->
		insertion= '' if not _.isString insertion
		return Strings.replace( string, /([A-Z])/g, insertion+ '$1' ).toLowerCase()

	@shuffle: ( string ) ->
		return _.shuffleArray( string.split '' ).join('') if _.isString string
		return ''

	@find: ( string, toFind ) ->
		indices= []
		return indices if not toFind or _.notString string
		if _.stringOrNumber toFind
			toFind= new RegExp( (Strings.regEscape toFind+ ''), 'g' )
		else if _.isRegExp toFind
			toFind= new RegExp toFind.source, 'g'
		else return indices
		indices.push( result.index+ 1 ) while result= toFind.exec string
		return indices

	@count: ( string, toFind ) -> Strings.find( string, toFind ).length

	@contains: ( string, substring ) -> Strings.find( string, substring ).length > 0

	@between: ( string, before, after ) ->
		return '' if _.notString string or not ( _.stringOrNumber before, after )
		before= Strings.regEscape before+ ''
		after= Strings.regEscape after+ ''
		reg= new RegExp before+ '(.+)'+ after
		return reg.exec( string )?[1] or ''

	@slice: ( string, start, size ) ->
		return '' if _.notString string
		if false isnt start= _.positiveIndex start, string.length
			return string.slice start, start+ size
		return ''

	@truncate= ( string, length= string.length, appendix= '' ) ->
		string= Strings.slice string, 1, length
		return string+= appendix

	@pop: ( string= '', amount= 1 ) ->
		if _.isString string
			length= string.length
			amount= (length- Math.abs amount)- 1
			if amount >= 0 and amount < length
				newstr= ''
				newstr+= string[ i ] for i in [0..amount]
				return newstr
		return ''

	@split: ( string, delimiter= ' ' ) ->
		return string if _.notString( string ) or not _.stringOrNumber( delimiter )
		string= Strings.oneSpaceAndTrim string
		result= []
		array= string.split delimiter
		for index in array
			continue if index is ''
			result.push index
		return result

	@reverse: ( string= '' ) ->
		return '' if _.notString string
		reversed= ''
		length= string.length- 1
		return string if length < 1
		reversed+= string[ ch ] for ch in [length..0]
		return reversed

	@upper: ( string, args... ) -> changeCase string, 'toUpperCase', args...

	@lower: ( string, args...) -> changeCase string, 'toLowerCase', args...

	@insert: ( string, index, insertion ) ->
		if _.stringOrNumber( insertion ) and false isnt index= _.positiveIndex index, string.length
			return string.substr( 0, index )+ insertion+ string.substr index
		return string

	@removeIndex: ( string, offset, amount ) ->
		return '' if _.notString string
		offset= _.positiveIndex offset, string.length
		endpoint= offset+ amount
		return Strings.xs string, ( char, index ) ->
			true if (index < offset) or (index >= endpoint)

	@remove: ( string= '', toRemove... ) ->
		return '' if _.notString string
		return string if toRemove.length < 1
		string= Strings.replace( string, remove ) for remove in toRemove
		return string

	@startsWith: ( string, start ) -> Strings.find( string, start )[0] is 1

	@endsWith: ( string, ending ) ->
		ending= new RegExp Strings.regEscape(ending)+ '$'
		return ending.test string

	@wrap: ( prepend= '', append= '' ) ->
		wrapper= ( string ) -> Strings.create prepend, string, append
		wrapper.wrap= ( outerPrepend= '', outerAppend= '' ) ->
			return if not _.stringOrNumber outerPrepend, outerAppend
			prepend= outerPrepend+ prepend
			append+= outerAppend
		return wrapper

# end of statics

	constructor: ->
		@set.apply @, arguments
		Object.defineProperty @, '$', { get: -> @.get() }
		Object.defineProperty @, 'length', { get: -> @string.length }
		Object.defineProperty @, 'wrap',
			get: ->
				return @wrapMethod @string	if not _.isUndefined @wrapMethod
				return @string

	set: ->
		newString= Strings.create.apply @, arguments
		@string= newString if newString isnt ''
		return @

	xs: ( callback ) -> @string= Strings.xs @string, callback; @

	times: ( amount ) -> @string= Strings.times @string, amount; @

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

	push: ( string= '' ) -> @string+= string if _.stringOrNumber( string ); @

	pop: ( amount ) -> @string= Strings.pop @string, amount; @

	shift: ( string ) -> @string= string+ @string if _.stringOrNumber( string ); @

	insert: ( string= '', position= 0 ) ->	@string= Strings.insert @string, position, string; @

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

	truncate: ( size, suffix ) -> Strings.truncate @string, size, suffix; @

	remove: ( strings... ) -> @string= Strings.remove @string, strings...; @

	removeIndex: ( offset, amount ) -> @string= Strings.removeIndex( @string, offset, amount ); @

	replace: ( subString, replacement, flags ) ->	@string= Strings.replace( @string, subString, replacement, flags ); @

	reverse: -> @string= Strings.reverse @string; @

	upper: ( args... ) -> @string= Strings.upper @string, args...; @

	lower: ( args... ) -> @string= Strings.lower @string, args...; @

	shuffle: -> @string= Strings.shuffle @string; @

	toCamel: ( char ) -> @string= Strings.toCamel @string, char; @

	unCamel: ( insertion ) -> @string= Strings.unCamel @string, insertion; @

	toUnderscore: -> @string= Strings.toUnderscore @string; @

	startsWith: -> ( start ) -> Strings.startsWith @string, start

	endsWith: -> ( ending ) -> Strings.endsWith @string, ending

	setWrap: ( prepend, append ) ->
		if @wrapMethod then @wrapMethod.wrap prepend, append
		else @wrapMethod= Strings.wrap prepend, append
		return @

	removeWrap: -> @wrapMethod= undefined; @

	applyWrap: ( prepend, append ) ->
		@string= @setWrap( prepend, append ).wrap
		@removeWrap()
		return @

if window? then window.Strings= Strings
else module.exports= Strings
