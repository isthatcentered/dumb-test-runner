import "jest-then"



// can call anything
// can get anything
// returns name on tostring
// returns origininame.property on get[key].tostring
// if provided value !== primitive, return procy
// if provided value = primitive, fetch target item

function stub( identifier: string )
{
	return identifier
}


describe( `toString()`, () => {
	test( `Returns name of object if provided`, () => {
		const identifier = "IDENTIFIER"
		
		expect( stub( identifier ).toString() ).toEqual( identifier )
	} )
	
	test( `Returns nameOfObject.property when getting a sub property`, () => {
	
	} )
	
	test( `Returns fallback value if available (and not object?)`, () => {
	
	} )
} )
