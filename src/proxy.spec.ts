import "jest-then"
import { DeepPartial } from "utility-types"


// can be identified
// can get anything
// can call anything
// returns name on tostring
// returns origininame.property on get[key].tostring
// if provided value !== primitive, return procy
// if provided value = primitive, fetch target item


function stub<T>( fallback: DeepPartial<T> ): T
function stub<T>( identifier: string ): T
function stub<T>( fallback: string | DeepPartial<T> ): T
{
	// if ( typeof fallback === "string" )
	
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


function emptyStub<T>( identifier: string ): T
{
	
	return new Proxy( () => null, {
		get( target, key, receiver ): any
		{
			if ( key === "toString" )
				return () => identifier.toString()
			
			return stub( `${identifier}.${key.toString()}` )
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

describe( `EmptyStub`, () => {
	test( `Returns name of object if provided`, () => {
		const identifier = "identifier"
		
		expect( emptyStub<randomObject>( identifier ).toString() ).toEqual( identifier )
	} )
	
	test( `Returns nameOfObject.property when getting a sub property`, () => {
		const identifier = "identifier",
		      stub       = emptyStub<randomObject>( identifier )
		
		expect( stub.nested.nestedLevel2.property.toString() ).toEqual( `${identifier}.nested.nestedLevel2.property` )
	} )
	
	xtest( `Can be called`, () => {
	
	} )
	
	
	xtest( "Assigns a name to function when expecting instead of [Function undefined]", () => {
		console.log( (() => null) )
	} )
} )

/*
describe( `toString()`, () => {
	
	xtest( `Returns fallback value if available (and not object?)`, () => {
	} )
} )

describe( `Fallback value`, () => {
	test( `Returns fallback value if provided`, () => {
		expect( stub<randomObject>( { property: 5 } ).property ).toEqual( 5 )
	} )
	
	test( `Returns (nested) fallback value if provided`, () => {
		expect( stub<randomObject>( { nested: { property: 8 } } ).property ).toEqual( 8 )
	} )
	
} )
*/