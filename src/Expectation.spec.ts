import { Expectation } from "./Expectation"




describe( `Expectation`, () => {
	describe( `is()`, () => {
		test( `Succcess`, () => {
			let object = { key: "value" },
			    array  = [ 1, "2" ]
			
			expect( Expectation.for( 5 ).is( 5 ) ).toBe( true )
			expect( Expectation.for( "word" ).is( "word" ) ).toBe( true )
			expect( Expectation.for( object ).is( object ) ).toBe( true )
			expect( Expectation.for( array ).is( array ) ).toBe( true )
		} )
		
		test( "Failing expectation throws", () => {
			expect( () => Expectation.for( 5 ).is( 1 ) ).toThrow()
			expect( () => Expectation.for( "word" ).is( "other word" ) ).toThrow()
			expect( () => Expectation.for( { key: "value" } ).is( { key: "value" } ) ).toThrow()
			expect( () => Expectation.for( [ 1, "2" ] ).is( [ 1, "2" ] ) ).toThrow()
		} )
	} )
	
	describe( `throws()`, () => {
		test( `Succcess`, () => {
			let functionThatThrows = () => {
				throw new Error()
			}
			
			expect( Expectation.for( functionThatThrows ).throws() ).toBe( true )
		} )
		
		test( "Failing expectation throws", () => {
			let functionThatDoesntThrow = () => null
			
			expect( () => Expectation.for( functionThatDoesntThrow ).throws() ).toThrow()
		} )
	} )
	
	describe( "returns()", () => {
		test( "Success", () => {
			let object = { key: "value" },
			    array  = [ 1, "2" ]
			
			expect( Expectation.for( 5 ).returns( 5 ) ).toBe( true )
			expect( Expectation.for( "word" ).returns( "word" ) ).toBe( true )
			
			expect( Expectation.for( { key: "value" } ).returns( { key: "value" } ) ).toBe( true )
			expect( Expectation.for( [ 1, "2" ] ).returns( [ 1, "2" ] ) ).toBe( true )

			expect( Expectation.for( object ).returns( object ) ).toBe( true )
			expect( Expectation.for( array ).returns( array ) ).toBe( true )
		} )
		
		test( `Failing expectation throws`, () => {
			expect( () => Expectation.for( { key: "value" } ).returns( { key: "other-value" } ) ).toThrow()
			expect( () => Expectation.for( [ 1, "2" ] ).returns( [ "A", "B" ] ) ).toThrow()
		} )
	} )
} )