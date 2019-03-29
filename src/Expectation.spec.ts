import { Expectation } from "./Expectation"




const randomObject    = { key: "value" },
      differentObject = { not: "a-match" },
      randomArray     = [ "A", 1 ],
      differentArray  = [ "B", 2 ]

describe( `Expectation`, () => {
	
	describe( `is()`, () => {
		describe.each`
	  Value            | Expected                  | Status
	  ${5}              | ${5}                     | ${"passes"}
	  ${5}              | ${3}                     | ${"fails"}
	  
	  ${"Word"}         | ${"Word"}                | ${"passes"}
	  ${"Word"}         | ${"Other"}               | ${"fails"}
	  
	  ${randomObject}   | ${randomObject}          | ${"passes"}
	  ${randomObject}   | ${{ ...randomObject }}   | ${"fails"}
	  ${randomObject}   | ${differentObject}       | ${"fails"}
	  
	  ${randomArray}    | ${randomArray}           | ${"passes"}
	  ${randomArray}    | ${[ ...randomArray ]}    | ${"fails"}
	  ${randomArray}    | ${differentArray}        | ${"fails"}
	`( "value.is(expected)", setupTestsFor( "is" ) )
	} )
	
	
	
	describe( `returns()`, () => {
		describe.each`
	  Value            | Expected                  | Status
	  ${5}              | ${5}                     | ${"passes"}
	  ${5}              | ${3}                     | ${"fails"}
	  
	  ${"Word"}         | ${"Word"}                | ${"passes"}
	  ${"Word"}         | ${"Other"}               | ${"fails"}
	  
	  ${randomObject}   | ${randomObject}          | ${"passes"}
	  ${randomObject}   | ${{ ...randomObject }}   | ${"passes"}
	  ${randomObject}   | ${differentObject}       | ${"fails"}
	  
	  ${randomArray}    | ${randomArray}           | ${"passes"}
	  ${randomArray}    | ${[ ...randomArray ]}    | ${"passes"}
	  ${randomArray}    | ${differentArray}        | ${"fails"}
	`( "value.returns(expected)", setupTestsFor( "returns" ) )
	} )
	
	describe( `throws()`, () => {
		test( `Succcess`, () => {
			let functionThatThrows = () => {
				throw new Error()
			}
			
			passes( Expectation.for( functionThatThrows ).throws() )
		} )
		
		test( "Failing expectation throws", () => {
			let functionThatDoesntThrow = () => null
			
			fails( () => Expectation.for( functionThatDoesntThrow ).throws() )
		} )
	} )
} )


function passes( expectation: boolean )
{
	expect( expectation ).toBe( true )
	
}


function fails( expectation: Function )
{
	expect( expectation ).toThrow()
	
}


function setupTestsFor( keyword: keyof Expectation<any> )
{
	return ( { Value, Expected, Status }: { Value: any, Expected: any, Status: "passes" | "fails" } ) => {
		
		test( makeTestTitle( keyword, Value, Expected, Status ), () =>
			runExpectationForStatus(
				Status,
				() => Expectation.for( Value )[ keyword ]( Expected ),
			) )
	}
	
	
}


function runExpectationForStatus( status: "passes" | "fails", expectation: () => boolean )
{
	return status === "passes" ?
	       passes( expectation() ) :
	       fails( () => expectation() )
	
	
}


function makeTestTitle( keyword: keyof Expectation<any>, value: string, expected: string, status: string )
{
	return `${value}.${keyword}(${expected}) ${status}`
	
	
}

