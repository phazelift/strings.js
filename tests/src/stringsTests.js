//
// Jasmine tests for strings.js
//


function testNoOrInvalidStringArguments( method ){

    describe('', function() {
        it("should return a empty string if no, or an invalid argument is given", function(){
            result= method();
            expect( result ).toBe( '' );

            result= method( true );
            expect( result ).toBe( '' );

            result= method( {test: 0} );
            expect( result ).toBe( '' );

            result= method( ['A'] );
            expect( result ).toBe( '' );

            result= method( function(){} );
            expect( result ).toBe( '' );

            result= method( NaN );
            expect( result ).toBe( '' );

            result= method( /regexp/g );
            expect( result ).toBe( '' );

            result= method( new Date() );
            expect( result ).toBe( '' );

            result= method( null );
            expect( result ).toBe( '' );

            result= method( undefined );
            expect( result ).toBe( '' );
        });
    });

}

//                                       Strings/Tools


describe("sort( string )", function() {

    testNoOrInvalidStringArguments( Strings.sort );

    it("should return string sorted by ordinal value", function(){

        result= Strings.sort( 0 );
        expect( result ).toBe( '0' );

        result= Strings.sort( 321 );
        expect( result ).toBe( '123' );

        result= Strings.sort('321');
        expect( result ).toBe( '123' );

        result= Strings.sort('~!ZZ321');
        expect( result ).toBe( '!123ZZ~' );

        result= Strings.sort('Strings!');
        expect( result ).toBe( '!Sginrst' );

    });
});



describe("inRange(nr, range)", function() {

    it("should return false if no arguments are given", function(){
        result= Strings.inRange();
        expect( result ).toBe( false );
    });

    it("should return false if invalid arguments are given", function(){
        result= Strings.inRange( /asdf/ );
        expect( result ).toBe( false );

        result= Strings.inRange( null, undefined );
        expect( result ).toBe( false );

        result= Strings.inRange( new Date(), {} );
        expect( result ).toBe( false );

        result= Strings.inRange( 1, {a: 0, b: 10} );
        expect( result ).toBe( false );
    });


    it("should return false if value is out of range", function(){
        result= Strings.inRange( -10, [-9, 0] );
        expect( result ).toBe( false );

        result= Strings.inRange( -20, [-21, -200] );
        expect( result ).toBe( false );

        result= Strings.inRange( 10, [1, 9] );
        expect( result ).toBe( false );
    });

    it("should return true if value is in range", function(){
        result= Strings.inRange( 10, [10, 20] );
        expect( result ).toBe( true );

        result= Strings.inRange( 20, [10, 20] );
        expect( result ).toBe( true );

        result= Strings.inRange( 0, [0, 0] );
        expect( result ).toBe( true );
    });


    it("should return true if value and range values are: of type String, parsable, and value is within range", function(){
        result= Strings.inRange( '23', ['1', '100'] );
        expect( result ).toBe( true );

        result= Strings.inRange( '23asdf', ['1asdf', '100asdf'] );
        expect( result ).toBe( true );

        result= Strings.inRange( '23px', ['1px', '100px'] );
        expect( result ).toBe( true );

        result= Strings.inRange( '-3px', ['-10px', '0px'] );
        expect( result ).toBe( true );
    });

});

describe("limitNumber(nr, range)", function() {

    it("should return the Number 0 if no arguments are given", function(){
        result= Strings.limitNumber();
        expect( result ).toBe( 0 );
    });

    it("should return the Number 0 if nr is invalid", function(){
        result= Strings.limitNumber(/123/);
        expect( result ).toBe( 0 );

        result= Strings.limitNumber( 'abc123');
        expect( result ).toBe( 0 );

        result= Strings.limitNumber( null);
        expect( result ).toBe( 0 );

        result= Strings.limitNumber( undefined );
        expect( result ).toBe( 0 );

        result= Strings.limitNumber( new Date() );
        expect( result ).toBe( 0 );

        result= Strings.limitNumber( {} );
        expect( result ).toBe( 0 );

        result= Strings.limitNumber( NaN );
        expect( result ).toBe( 0 );

        result= Strings.limitNumber( true );
        expect( result ).toBe( 0 );
    });

    it("should return nr if nr is valid, but range is invalid", function(){
        result= Strings.limitNumber(5, [[], {}]);
        expect( result ).toBe( 5 );

        result= Strings.limitNumber(5, [null, undefined]);
        expect( result ).toBe( 5 );

        result= Strings.limitNumber(5, [3, 'a4']);
        expect( result ).toBe( 5 );

        result= Strings.limitNumber(5, ['a4', 4]);
        expect( result ).toBe( 5 );

        result= Strings.limitNumber(5, {a: 0, b: 10});
        expect( result ).toBe( 5 );

        result= Strings.limitNumber(5, null);
        expect( result ).toBe( 5 );

        result= Strings.limitNumber(5, new Array(2) );
        expect( result ).toBe( 5 );
    });

    it("should return nr if nr is valid and inside a valid range", function(){
        result= Strings.limitNumber(5, [5, 10]);
        expect( result ).toBe( 5 );

        result= Strings.limitNumber(5, [0, 5]);
        expect( result ).toBe( 5 );

        result= Strings.limitNumber(5, [5, 5]);
        expect( result ).toBe( 5 );
    });

    it("should return the lower-range if nr is valid, but below a valid range", function(){
        result= Strings.limitNumber(4, [5, 10]);
        expect( result ).toBe( 5 );

        result= Strings.limitNumber(-6, [-5, 5]);
        expect( result ).toBe( -5 );
    });

    it("should return the upper-range if nr is valid, but above a valid range", function(){
        result= Strings.limitNumber(11, [5, 10]);
        expect( result ).toBe( 10 );

        result= Strings.limitNumber(-6, [-15, -7]);
        expect( result ).toBe( -7 );
    });

});


describe("randomNumber(min, max)", function() {

    it("should return the Number 0 if less than 2 arguments are given", function(){
        result= Strings.randomNumber();
        expect( result ).toBe( 0 );

        result= Strings.randomNumber( 5 );
        expect( result ).toBe( 0 );

        result= Strings.randomNumber( null );
        expect( result ).toBe( 0 );

        result= Strings.randomNumber( undefined );
        expect( result ).toBe( 0 );

        result= Strings.randomNumber( [1, 5] );
        expect( result ).toBe( 0 );
    });

    it("should return a random Number within the range of 2 valid arguments given", function(){
        result= Strings.randomNumber( 1, 5 );
        expect( result ).toBeGreaterThan( 0 );
        expect( result ).toBeLessThan( 6 );

        result= Strings.randomNumber( -100, -97 );
        expect( result ).toBeGreaterThan( -101 );
        expect( result ).toBeLessThan( -96 );
    });

});

describe("positiveIndex(index, max)", function() {

    it("should return false if no, or invalid, arguments are given", function(){
        result= Strings.positiveIndex();
        expect( result ).toBe( false );

        result= Strings.positiveIndex( 'abc' );
        expect( result ).toBe( false );

        result= Strings.positiveIndex( null);
        expect( result ).toBe( false );

        result= Strings.positiveIndex( undefined );
        expect( result ).toBe( false );

        result= Strings.positiveIndex( true );
        expect( result ).toBe( false );

        result= Strings.positiveIndex( /123/ );
        expect( result ).toBe( false );

        result= Strings.positiveIndex( [1, 5] );
        expect( result ).toBe( false );

        result= Strings.positiveIndex( 5, '[1, 5]' );
        expect( result ).toBe( false );

        result= Strings.positiveIndex( 0, [1, 5] );
        expect( result ).toBe( false );

        result= Strings.positiveIndex( 1, 'sdf5' );
        expect( result ).toBe( false );

        result= Strings.positiveIndex( 1, null );
        expect( result ).toBe( false );

        result= Strings.positiveIndex( 1, NaN );
        expect( result ).toBe( false );

        result= Strings.positiveIndex( NaN, 10 );
        expect( result ).toBe( false );

        result= Strings.positiveIndex( undefined, 10 );
        expect( result ).toBe( false );

        result= Strings.positiveIndex( true, 10 );
        expect( result ).toBe( false );
    });

    it("should return false if index is Number 0 or index > max", function(){
        result= Strings.positiveIndex( 0, 10);
        expect( result ).toBe( false );

        result= Strings.positiveIndex( 5, 3 );
        expect( result ).toBe( false );

        result= Strings.positiveIndex( 10, 9 );
        expect( result ).toBe( false );

        result= Strings.positiveIndex( -10, 9 );
        expect( result ).toBe( false );

        result= Strings.positiveIndex( 20, -10 );
        expect( result ).toBe( false );
    });

    it("should return index - 1 if (abs)index is < max and max is a valid Number(or Number-String)", function(){
        result= Strings.positiveIndex( 1, -10 );
        expect( result ).toBe( 0 );

        result= Strings.positiveIndex( 1, 10 );
        expect( result ).toBe( 0 );

        result= Strings.positiveIndex( 5, 5 );
        expect( result ).toBe( 4 );

        result= Strings.positiveIndex( 2, -10 );
        expect( result ).toBe( 1 );

        result= Strings.positiveIndex( -10, -10 );
        expect( result ).toBe( 0 );

        result= Strings.positiveIndex( -10, 10 );
        expect( result ).toBe( 0 );

        result= Strings.positiveIndex( -1, 1 );
        expect( result ).toBe( 0 );
    });

});

