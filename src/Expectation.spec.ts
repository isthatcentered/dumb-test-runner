import { Expectation } from "./Expectation"




describe( `Expectation`, () => {
	describe( `is()`, () => {
		test( `Succcess`, () => {
			let object = { key: "value" },
			    array  = [ 1, "2" ]
			
			passes( exp( 5 ).is( 5 ) )
			passes( exp( "word" ).is( "word" ) )
			passes( exp( object ).is( object ) )
			passes( exp( array ).is( array ) )
		} )
		
		test( "Failing expectation throws", () => {
			fails( () => exp( 5 ).is( 1 ) )
			fails( () => exp( "word" ).is( "other word" ) )
			fails( () => exp( { key: "value" } ).is( { key: "value" } ) )
			fails( () => exp( [ 1, "2" ] ).is( [ 1, "2" ] ) )
		} )
	} )
	
	describe( `throws()`, () => {
		test( `Succcess`, () => {
			let functionThatThrows = () => {
				throw new Error()
			}
			
			passes( exp( functionThatThrows ).throws() )
		} )
		
		test( "Failing expectation throws", () => {
			let functionThatDoesntThrow = () => null
			
			fails( () => exp( functionThatDoesntThrow ).throws() )
		} )
	} )
	
	describe( "returns()", () => {
		test( "Success", () => {
			let object = { key: "value" },
			    array  = [ 1, "2" ]
			
			passes( exp( 5 ).returns( 5 ) )
			passes( exp( "word" ).returns( "word" ) )
			
			passes( exp( { key: "value" } ).returns( { key: "value" } ) )
			passes( exp( [ 1, "2" ] ).returns( [ 1, "2" ] ) )
			
			passes( exp( object ).returns( object ) )
			passes( exp( array ).returns( array ) )
		} )
		
		test( `Failing expectation throws`, () => {
			fails( () => exp( { key: "value" } ).returns( { key: "other-value" } ) )
			fails( () => exp( [ 1, "2" ] ).returns( [ "A", "B" ] ) )
		} )
	} )
} )



function exp<T>( value: T ): Expectation<T>
{
	return Expectation.for( value )
}


function passes( expectation: boolean )
{
	expect( expectation ).toBe( true )
	
}


function fails( expectation: Function )
{
	expect( expectation ).toThrow()
	
}