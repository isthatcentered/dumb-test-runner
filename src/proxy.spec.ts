import "jest-then"


// can be identified
// can get anything
// can call anything
// returns name on tostring
// returns origininame.property on get[key].tostring
// if provided value !== primitive, return procy
// if provided value = primitive, fetch target item

function stub<T>( identifier: string ): T
{
	return new Proxy( function () {
	
	}, {
		get( target, key, receiver ): any
		{
			console.log( "get:::", key)
			
			if ( key === "toString" )
				return () => identifier.toString()
			
			return stub( `${identifier}.${key.toString()}` )
		},
		apply()
		{
		
		},
	} ) as any as T // @todo: fix that / can it be ?
}


describe( `toString()`, () => {
	interface randomObject
	{
		nested: {
			nestedLevel2: {
				property: string
			}
			property: number
		}
		property: number
	}
	
	test( `Returns name of object if provided`, () => {
		const identifier = "identifier"
		
		expect( stub<randomObject>( identifier ).toString() ).toEqual( identifier )
	} )
	
	test( `Returns nameOfObject.property when getting a sub property`, () => {
		const identifier = "identifier",
		      _stub      = stub<randomObject>( identifier )
		
		expect( _stub.nested.nestedLevel2.property.toString() ).toEqual( `${identifier}.nested.nestedLevel2.property` )
	} )
	
	test( `Returns fallback value if available (and not object?)`, () => {
	
	} )
} )