//                                            end of Strings/Tools

//
//                                            Strings.Chars
//

describe("ascii( ordinal )", function() {

    it("should return ascii character NUL(0 ordinal) if invalid or no arguments are given", function(){
        result= Strings.Chars.ascii();
        expect( result ).toBe( Strings.Chars.ascii(0) );

        result= Strings.Chars.ascii( 'bla' );
        expect( result ).toBe( Strings.Chars.ascii(0) );

        result= Strings.Chars.ascii( {name: 'lyn'} );
        expect( result ).toBe( Strings.Chars.ascii(0) );

        result= Strings.Chars.ascii( NaN );
        expect( result ).toBe( Strings.Chars.ascii(0) );

        result= Strings.Chars.ascii( null );
        expect( result ).toBe( Strings.Chars.ascii(0) );

        result= Strings.Chars.ascii( true );
        expect( result ).toBe( Strings.Chars.ascii(0) );
    });

    it("should return the corresponding ascii character if a valid ordinal between 0 and 255 is given", function(){
        result= Strings.Chars.ascii( 97 );
        expect( result ).toBe( 'a' );

        result= Strings.Chars.ascii( 90 );
        expect( result ).toBe( 'Z' );

        result= Strings.Chars.ascii( 49 );
        expect( result ).toBe( '1' );

        result= Strings.Chars.ascii( 32 );
        expect( result ).toBe( ' ' );

        result= Strings.Chars.ascii( 126 );
        expect( result ).toBe( '~' );
    });

});

describe("ordinal( char )", function() {

    it("should return (ordinal)Number 0 if invalid or no arguments are given", function(){
        result= Strings.Chars.ordinal();
        expect( result ).toBe( 0 );

        result= Strings.Chars.ordinal( /a/ );
        expect( result ).toBe( 0 );

        result= Strings.Chars.ordinal( ['a'] );
        expect( result ).toBe( 0 );

        result= Strings.Chars.ordinal( {} );
        expect( result ).toBe( 0 );

        result= Strings.Chars.ordinal( null );
        expect( result ).toBe( 0 );

        result= Strings.Chars.ordinal( NaN );
        expect( result ).toBe( 0 );
    });

    it("should return the corresponding ordinal value (as Number) if a valid ascii character is given", function(){
        result= Strings.Chars.ordinal( 'a' );
        expect( result ).toBe( 97 );

        result= Strings.Chars.ordinal( 'a' );
        expect( result ).toBe( 97 );

        result= Strings.Chars.ordinal( 'Z' );
        expect( result ).toBe( 90 );

        result= Strings.Chars.ordinal( '1' );
        expect( result ).toBe( 49 );

        result= Strings.Chars.ordinal( ' ' );
        expect( result ).toBe( 32 );

        result= Strings.Chars.ordinal( '~' );
        expect( result ).toBe( 126 );
    });

});


describe("random( range )", function() {

    it("should return one random ascii character in the range 32..126 if invalid or no arguments are given", function(){
        result= Strings.Chars.random();
        expect( result ).toBeGreaterThan( Strings.Chars.ascii(31) );
        expect( result ).toBeLessThan( Strings.Chars.ascii(127) );
    });

    it("should return one random ascii character in the range 'A'..'Z'", function(){
        result= Strings.Chars.random( Strings.Chars.ASCII_RANGE_UPPERCASE );
        expect( result ).toBeGreaterThan( '@' );
        expect( result ).toBeLessThan( '[' ) ;
    });

    it("should return one random ascii character in the range 'a'..'z'", function(){
        result= Strings.Chars.random( Strings.Chars.ASCII_RANGE_LOWERCASE );
        expect( result ).toBeGreaterThan( '`' );
        expect( result ).toBeLessThan( '{' ) ;
    });

    it("should return one random ascii character in the range '0'..'9'", function(){
        result= Strings.Chars.random( Strings.Chars.ASCII_RANGE_NUMBERS );
        expect( result ).toBeGreaterThan( '/' );
        expect( result ).toBeLessThan( ':' ) ;
    });

});


                                     Strings

describe("create( string, [string1, ..., stringN] )", function() {

    testNoOrInvalidStringArguments( Strings.create );

    it("should return a String build from valid String type or convertable Number type arguments, invalid arguments are ignored", function(){

        result= Strings.create( 1, 2, 3 );
        expect( result ).toBe( '123' );

        result= Strings.create( 1, [], 3 );
        expect( result ).toBe( '13' );

        result= Strings.create( null, 2, function(){} );
        expect( result ).toBe( '2' );

        result= Strings.create( '1', 1+1, '3' );
        expect( result ).toBe( '123' );

        result= Strings.create( 'this ', 'should ', 'be ', 'true' );
        expect( result ).toBe( 'this should be true' );
    });
});


describe("get( string, position1, ..., positionN )", function() {

    testNoOrInvalidStringArguments( Strings.get );

    it("should return an empty string if no other valid arguments are given", function(){
        result= Strings.get( 'this will not show' );
        expect( result ).toBe( '' );

        result= Strings.get( 123 );
        expect( result ).toBe( '' );

        result= Strings.get( 123, null, NaN );
        expect( result ).toBe( '' );

        result= Strings.get( 123, new Date(), function(){} );
        expect( result ).toBe( '' );

        result= Strings.get( 'this will not show', true, undefined );
        expect( result ).toBe( '' );
    });

    it("should return a new string build from each position given, invalid positions should be ignored", function(){
        result= Strings.get( 'some of this will show', 1, -1 );
        expect( result ).toBe( 'sw' );

        result= Strings.get( 123, 2, NaN );
        expect( result ).toBe( '2' );

        result= Strings.get( 123, null, NaN, 1, 3 );
        expect( result ).toBe( '13' );

        result= Strings.get( 'this is ok', 1, 2, new Date(), 3, function(){}, 4 );
        expect( result ).toBe( 'this' );

        result= Strings.get( 'this', 10, -1, true, -2, undefined, 1, -10 );
        expect( result ).toBe( 'sit' );
    });

});

describe("random( amount, charset )", function() {

    it("should return a single random ascii character in the range Chars.ASCII_RANGE_ALL, if invalid or no arguments are given", function(){
        result= Strings.random();
        expect( result ).toBeGreaterThan( Strings.ascii(31) );
        expect( result ).toBeLessThan( Strings.ascii(127) );

        result= Strings.random( ['A'], {} );
        expect( result ).toBeGreaterThan( Strings.ascii(31) );
        expect( result ).toBeLessThan( Strings.ascii(127) );

        result= Strings.random( null, NaN );
        expect( result ).toBeGreaterThan( Strings.ascii(31) );
        expect( result ).toBeLessThan( Strings.ascii(127) );

        result= Strings.random( function(){}, new Date() );
        expect( result ).toBeGreaterThan( Strings.ascii(31) );
        expect( result ).toBeLessThan( Strings.ascii(127) );

        result= Strings.random( true, 'this ', 'should ', 'be', false );
        expect( result ).toBeGreaterThan( Strings.ascii(31) );
        expect( result ).toBeLessThan( Strings.ascii(127) );
    });

    it("should return a string of 'amount' random ascii characters in the range Chars.ASCII_RANGE_ALL, if a valid amount is given, but no charset", function(){
        result= Strings.random( 10 );
        expect( result ).toBeGreaterThan( Strings.ascii(31) );
        expect( result ).toBeLessThan( Strings.ascii(127) );
        expect( result.length ).toBe( 10 );
    });

    // add range specific tests later..
});


describe("times( string, amount )", function() {

    testNoOrInvalidStringArguments( Strings.times );

    it("should return 'string' if a valid string is given, but no, or invalid amount", function(){
        result= Strings.times( 'hi' );
        expect( result ).toBe( 'hi' );

        result= Strings.times( 'hi', [] );
        expect( result ).toBe( 'hi' );

        result= Strings.times( 'hi', null );
        expect( result ).toBe( 'hi' );

        result= Strings.times( 'hi', 'nope' );
        expect( result ).toBe( 'hi' );

        result= Strings.times( 'hi', true );
        expect( result ).toBe( 'hi' );
    });

    it("should return 'string' times 'amount if a valid string and amount is given", function(){
        result= Strings.times( 'hi', 2 );
        expect( result ).toBe( 'hihi' );

        result= Strings.times( '-a', 5 );
        expect( result ).toBe( '-a-a-a-a-a' );
    });
});

