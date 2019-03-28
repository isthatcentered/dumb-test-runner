class AssertionError extends Error
{
	constructor( message: string )
	{
		super( message )
		this.name = `Assertion error`
	}
}

class Expectation<T>
{
	private readonly __result: T
	
	
	private constructor( result: T )
	{
		this.__result = result
	}
	
	
	is( expected: T )
	{
		if ( this.__result !== expected )
			throw new AssertionError( `💩 Expected ${this.__result} to be ${expected}` )
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
	}
	
	
	static for<T>( result: T )
	{
		return new Expectation<T>( result )
	}
}

const verify = <T>( result: T ) => {
	return Expectation.for( result )
}


verify( 5 ).is( 5 )

verify( () => verify( 5 ).is( 4 ) ).throws()