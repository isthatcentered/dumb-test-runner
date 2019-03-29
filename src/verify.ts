import { Expectation } from "./Expectation"




export const verify = <T>( result: T ) => {
	return Expectation.for( result )
}