describe("regEscape( char )", function() {

    testNoOrInvalidStringArguments( Strings.regEscape );

    it("should return true if a valid alpha-numeric ascii character is given, checking only the first character", function(){

        result= Strings.regEscape( '/abc/' );
        expect( result ).toBe( '\\/abc\\/' );

        result= Strings.regEscape( '/.+/' );
        expect( result ).toBe( '\\/\\.\\+\\/' );

        result= Strings.regEscape( '/[abc]?/' );
        expect( result ).toBe( '\\/\\[abc\\]\\?\\/' );

        result= Strings.regEscape( '(strings)?' );
        expect( result ).toBe( '\\(strings\\)\\?' );

        result= Strings.regEscape( ' ' );
        expect( result ).toBe( ' ' );

        result= Strings.regEscape( 0 );
        expect( result ).toBe( '0' );
    });
});


describe("empty( string, amount )", function() {

    it("should return false if invalid or no arguments are given", function(){

        result= Strings.empty();
        expect( result ).toBe( false );

        result= Strings.empty( [], {} );
        expect( result ).toBe( false );

        result= Strings.empty( /abc/ );
        expect( result ).toBe( false );

        result= Strings.empty( NaN );
        expect( result ).toBe( false );

        result= Strings.empty( new Date() );
        expect( result ).toBe( false );
    });

    it("should return false if a string with at least 1 character, space, tab etc.., or a number is given", function(){
        result= Strings.empty( ' ' );
        expect( result ).toBe( false );

        result= Strings.empty( '/t' );
        expect( result ).toBe( false );

        result= Strings.empty( 'a' );
        expect( result ).toBe( false );

        result= Strings.empty( 123 );
        expect( result ).toBe( false );

        result= Strings.empty( 'this is not empty' );
        expect( result ).toBe( false );
    });

    it("should return true if a String type argument is given with length 0", function(){
        result= Strings.empty( '' );
        expect( result ).toBe( true );
    });
});

//

describe("isAlpha( string )", function() {

    it("should return false if invalid or no argument is given", function(){
        result= Strings.isAlpha();
        expect( result ).toBe( false );

        result= Strings.isAlpha( 45 );
        expect( result ).toBe( false );

        result= Strings.isAlpha( ['A'] );
        expect( result ).toBe( false );

        result= Strings.isAlpha( null );
        expect( result ).toBe( false );

        result= Strings.isAlpha( function(){} );
        expect( result ).toBe( false );
    });

    it("should return false if a valid non-alpha character string is given", function(){
        result= Strings.isAlpha( '^$%^*' );
        expect( result ).toBe( false );

        result= Strings.isAlpha( ',.//.,' );
        expect( result ).toBe( false );

        result= Strings.isAlpha( '4321' );
        expect( result ).toBe( false );
    });

    it("should return true if a valid alpha-character string is given", function(){

        result= Strings.isAlpha( 'theseAreAlphasBewareNoSpaces' );
        expect( result ).toBe( true );

        result= Strings.isAlpha( 'abcde' );
        expect( result ).toBe( true );

        result= Strings.isAlpha( 'ZYXW' );
        expect( result ).toBe( true );
    });


});


describe("isNumeric( string )", function() {

    it("should return false if invalid or no argument is given", function(){
        result= Strings.isNumeric();
        expect( result ).toBe( false );

        result= Strings.isNumeric( '!' );
        expect( result ).toBe( false );

        result= Strings.isNumeric( ['A'] );
        expect( result ).toBe( false );

        result= Strings.isNumeric( null );
        expect( result ).toBe( false );

        result= Strings.isNumeric( function(){} );
        expect( result ).toBe( false );
    });

    it("should return false if a valid non-numeric ascii character string is given", function(){
        result= Strings.isNumeric( '' );
        expect( result ).toBe( false );

        result= Strings.isNumeric( '!' );
        expect( result ).toBe( false );

        result= Strings.isNumeric( ' ' );
        expect( result ).toBe( false );

        result= Strings.isNumeric( '!23, should be all numbers to return true' );
        expect( result ).toBe( false );

        result= Strings.isNumeric( 'This is definitely not numeric!' );
        expect( result ).toBe( false );

    });

    it("should return true if a valid numeric ascii character string is given", function(){

        result= Strings.isNumeric( '123' );
        expect( result ).toBe( true );

        result= Strings.isNumeric( '0' );
        expect( result ).toBe( true );

        result= Strings.isNumeric( '555' );
        expect( result ).toBe( true );
    });
});

describe("isAlphaNumeric( string )", function() {

    it("should return false if invalid or no argument is given", function(){
        result= Strings.isAlphaNumeric();
        expect( result ).toBe( false );

        result= Strings.isAlphaNumeric( '!' );
        expect( result ).toBe( false );

        result= Strings.isAlphaNumeric( ['A'] );
        expect( result ).toBe( false );

        result= Strings.isAlphaNumeric( null );
        expect( result ).toBe( false );

        result= Strings.isAlphaNumeric( function(){} );
        expect( result ).toBe( false );
    });

    it("should return false if a valid non-alpha-numeric ascii character string is given", function(){
        result= Strings.isAlphaNumeric( '@#$%2345@#$%@#' );
        expect( result ).toBe( false );

        result= Strings.isAlphaNumeric( '.' );
        expect( result ).toBe( false );

        result= Strings.isAlphaNumeric( ' \t ' );
        expect( result ).toBe( false );

        result= Strings.isAlphaNumeric( '!23' );
        expect( result ).toBe( false );
    });

    it("should return true if a valid alpha-numeric ascii character string is given", function(){
        result= Strings.isAlphaNumeric( 'abc123xyz' );
        expect( result ).toBe( true );

        result= Strings.isAlphaNumeric( '0' );
        expect( result ).toBe( true );

        result= Strings.isAlphaNumeric( 'b1a8' );
        expect( result ).toBe( true );

        result= Strings.isAlphaNumeric( '000thisIsValid123EvenWithNumbers000' );
        expect( result ).toBe( true );
    });

});

describe("isSpecial( string )", function() {

    it("should return false if invalid or no argument is given", function(){
        result= Strings.isSpecial();
        expect( result ).toBe( false );

        result= Strings.isSpecial( NaN );
        expect( result ).toBe( false );

        result= Strings.isSpecial( ['A'] );
        expect( result ).toBe( false );

        result= Strings.isSpecial( null );
        expect( result ).toBe( false );

        result= Strings.isSpecial( function(){} );
        expect( result ).toBe( false );
    });

    it("should return false if a valid non-special ascii character string is given", function(){
        result= Strings.isSpecial( 'No special characters in here' );
        expect( result ).toBe( false );

        result= Strings.isSpecial( '123 numbers and     \t \t spaces are allowed' );
        expect( result ).toBe( false );

        result= Strings.isSpecial( '123' );
        expect( result ).toBe( false );

        result= Strings.isSpecial( '@#$^noGood!@#$%' );
        expect( result ).toBe( false );

    });

    it("should return true if a valid special ascii character string is given", function(){
        result= Strings.isSpecial( '.$%^*#' );
        expect( result ).toBe( true );

        result= Strings.isSpecial( '<>?":{}' );
        expect( result ).toBe( true );
    });
});

describe("isSpace( string )", function() {

    it("should return false if invalid or no argument is given", function(){
        result= Strings.isSpace();
        expect( result ).toBe( false );

        result= Strings.isSpace( NaN );
        expect( result ).toBe( false );

        result= Strings.isSpace( ['A'] );
        expect( result ).toBe( false );

        result= Strings.isSpace( 0 );
        expect( result ).toBe( false );

        result= Strings.isSpace( null );
        expect( result ).toBe( false );

        result= Strings.isSpace( function(){} );
        expect( result ).toBe( false );
    });

    it("should return false if a valid string is given with not only spaces", function(){
        result= Strings.isSpace( 'not only spaces' );
        expect( result ).toBe( false );

        result= Strings.isSpace( '  /t  /t  .' );
        expect( result ).toBe( false );

        result= Strings.isSpace( '0' );
        expect( result ).toBe( false );

        result= Strings.isSpace( '' );
        expect( result ).toBe( false );
    });

    it("should return true if a valid string with only spaces is given", function(){
        result= Strings.isSpace( ' ' );
        expect( result ).toBe( true );

        result= Strings.isSpace( '                 ' );
        expect( result ).toBe( true );

        result= Strings.isSpace( '\t' );
        expect( result ).toBe( true );

        result= Strings.isSpace( '\t    \t    \t' );
        expect( result ).toBe( true );
    });
});

