import { AssertionError } from "./AssertionError"
import isEqual from "lodash.isequal"




export class Expectation<T>
{
	private readonly __result: T
	
	
	private constructor( result: T )
	{
		this.__result = result
	}
	
	
	is( expected: T )
	{
		if ( !Object.is( this.__result, expected ) )
			throw new AssertionError( `💩 Expected ${this.__result} to be ${expected}` )
		
		return true
	}
	
	
	returns( expected: T )
	{
		if ( !isEqual( this.__result, expected ) )
			throw new AssertionError( `💩 Expected ${this.__result} to match ${expected}` )
		
		return true
	}
	
	
	throws()
	{
		let threw = false
		try {
			(this.__result as any as Function)()
		} catch ( e ) {
			threw = true
		}
		
		if ( !threw )
			throw new AssertionError( `💩 Expected ${this.__result} to throw. But it did not` )
		
		return threw
	}
	
	
	static for<T>( result: T )
	{
		return new Expectation<T>( result )
	}
}