import { Expectation } from "./Expectation"




const verify = <T>( result: T ) => {
	return Expectation.for( result )
}


verify( 5 ).is( 5 )

verify( () => verify( 5 ).is( 4 ) ).throws()