describe("xs( string, callback )", function() {

    testNoOrInvalidStringArguments( Strings.xs );

    it("should return string if string is a valid string, but no callback or invalid callback is given", function(){

        result= Strings.xs( '' );
        expect( result ).toBe( '' );

        result= Strings.xs( 'hi' );
        expect( result ).toBe( 'hi' );

        result= Strings.xs( 'hi', ['A'] );
        expect( result ).toBe( 'hi' );

        result= Strings.xs( 'hi',  0 );
        expect( result ).toBe( 'hi' );

        result= Strings.xs( 'hi', null );
        expect( result ).toBe( 'hi' );

        result= Strings.xs( 'hi', undefined );
        expect( result ).toBe( 'hi' );
    });

    it("should return string as String if a valid Number as string is given, but no callback or invalid callback", function(){
        result= Strings.xs( 123 );
        expect( result ).toBe( '123' );

        result= Strings.xs( 0 );
        expect( result ).toBe( '0' );

        result= Strings.xs( 33, 1 );
        expect( result ).toBe( '33' );

        result= Strings.xs( 44, null );
        expect( result ).toBe( '44' );

    });

    it("should return string if a valid string or number is given, with callback always returning true", function(){
        result= Strings.xs( ' ', function(){ return true; } );
        expect( result ).toBe( ' ' );

        result= Strings.xs( 33, function(){ return true; } );
        expect( result ).toBe( '33' );

        result= Strings.xs( '\t', function(){ return true; } );
        expect( result ).toBe( '\t' );

        result= Strings.xs( 'test', function(){ return true; } );
        expect( result ).toBe( 'test' );
    });

    it("should return string modified if a valid string or number is given, with callback returning true on some condition", function(){
        result= Strings.xs( 'kill some spaces', function(char, index){
            if (char !== ' ')
                return true
        });
        expect( result ).toBe( 'killsomespaces' );

        result= Strings.xs( 1020304050, function(char, index){
            if (char !== '0')
                return true
        });
        expect( result ).toBe( '12345' );

        result= Strings.xs( 1020304050, function(char, index){
            if (index %2 === 0)
                return true
        });
        expect( result ).toBe( '12345' );
    });

    it("should return string modified if a valid string or number is given, with callback returning a modified character on some condition", function(){
        result= Strings.xs( 'this is interesting', function(char, index){
            return (char === 'i') ? '!' : char
        });
        expect( result ).toBe( 'th!s !s !nterest!ng' );

        result= Strings.xs( '1-2-3-4-5= 15?', function(char, index){
            return (char === '-') ? '+= ' : char
        });
        expect( result ).toBe( '1+= 2+= 3+= 4+= 5= 15?' );
    });
});

describe("copy( string, offset, amount )", function() {

    testNoOrInvalidStringArguments( Strings.copy );

    it("should return string if string is a valid String, with no or invalid additional arguments", function(){
        result= Strings.copy( '' );
        expect( result ).toBe( '' );

        result= Strings.copy( 'this is a copy' );
        expect( result ).toBe( 'this is a copy' );

        result= Strings.copy( 'this is a copy', [], null );
        expect( result ).toBe( 'this is a copy' );

        result= Strings.copy( 'this is a copy', /123/, 'abc' );
        expect( result ).toBe( 'this is a copy' );

        result= Strings.copy( 'this is a copy', 'not a number', 'notParsable 1' );
        expect( result ).toBe( 'this is a copy' );

    });

    it("should return a copy of string if string is a valid String, and offset and amount are valid too ", function(){
        result= Strings.copy( 'this is a copy', 6, 2 );
        expect( result ).toBe( 'is' );

        result= Strings.copy( 'this is a copy', 6, 100 );
        expect( result ).toBe( 'is a copy' );

        result= Strings.copy( 'this is a copy', '6px', '100px' );
        expect( result ).toBe( 'is a copy' );

        result= Strings.copy( 'this is a copy', -4, 4 );
        expect( result ).toBe( 'copy' );
    });
});

describe("replace( string, toReplace, replacement, flags )", function() {

    testNoOrInvalidStringArguments( Strings.replace );

    it("should return string if string is a valid String, with no or invalid additional arguments", function(){
        result= Strings.replace( 'nothing replaced' );
        expect( result ).toBe( 'nothing replaced' );

        result= Strings.replace( 'nothing replaced', {}, null, NaN );
        expect( result ).toBe( 'nothing replaced' );

        result= Strings.replace( 'nothing replaced', false, /234/, 1 );
        expect( result ).toBe( 'nothing replaced' );
    });

    it("should return string unchanged if all arguments are valid, but toReplace is not found", function(){
        result= Strings.replace( 'nothing replaced', 'q', '!' );
        expect( result ).toBe( 'nothing replaced' );

        result= Strings.replace( 'nothing replaced', 1, '0' );
        expect( result ).toBe( 'nothing replaced' );
    });

    it("should replace toReplace with replacement in string if replacement is found, globally by default", function(){
        result= Strings.replace( 'this is a replacement', 'i', '!' );
        expect( result ).toBe( 'th!s !s a replacement' );

        result= Strings.replace( 'this is a replacement', 'is', '!s' );
        expect( result ).toBe( 'th!s !s a replacement' );

        result= Strings.replace( 1020304, 0, '-' );
        expect( result ).toBe( '1-2-3-4' );

        result= Strings.replace( 1020304, '0', '-' );
        expect( result ).toBe( '1-2-3-4' );

        result= Strings.replace( 1020304, /0/g, '-' );
        expect( result ).toBe( '1-2-3-4' );

        result= Strings.replace( 'hi, hello!', /h/, 'H' );
        expect( result ).toBe( 'Hi, hello!' );
    });

    it("should replace toReplace with replacement in string if replacement is found, only the first occurance if flag is set to: none global", function(){
        result= Strings.replace( 'this is a replacement', 'i', '!', '' );
        expect( result ).toBe( 'th!s is a replacement' );

        result= Strings.replace( 'this is a replacement', 'is', '!s', '' );
        expect( result ).toBe( 'th!s is a replacement' );

        result= Strings.replace( 'this is a replacement', /is/, '!s' );
        expect( result ).toBe( 'th!s is a replacement' );
    });

    // maybe add more tests later..
});

describe("trim( string )", function() {

    testNoOrInvalidStringArguments( Strings.trim );

    it("should return string unchanged if no spaces are found at beginning or end", function(){
        result= Strings.trim( 'unchanged' );
        expect( result ).toBe( 'unchanged' );
    });

    it("should return string trimmed for spaces found at beginning and/or end", function(){
        result= Strings.trim( '    this is trimmed    ' );
        expect( result ).toBe( 'this is trimmed' );

        result= Strings.trim( '\t \t this is trimmed' );
        expect( result ).toBe( 'this is trimmed' );

        result= Strings.trim( 'this is trimmed\t \t   ' );
        expect( result ).toBe( 'this is trimmed' );

        result= Strings.trim( '    \t\n\t    \t  this is trimmed\t\t\t      \n\r           \t' );
        expect( result ).toBe( 'this is trimmed' );
    });

});

describe("trimLeft( string )", function() {

    testNoOrInvalidStringArguments( Strings.trimLeft );

    it("should return string unchanged if no spaces are found at beginning", function(){
        result= Strings.trimLeft( 'unchanged' );
        expect( result ).toBe( 'unchanged' );
    });

    it("should return string trimmed for spaces found at beginning", function(){
        result= Strings.trimLeft( '    this is trimmed   ' );
        expect( result ).toBe( 'this is trimmed   ' );

        result= Strings.trimLeft( '\t \t this is trimmed\t\n' );
        expect( result ).toBe( 'this is trimmed\t\n' );
    });
});

describe("trimRight( string )", function() {

    testNoOrInvalidStringArguments( Strings.trimRight );

    it("should return string unchanged if no spaces are found at the end", function(){
        result= Strings.trimRight( 'unchanged' );
        expect( result ).toBe( 'unchanged' );
    });

    it("should return string trimmed for spaces found at the end", function(){
        result= Strings.trimRight( '  this is trimmed    \t \r\n' );
        expect( result ).toBe( '  this is trimmed' );

        result= Strings.trimRight( '\n\tthis is trimmed\t\n' );
        expect( result ).toBe( '\n\tthis is trimmed' );
    });
});

describe("oneSpace( string )", function() {

    testNoOrInvalidStringArguments( Strings.oneSpace );

    it("should return string with consecutive spaces removed", function(){
        result= Strings.oneSpace( 'this   text    has \t\t way too      many spaces!' );
        expect( result ).toBe( 'this text has way too many spaces!' );

        result= Strings.oneSpace( ' this   text \n   has \t\t way too      many spaces! \n         \r \t' );
        expect( result ).toBe( ' this text has way too many spaces! ' );
    });

});

