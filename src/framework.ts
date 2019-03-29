import { Expectation } from "./Expectation"
import { Test } from "./Test"




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