import { makeTestFunction, Reporter, Runner } from "./Runner"
import { verify } from "./verify"




console.clear()
console.log( "[STARTING]\n" )



const reporter: Reporter = {
	onTestFailure( title: string, stack: string ): any
	{
	},
	onTestSuccess( title: string ): void
	{
	},
}

const runner = new Runner( reporter )

const test = makeTestFunction( runner )



test( "Logs a success", () => {
	verify( 5 ).returns( 5 )
} )

test( "Logs an error", () => {
	verify( 5 ).returns( 4 )
} )

// @todo: syntax 5.returns(2)