describe("toCamel( string, char )", function() {

    testNoOrInvalidStringArguments( Strings.toCamel );

    it("should return string camelized by default char '-'", function(){
        result= Strings.toCamel( 'time-for-some-camels' );
        expect( result ).toBe( 'timeForSomeCamels' );
    });

    it("should return string camelized by default char, also when char given is invalid", function(){

        result= Strings.toCamel( 'time-for-some-camels', [] );
        expect( result ).toBe( 'timeForSomeCamels' );

        result= Strings.toCamel( 'time-for-some-camels', null );
        expect( result ).toBe( 'timeForSomeCamels' );

        result= Strings.toCamel( 'time-for-some-camels', new Date() );
        expect( result ).toBe( 'timeForSomeCamels' );

    });

    it("should return string camelized by char if char is a valid character", function(){

        result= Strings.toCamel( 'time0for0some0camels', 0 );
        expect( result ).toBe( 'timeForSomeCamels' );

        result= Strings.toCamel( 'time|for|some|camels', '|' );
        expect( result ).toBe( 'timeForSomeCamels' );

        result= Strings.toCamel( 'time,for,some,camels', ',' );
        expect( result ).toBe( 'timeForSomeCamels' );

    });
});

describe("unCamel( string, insertion )", function() {

    testNoOrInvalidStringArguments( Strings.unCamel );

    it("should return string uncamelized with default insertion '-'", function(){
        result= Strings.unCamel( 'toBeUnCamelized' );
        expect( result ).toBe( 'to-be-un-camelized' );
    });

    it("should return string uncamelized by default char, also when char given is invalid", function(){

        result= Strings.unCamel( 'toBeUnCamelized', [] );
        expect( result ).toBe( 'to-be-un-camelized' );

        result= Strings.unCamel( 'toBeUnCamelized', null );
        expect( result ).toBe( 'to-be-un-camelized' );

        result= Strings.unCamel( 'toBeUnCamelized', /abc/ );
        expect( result ).toBe( 'to-be-un-camelized' );
    });

    it("should return string uncamelized by insertion if insertion is a valid character/string", function(){

        result= Strings.unCamel( 'toBeUnCamelized', '|' );
        expect( result ).toBe( 'to|be|un|camelized' );

        result= Strings.unCamel( 'toBeUnCamelized', ',' );
        expect( result ).toBe( 'to,be,un,camelized' );

        result= Strings.unCamel( 'toBeUnCamelized', ' ' );
        expect( result ).toBe( 'to be un camelized' );

        result= Strings.unCamel( 'toBeUnCamelized', '' );
        expect( result ).toBe( 'tobeuncamelized' );
    });
});

describe("shuffle( string )", function() {
    testNoOrInvalidStringArguments( Strings.shuffle );
});

describe("find( string, query )", function() {

    it("should return a empty Array if invalid or no argument is given", function(){
        result= Strings.find();
        expect( result ).toEqual( [] );

        result= Strings.find( NaN );
        expect( result ).toEqual( [] );

        result= Strings.find( {test: 0} );
        expect( result ).toEqual( [] );

        result= Strings.find( ['A'] );
        expect( result ).toEqual( [] );

        result= Strings.find( false );
        expect( result ).toEqual( [] );

        result= Strings.find( null );
        expect( result ).toEqual( [] );

        result= Strings.find( function(){} );
        expect( result ).toEqual( [] );
    });

    it("should return a empty Array if only string is given", function(){
        result= Strings.find( 'what can be found in here?' );
        expect( result ).toEqual( [] );
    });

    it("should return a empty Array if a valid string is given, but invalid query", function(){
        result= Strings.find( 'what can be found in here?', [] );
        expect( result ).toEqual( [] );

        result= Strings.find( 'what can be found in here?', null );
        expect( result ).toEqual( [] );

        result= Strings.find( 'what can be found in here?', function(){} );
        expect( result ).toEqual( [] );
    });

    it("should return a empty Array if a valid string and query is given, query is not found", function(){
        result= Strings.find( 'what can be found in here?', 123 );
        expect( result ).toEqual( [] );

        result= Strings.find( 'what can be found in here?', /123/ );
        expect( result ).toEqual( [] );

        result= Strings.find( 'what can be found in here?', function(){} );
        expect( result ).toEqual( [] );
    });

    it("should return an Array with the correct indexes where query is found in string", function(){
        result= Strings.find( 'what can be found in here?', 'a' );
        expect( result ).toEqual( [3, 7] );

        result= Strings.find( 'what can be found in here?', 'w' );
        expect( result ).toEqual( [1] );

        result= Strings.find( 'what can be found in here?', 'can' );
        expect( result ).toEqual( [6] );
    });

    it("should return an Array with the correct indexes where query is found in string, even when query is of type Number", function(){
        result= Strings.find( 'what number 10 can be found in here?', 10 );
        expect( result ).toEqual( [13] );

        result= Strings.find( '1 0 2 0 3', 0 );
        expect( result ).toEqual( [3, 7] );
    });

    it("should return an Array with only the first index where query is found in string, if the default 'global flag' is unset", function(){
        result= Strings.find( '1 0 2 0 3', 0, '' ); // disable the default global flag
        expect( result ).toEqual( [3] );
    });

    it("should return an Array with the correct indexes where query is found in string, even when query and string are of type Number", function(){
        result= Strings.find( 1020304, 0 );
        expect( result ).toEqual( [2, 4, 6] );
    });

    it("should return an Array with the correct indexes where query is found in string, also when query is a regular expression", function(){
        result= Strings.find( 1020304, /0/g );
        expect( result ).toEqual( [2, 4, 6] );
    });

    it("should return an Array with only the first index where query is found in string, with a regular expression and the default 'global flag' unset", function(){
        result= Strings.find( 1020304, /0/, '' );
        expect( result ).toEqual( [2] );
    });
});

describe("count( string, query )", function() {
    it("should return the Number 0 if invalid or no argument is given", function(){
        result= Strings.count();
        expect( result ).toBe( 0 );

        result= Strings.count( NaN );
        expect( result ).toBe( 0 );

        result= Strings.count( {test: 0} );
        expect( result ).toBe( 0 );

        result= Strings.count( ['A'] );
        expect( result ).toBe( 0 );

        result= Strings.count( false );
        expect( result ).toBe( 0 );

        result= Strings.count( null );
        expect( result ).toBe( 0 );

        result= Strings.count( function(){} );
        expect( result ).toBe( 0 );
    });

     it("should return the Number 0 if only string is given", function(){
        result= Strings.count( 'what can be found in here?' );
        expect( result ).toBe( 0 );
    });

    it("should return the Number 0 if a valid string is given, but invalid query", function(){
        result= Strings.count( 'what can be found in here?', {} );
        expect( result ).toBe( 0 );

        result= Strings.count( 'what can be found in here?', null );
        expect( result ).toBe( 0 );

        result= Strings.count( 'what can be found in here?', function(){} );
        expect( result ).toBe( 0 );
    });

    it("should return the Number 0 if a valid string and query is given, but query is not found", function(){
        result= Strings.count( 'what can be found in here?', 123 );
        expect( result ).toBe( 0 );

        result= Strings.count( 'what can be found in here?', 'founder' );
        expect( result ).toBe( 0 );

        result= Strings.count( 'what can be found in here?', /123/ );
        expect( result ).toBe( 0 );
    });

    it("should return the amount of times query is found in string", function(){
        result= Strings.count( 'what can be found in here?', ' ' );
        expect( result ).toEqual( 5 );

        result= Strings.count( 'what can be found in here?', 'w' );
        expect( result ).toEqual( 1 );

        result= Strings.count( 'what can be found in here?', /e/ );
        expect( result ).toEqual( 3 );

        result= Strings.count( 'what can be found in here?', 'can' );
        expect( result ).toEqual( 1 );
    });
});

// calls count, so fewer tests are needed.
describe("contains( string, query )", function() {

     it("should return false if query is not found in string", function(){
        result= Strings.contains( 'what can be found in here?', 'pasta?' );
        expect( result ).toBe( false );
    });

     it("should return true if query is found in string", function(){
        result= Strings.contains( 'what can be found in here?', 'here' );
        expect( result ).toBe( true );

        result= Strings.contains( 'what can be found in here?', '?' );
        expect( result ).toBe( true );
    });

});

