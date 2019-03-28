import "jest-then"


// can be identified
// can get anything
// can call anything
// returns name on tostring
// returns origininame.property on get[key].tostring
// if provided value !== primitive, return procy
// if provided value = primitive, fetch target item


function stub<T>( fallback: Partial<T> ): T
function stub<T>( identifier: string ): T
function stub<T>( fallback: string | Partial<T> ): T
{
	// if ( typeof fallback === "string" )
	// 	return {} as any as T
	
	return new Proxy( () => null, {
		get( target, key, receiver ): any
		{
			if ( typeof fallback !== "string" && fallback.hasOwnProperty( key ) )
				return (fallback as any)[ key ] // won't work for nested
			
			if ( key === "toString" )
				return () => fallback.toString()
			
			return stub( `${fallback}.${key.toString()}` )
		},
		apply()
		{
		
		},
	} ) as any as T // @todo: fix that / can it be ?
}


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

describe( `toString()`, () => {
	test( `Returns name of object if provided`, () => {
		const identifier = "identifier"
		
		expect( stub<randomObject>( identifier ).toString() ).toEqual( identifier )
	} )
	
	test( `Returns nameOfObject.property when getting a sub property`, () => {
		const identifier = "identifier",
		      _stub      = stub<randomObject>( identifier )
		
		expect( _stub.nested.nestedLevel2.property.toString() ).toEqual( `${identifier}.nested.nestedLevel2.property` )
	} )
	
	xtest( `Returns fallback value if available (and not object?)`, () => {
	} )
} )

describe( `Fallback value`, () => {
	test( `Returns fallback value if provided`, () => {
		expect( stub<randomObject>( { property: 5 } ).property ).toEqual( 5 )
	} )
} )
