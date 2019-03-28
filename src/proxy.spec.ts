import "jest-then"



// can call anything
// can get anything
// returns name on tostring
// returns origininame.property on get[key].tostring
// if provided value !== primitive, return procy
// if provided value = primitive, fetch target item

function stub<T>( identifier: string )
{
	return new Proxy( function () {
	
	}, {
		get( target, key, receiver ): any
		{
			console.log( "get:::", key, identifier.toString() )
			
			if ( key === "toString" )
				return () => identifier.toString()
			
			return identifier
		},
		apply()
		{
		
		},
	} )
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