describe("between( string, before, after )", function() {

    testNoOrInvalidStringArguments( Strings.between );

    it("should return empty string if any of the arguments is of invalid type", function(){

        result= Strings.between( 'valid string', 'valid before', false);
        expect( result ).toBe( '' );

        result= Strings.between( 'valid string', NaN, 'valid after' );
        expect( result ).toBe( '' );

        result= Strings.between( {test: 0}, 'valid before', 'valid after' );
        expect( result ).toBe( '' );

        result= Strings.between( NaN, null, function(){} );
        expect( result ).toBe( '' );
    });

     it("should return empty string if before or after is not found in string", function(){
        result= Strings.between( 'this is a test', 'this', 'what?' );
        expect( result ).toBe( '' );

        result= Strings.between( 'this is a test', 'not', 'found' );
        expect( result ).toBe( '' );
    });

     it("should return the string or character between before and after", function(){
        result= Strings.between( 'this is a test', 'this', 'test' );
        expect( result ).toBe( ' is a ' );

        result= Strings.between( 'this is a test', ' is', 'a' );
        expect( result ).toBe( ' ' );
    });
});

describe("slice( string, start, size )", function() {

    testNoOrInvalidStringArguments( Strings.slice );

    it("should return empty string if any of the arguments is of invalid type", function(){

        result= Strings.slice( 'valid string', NaN, false );
        expect( result ).toBe( '' );

        result= Strings.slice( 'valid string', true, null );
        expect( result ).toBe( '' );

        result= Strings.slice( NaN, null, function(){} );
        expect( result ).toBe( '' );
    });

     it("should return empty string if start is greater than string.length", function(){
        result= Strings.slice( 'what can be found in here?', 100, 2 );
        expect( result ).toBe( '' );

        result= Strings.slice( 'what can be found in here?', 'what can be found in here?'.length+ 1  , 10 );
        expect( result ).toBe( '' );
    });

     it("should return correct a start from 0 to be 1", function(){
        result= Strings.slice( 'what can be found in here?', 0, 4 );
        expect( result ).toBe( 'what' );
    });

     it("should return a slice of string from start to start+ size", function(){
        result= Strings.slice( 'what can be found in here?', 1, 4);
        expect( result ).toBe( 'what' );

        result= Strings.slice( '0123456789', 10, 1);
        expect( result ).toBe( '9' );

        result= Strings.slice( '0123456789', 1, 1);
        expect( result ).toBe( '0' );
    });

     it("should return a slice of string from start to start+ size, if start is a negative number", function(){
        result= Strings.slice( 'what can be found in here?', -1, 1);
        expect( result ).toBe( '?' );

        result= Strings.slice( '0123456789', -10, 1);
        expect( result ).toBe( '0' );
    });
});

describe("crop( string, start, size )", function() {

    it("should equal slice", function(){
        result= Strings.slice;
        expect( result ).toBe( Strings.crop );
    });
});


describe("truncate( string, length, appendix )", function() {

    testNoOrInvalidStringArguments( Strings.truncate );

    it("should return string if string is valid, but length not", function(){
        result= Strings.truncate( 'to be truncated', NaN );
        expect( result ).toBe( 'to be truncated' );

        result= Strings.truncate( 'to be truncated', true );
        expect( result ).toBe( 'to be truncated' );
    });

     it("should return string appended with appendix if length is invalid, but appendix valid", function(){
        result= Strings.truncate( 'to be truncated', NaN, '?' );
        expect( result ).toBe( 'to be truncated?' );

        result= Strings.truncate( 'to be truncated', true, '!?' );
        expect( result ).toBe( 'to be truncated!?' );

        result= Strings.truncate( 123456789, true, 0 );
        expect( result ).toBe( '1234567890' );
    });

     it("should return string truncated to length", function(){
        result= Strings.truncate( 'to be truncated', 5 );
        expect( result ).toBe( 'to be' );

        result= Strings.truncate( 'to be truncated', -10 );
        expect( result ).toBe( 'to be' );
    });

    it("should return string truncated to length, and appended with appendix", function(){
        result= Strings.truncate( 'to be truncated', 5, ' true' );
        expect( result ).toBe( 'to be true' );

        result= Strings.truncate( 'to be truncated', -9, 1 );
        expect( result ).toBe( 'to be 1' );
    });

    it("should return only appendix if the length is 0, or the negative length is greater than negative string.length", function(){
        result= Strings.truncate( 'to be truncated', 0, 1 );
        expect( result ).toBe( '1' );

        result= Strings.truncate( 'to be truncated', -'to be truncated'.length, 1 );
        expect( result ).toBe( '1' );
    });

});


describe("pop( string, amount )", function() {

    testNoOrInvalidStringArguments( Strings.pop );


    it("should return string minus the last character if amount is not given or invalid", function(){
        result= Strings.pop( 'to be truncated!?' );
        expect( result ).toBe( 'to be truncated!' );

        result= Strings.pop( 'to be truncated!?', NaN );
        expect( result ).toBe( 'to be truncated!' );

        result= Strings.pop( 'to be truncated!?', 'abc' );
        expect( result ).toBe( 'to be truncated!' );

        result= Strings.pop( 'to be truncated!?', function(){} );
        expect( result ).toBe( 'to be truncated!' );
    });

    it("should return string minus the amount of characters, popped from the end", function(){
        result= Strings.pop( 'to be truncated', 10 );
        expect( result ).toBe( 'to be' );

        result= Strings.pop( 'to be truncated', -10 );
        expect( result ).toBe( 'to be' );

        result= Strings.pop( 'to be truncated', -100 );
        expect( result ).toBe( '' );

        result= Strings.pop( 'to be truncated', '100px' );
        expect( result ).toBe( '' );
    });
});


describe("split( string, delimiter )", function() {

    it("should return a empty Array if invalid or no argument is given", function(){
        result= Strings.split();
        expect( result ).toEqual( [] );

        result= Strings.split( NaN );
        expect( result ).toEqual( [] );

        result= Strings.split( {test: 0} );
        expect( result ).toEqual( [] );

        result= Strings.split( ['A'] );
        expect( result ).toEqual( [] );

        result= Strings.split( false );
        expect( result ).toEqual( [] );

        result= Strings.split( null );
        expect( result ).toEqual( [] );

        result= Strings.split( function(){} );
        expect( result ).toEqual( [] );

        result= Strings.split( null, NaN );
        expect( result ).toEqual( [] );

        result= Strings.split( function(){}, [1,2,3] );
        expect( result ).toEqual( [] );
    });

    it("should return a non-sparse Array from string, split by spaces(default), if no or invalid delimiter is given", function(){
        result= Strings.split( '        what     can be   found in           here?          ' );
        expect( result ).toEqual( ['what', 'can', 'be', 'found', 'in', 'here?'] );

        result= Strings.split( '        what     can be   found in           here?          ', NaN );
        expect( result ).toEqual( ['what', 'can', 'be', 'found', 'in', 'here?'] );

        result= Strings.split( '        what     can be   found in           here?   \n  \r       ', null );
        expect( result ).toEqual( ['what', 'can', 'be', 'found', 'in', 'here?'] );

        result= Strings.split( 12345 );
        expect( result ).toEqual( ['12345'] );
    });

    it("should return a non-sparse Array from string, split by delimiter", function(){
        result= Strings.split( 'this is a test', ' ' );
        expect( result ).toEqual( ['this', 'is', 'a', 'test'] );

        result= Strings.split( 102030405, 0 );
        expect( result ).toEqual( ['1', '2', '3', '4', '5'] );

        result= Strings.split( '102030405', 0 );
        expect( result ).toEqual( ['1', '2', '3', '4', '5'] );

        result= Strings.split( '102030405', '0 only index[0], the rest is ignored' );
        expect( result ).toEqual( ['1', '2', '3', '4', '5'] );

        result= Strings.split( '1 0 2 0 3 0 4 0 5', 0 );
        expect( result ).toEqual( ['1', '2', '3', '4', '5'] );

        result= Strings.split( '  1   0  \n 2 0 \t\n  3      0  4         0 5   ', 0 );
        expect( result ).toEqual( ['1', '2', '3', '4', '5'] );

        result= Strings.split( '  1   9  \n 2 9 \t\n  3      9  4         9 5   ', 9876 );
        expect( result ).toEqual( ['1', '2', '3', '4', '5'] );

        result= Strings.split( '12345', '' );
        expect( result ).toEqual( ['1', '2', '3', '4', '5'] );

        result= Strings.split( '         1\n\t\r2         3   4 5   ', '' );
        expect( result ).toEqual( ['1', '2', '3', '4', '5'] );

        result= Strings.split( '1', '' );
        expect( result ).toEqual( ['1'] );
    });
});

describe("reverse( string )", function() {

    testNoOrInvalidStringArguments( Strings.reverse );

     it("should return the string reversed", function(){
        result= Strings.reverse( 123 );
        expect( result ).toBe( '321' );

        result= Strings.reverse( 'this' );
        expect( result ).toBe( 'siht' );

        result= Strings.reverse( 'odnomyaR sinneD' );
        expect( result ).toBe( 'Dennis Raymondo' );

        result= Strings.reverse( '\todnomyaR\t\n\rsinneD\t' );
        expect( result ).toBe( '\tDennis\r\n\tRaymondo\t' );
    });
});

