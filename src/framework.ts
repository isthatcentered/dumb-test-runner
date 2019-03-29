import { Expectation } from "./Expectation"




class Test
{
	private __config: { title: string; block: () => void }
	
	
	constructor( config: { title: string, block: () => void } )
	{
		this.__config = config
	}
	
	
	run()
	{
		try {
			this.__config.block()
			console.log( " 👍 ", this.__config.title )
			// ✓ ✗
		} catch ( e ) {
			console.log( " 💩 ", this.__config.title )
			console.log( e )
		}
	}
}

const verify = <T>( result: T ) => {
	return Expectation.for( result )
}

const test = ( title: string, block: () => void ) =>
	new Test( { title, block } )


test( "Logs a success", () => {
	verify( 5 ).returns( 5 )
} ).run()

test( "Logs an error", () => {
	verify( 5 ).returns( 4 )
} ).run()

// @todo: syntax 5.returns(2)