describe("upper( string )", function() {

    testNoOrInvalidStringArguments( Strings.upper );

     it("should return string with all lowercase characters converted to uppercase", function(){
        result= Strings.upper( 'a' );
        expect( result ).toBe( 'A' );

        result= Strings.upper( 'let\'s shout!' );
        expect( result ).toBe( 'LET\'S SHOUT!' );
    });

     it("should return string with all lowercase characters converted to uppercase, ignoring numbers or special characters", function(){
        result= Strings.upper( 'a!@#$%!@#%!@#%!@#%!@#*&)*(^&^&^$%^**' );
        expect( result ).toBe( 'A!@#$%!@#%!@#%!@#%!@#*&)*(^&^&^$%^**' );

        result= Strings.upper( 'let\'s shout!<>?L:"{}|!!@#%#$%^&*(*^&(((_*+_)(*' );
        expect( result ).toBe( 'LET\'S SHOUT!<>?L:"{}|!!@#%#$%^&*(*^&(((_*+_)(*' );

        result= Strings.upper( 'a1234z' );
        expect( result ).toBe( 'A1234Z' );
    });
});

describe("lower( string )", function() {

    testNoOrInvalidStringArguments( Strings.lower );

     it("should return string with all lowercase characters converted to uppercase", function(){
        result= Strings.lower( 'A' );
        expect( result ).toBe( 'a' );

        result= Strings.lower( 'LET\'S SHOUT!' );
        expect( result ).toBe( 'let\'s shout!' );
    });

     it("should return string with all lowercase characters converted to uppercase, ignoring numbers or special characters", function(){
        result= Strings.lower( 'A!@#$%!@#%!@#%!@#%!@#*&)*(^&^&^$%^**' );
        expect( result ).toBe( 'a!@#$%!@#%!@#%!@#%!@#*&)*(^&^&^$%^**' );

        result= Strings.lower( 'LET\'S SHOUT!<>?L:"{}|!!@#%#$%^&*(*^&(((_*+_)(*' );
        expect( result ).toBe( 'let\'s shout!<>?l:"{}|!!@#%#$%^&*(*^&(((_*+_)(*' );

        result= Strings.lower( 'A1234Z' );
        expect( result ).toBe( 'a1234z' );
    });
});

describe("insert( string, insertion, index )", function() {

    testNoOrInvalidStringArguments( Strings.insert );

     it("should return string without changes if no other valid arguments are given", function(){

        result= Strings.insert( 'nothing inserted' );
        expect( result ).toBe( 'nothing inserted' );

        result= Strings.insert( 123 );
        expect( result ).toBe( '123' );

        result= Strings.insert( '123*&^abc' );
        expect( result ).toBe( '123*&^abc' );

        result= Strings.insert( '123*&^abc', null, undefined );
        expect( result ).toBe( '123*&^abc' );

        result= Strings.insert( '123*&^abc', new Date(), function(){});
        expect( result ).toBe( '123*&^abc' );

        result= Strings.insert( '123*&^abc', NaN, true );
        expect( result ).toBe( '123*&^abc' );
    });

     it("should string without changes if no or invalid index is given", function(){
        result= Strings.insert( 123, 0 );
        expect( result ).toBe( '123' );

        result= Strings.insert( 123, 0, NaN );
        expect( result ).toBe( '123' );

        result= Strings.insert( 123, 0, false );
        expect( result ).toBe( '123' );

        result= Strings.insert( 123, 0, {} );
        expect( result ).toBe( '123' );
    });


     it("should return string with insertion inserted at the position of index in string", function(){
        result= Strings.insert( 123, 0, 1 );
        expect( result ).toBe( '0123' );

        result= Strings.insert( 'ps.., inserted two o\'s', 'oo', 0 );
        expect( result ).toBe( 'oops.., inserted two o\'s' );

        result= Strings.insert( 1235, 4, -1 );
        expect( result ).toBe( '12345' );

        result= Strings.insert( 12345, 0, -5 );
        expect( result ).toBe( '012345' );
    });

    it("should return string with insertion appended to the string if index is greater than the length of the string", function(){
        result= Strings.insert( 123, 4, 10 );
        expect( result ).toBe( '1234' );

        result= Strings.insert( 'append exclamation', '!', 100 );
        expect( result ).toBe( 'append exclamation!' );

        result= Strings.insert( 'append exclamation', '!', '100px' );
        expect( result ).toBe( 'append exclamation!' );
    });

    it("should return string with insertion prepended to the string if index is less than the negative length of the string", function(){
        result= Strings.insert( 123, 0, -10 );
        expect( result ).toBe( '0123' );

        result= Strings.insert( 123, 0, '-10px' );
        expect( result ).toBe( '0123' );
    });

    it("should return string with insertion on multiple positions", function(){
        result= Strings.insert( 123, '-', 2, 3 );
        expect( result ).toBe( '1-2-3' );

        result= Strings.insert( 123, '-', -1, 1 );
        expect( result ).toBe( '-12-3' );

        result= Strings.insert( 123, '-', 2, -2 );
        expect( result ).toBe( '1-23' );

        result= Strings.insert( 123, '-', -5, 30 );
        expect( result ).toBe( '-123-' );

        result= Strings.insert( 123, '-', '-50px', 'hn30' );
        expect( result ).toBe( '-123' );

        result= Strings.insert( 123, '-', '5pt', '30deg' );
        expect( result ).toBe( '123--' );
    });



});

describe("removeRange( string, offset, amount= 1 )", function() {

    testNoOrInvalidStringArguments( Strings.removeRange );

    it("should return string without changes if no other valid arguments are given", function(){

        result= Strings.removeRange( 'nothing inserted' );
        expect( result ).toBe( 'nothing inserted' );

        result= Strings.removeRange( 123 );
        expect( result ).toBe( '123' );

        result= Strings.removeRange( '123*&^abc' );
        expect( result ).toBe( '123*&^abc' );

        result= Strings.removeRange( '123*&^abc', null, undefined );
        expect( result ).toBe( '123*&^abc' );

        result= Strings.removeRange( '123*&^abc', new Date(), function(){});
        expect( result ).toBe( '123*&^abc' );

        result= Strings.removeRange( '123*&^abc', NaN, true );
        expect( result ).toBe( '123*&^abc' );
    });

    it("should return string without changes if absolute offset is greater than the length of the string", function(){
        result= Strings.removeRange( 123, 10 );
        expect( result ).toBe( '123' );

        result= Strings.removeRange( 123, -10 );
        expect( result ).toBe( '123' );
    });

    it("should return string unchanged if amount is valid, but offset is invalid", function(){
        result= Strings.removeRange( 123, null, 2 );
        expect( result ).toBe( '123' );

        result= Strings.removeRange( 123, true, 1 );
        expect( result ).toBe( '123' );

        result= Strings.removeRange( 123, 0, 1 );
        expect( result ).toBe( '123' );
    });

    it("should return string with 1 character removed at offset if offset is valid and no amount is given", function(){
        result= Strings.removeRange( 123, 1 );
        expect( result ).toBe( '23' );

        result= Strings.removeRange( 123, '1px' );
        expect( result ).toBe( '23' );

        result= Strings.removeRange( 123, 2 );
        expect( result ).toBe( '13' );

        result= Strings.removeRange( 123, -1 );
        expect( result ).toBe( '12' );

        result= Strings.removeRange( 123, '-1px' );
        expect( result ).toBe( '12' );
    });

    it("should return string with 'amount' characters removed if all arguments are valid", function(){
        result= Strings.removeRange( 123, 1, 1 );
        expect( result ).toBe( '23' );

        result= Strings.removeRange( 123, 2, 2 );
        expect( result ).toBe( '1' );

        result= Strings.removeRange( 123, -2, 2 );
        expect( result ).toBe( '1' );

        result= Strings.removeRange( '123456789', -2, 2 );
        expect( result ).toBe( '1234567' );

        result= Strings.removeRange( '123456789', 4, 3 );
        expect( result ).toBe( '123789' );
    });

    it("should return a empty string if offset points to the first character and amount is greater than the length of the string", function(){
        result= Strings.removeRange( '123456789', 1, 30 );
        expect( result ).toBe( '' );

        result= Strings.removeRange( '123456789', -9, 30 );
        expect( result ).toBe( '' );

        result= Strings.removeRange( '123456789', '-9px', '30ms' );
        expect( result ).toBe( '' );
    });

    it("should return the string unchanged if amount is less than 1", function(){
        result= Strings.removeRange( '123456789', -9, 0 );
        expect( result ).toBe( '123456789' );

        result= Strings.removeRange( '123456789', -9, -3 );
        expect( result ).toBe( '123456789' );

    });
});

describe("removePos( string, position1, ..., positionN )", function() {

    testNoOrInvalidStringArguments( Strings.removePos );

    it("should return string without changes if no other valid arguments are given", function(){

        result= Strings.removePos( 'nothing removed' );
        expect( result ).toBe( 'nothing removed' );

        result= Strings.removePos( 123 );
        expect( result ).toBe( '123' );

        result= Strings.removePos( '123*&^abc' );
        expect( result ).toBe( '123*&^abc' );

        result= Strings.removePos( '123*&^abc', null, undefined );
        expect( result ).toBe( '123*&^abc' );

        result= Strings.removePos( '123*&^abc', new Date(), function(){});
        expect( result ).toBe( '123*&^abc' );

        result= Strings.removePos( '123*&^abc', NaN, true );
        expect( result ).toBe( '123*&^abc' );
    });

    it("should return string with single characters at positions removed", function(){
        result= Strings.removePos( 123, 1, -1 );
        expect( result ).toBe( '2' );

        result= Strings.removePos( 12345, 2, 4 );
        expect( result ).toBe( '135' );

        result= Strings.removePos( 12345, '2px', '4px' );
        expect( result ).toBe( '135' );
    });
});

describe("remove( string, toRemove )", function() {

    testNoOrInvalidStringArguments( Strings.remove );

    it("should return string without changes if no other valid arguments are given", function(){
        result= Strings.remove( 'nothing removed' );
        expect( result ).toBe( 'nothing removed' );

        result= Strings.remove( 123 );
        expect( result ).toBe( '123' );

        result= Strings.remove( '123*&^abc' );
        expect( result ).toBe( '123*&^abc' );

        result= Strings.remove( '123*&^abc', null, undefined );
        expect( result ).toBe( '123*&^abc' );

        result= Strings.remove( '123*&^abc', new Date(), function(){});
        expect( result ).toBe( '123*&^abc' );

        result= Strings.remove( '123*&^abc', NaN, true );
        expect( result ).toBe( '123*&^abc' );
    });

    it("should return string without changes if 'toRemove' is not found in string", function(){
        result= Strings.remove( 'nothing removed', 123, 1, 2, 3 );
        expect( result ).toBe( 'nothing removed' );

        result= Strings.remove( 'nothing removed', 'q', 'word', 'whatever' );
        expect( result ).toBe( 'nothing removed' );


    });

    it("should return string with characters or words removed similar to 'toRemove' arguments", function(){

        result= Strings.remove( 12345, 2, 4 );
        expect( result ).toBe( '135' );

        result= Strings.remove( 12345, 2, 0 );
        expect( result ).toBe( '1345' );

        result= Strings.remove( 'why am I doing this?', 'ignorde', 3, ' doing ', 'this');
        expect( result ).toBe( 'why am I?' );

        result= Strings.remove( 'why am I doing this?', 'a', 'i', 'o', 'y' );
        expect( result ).toBe( 'wh m I dng ths?' );
    });
});

describe("startsWith( string, start )", function() {

    it("should return false if invalid or no argument is given", function(){
        result= Strings.startsWith();
        expect( result ).toBe( false );

        result= Strings.startsWith( NaN );
        expect( result ).toBe( false );

        result= Strings.startsWith( ['A'] );
        expect( result ).toBe( false );

        result= Strings.startsWith( 0 );
        expect( result ).toBe( false );

        result= Strings.startsWith( null );
        expect( result ).toBe( false );

        result= Strings.startsWith( function(){} );
        expect( result ).toBe( false );
    });

    it("should return false if a valid string is given, but no start", function(){
        result= Strings.startsWith( 'valid string' );
        expect( result ).toBe( false );

        result= Strings.startsWith( 123 );
        expect( result ).toBe( false );
    });

    it("should return false if string doesn\'t start with start", function(){
        result= Strings.startsWith( 'valid string', 'alid' );
        expect( result ).toBe( false );

        result= Strings.startsWith( 'valid string', 'valor' );
        expect( result ).toBe( false );

        result= Strings.startsWith( 123, 2 );
        expect( result ).toBe( false );

        result= Strings.startsWith( 123, '1px' );
        expect( result ).toBe( false );
    });

    it("should return true if string starts with start", function(){
        result= Strings.startsWith( 123, 1 );
        expect( result ).toBe( true );

        result= Strings.startsWith( 123, '1' );
        expect( result ).toBe( true );

        result= Strings.startsWith( 'this is a start', 'this' );
        expect( result ).toBe( true );

        result= Strings.startsWith( '#$% should work too', '#$%' );
        expect( result ).toBe( true );

        result= Strings.startsWith( ' a space should work too', ' ' );
        expect( result ).toBe( true );

        result= Strings.startsWith( '\t or a tab', '\t' );
        expect( result ).toBe( true );
    });

});


describe("endsWith( string, end )", function() {

    it("should return false if invalid or no argument is given", function(){
        result= Strings.endsWith();
        expect( result ).toBe( false );

        result= Strings.endsWith( NaN );
        expect( result ).toBe( false );

        result= Strings.endsWith( ['A'] );
        expect( result ).toBe( false );

        result= Strings.endsWith( 0 );
        expect( result ).toBe( false );

        result= Strings.endsWith( null );
        expect( result ).toBe( false );

        result= Strings.endsWith( function(){} );
        expect( result ).toBe( false );
    });

    it("should return false if a valid string is given, but no end", function(){
        result= Strings.endsWith( 'valid string' );
        expect( result ).toBe( false );

        result= Strings.endsWith( 123 );
        expect( result ).toBe( false );
    });

    it("should return false if string doesn\'t end with end", function(){
        result= Strings.endsWith( 'valid string', 'strin' );
        expect( result ).toBe( false );

        result= Strings.endsWith( 'valid string', 'king' );
        expect( result ).toBe( false );

        result= Strings.endsWith( 123, 2 );
        expect( result ).toBe( false );

        result= Strings.endsWith( 123, '1px' );
        expect( result ).toBe( false );
    });

    it("should return true if string ends with end", function(){
        result= Strings.endsWith( 123, 3 );
        expect( result ).toBe( true );

        result= Strings.endsWith( 123, '3' );
        expect( result ).toBe( true );

        result= Strings.endsWith( 'this is a start', 'start' );
        expect( result ).toBe( true );

        result= Strings.endsWith( 'should work too^&*', '^&*' );
        expect( result ).toBe( true );

        result= Strings.endsWith( 'a space should work too ', ' ' );
        expect( result ).toBe( true );

        result= Strings.endsWith( 'or a tab\t', '\t' );
        expect( result ).toBe( true );
    });
});

describe("wrap( prepend, append )", function() {

    it("should return a function in any case", function(){
        result= typeof Strings.wrap();
        expect( result ).toBe( 'function'  );

        result= typeof Strings.wrap( function(){}, 100 );
        expect( result ).toBe( 'function'  );

        result= typeof Strings.wrap( 100, 100, null );
        expect( result ).toBe( 'function'  );

        result= typeof Strings.wrap( null, NaN );
        expect( result ).toBe( 'function'  );

        result= typeof Strings.wrap( new Date(), {});
        expect( result ).toBe( 'function'  );

        result= typeof Strings.wrap( [], [] );
        expect( result ).toBe( 'function'  );
    });

    testNoOrInvalidStringArguments( Strings.wrap() );

    it("wrapper should default return an empty string if wrap is initialized with no arguments", function(){
        result= Strings.wrap()();
        expect( result ).toBe( '' );
    });

    it("wrapper should return the argument given if it is valid, and wrap is initialized with no arguments", function(){
        result= Strings.wrap()( 1 );
        expect( result ).toBe( '1' );

        result= Strings.wrap()( 'only 1 message' );
        expect( result ).toBe( 'only 1 message' );
    });

    it("wrapper should ignore the argument given if it is invalid, prepended and appended by the wrapper", function(){
        result= Strings.wrap( 'your message -> ')( [] );
        expect( result ).toBe( 'your message -> ' );

        result= Strings.wrap( 'your message -> ', '!')( null );
        expect( result ).toBe( 'your message -> !' );

        result= Strings.wrap( 'your message -> ', 0)( NaN );
        expect( result ).toBe( 'your message -> 0' );
    });

    it("wrapper should return the argument given if it is valid, prepended and appended by the wrapper", function(){
        result= Strings.wrap( 'your message -> ', '!' )( 1 );
        expect( result ).toBe( 'your message -> 1!' );

        result= Strings.wrap( 0, 0 )( ' hi ' );
        expect( result ).toBe( '0 hi 0' );

        result= Strings.wrap( 0, 0 )( 1 );
        expect( result ).toBe( '010' );

        result= Strings.wrap( 'a', 'z' )( ' to ' );
        expect( result ).toBe( 'a to z' );
    });

    // will try to add more tests for wrapper soon..
});

// Strings dynamic part to be added soon..


