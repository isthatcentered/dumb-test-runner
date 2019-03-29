import { Reporter, Runner } from "./Runner"
import { ITest } from "./Test"




describe( `Runner`, () => {
	test( `Runs each registered tests`, () => {
		const runner = new Runner( makeFakeReporter() ),
		      test1  = makeFakeTest( "Test 1" ),
		      test2  = makeFakeTest( "Test 2" )
		
		runner.register( test1 )
		runner.register( test2 )
		
		runner.run()
		
		expect( test1.run ).toHaveBeenCalled()
		expect( test2.run ).toHaveBeenCalled()
	} )
	
	test( `Tells reporter about test success`, () => {
		const reporter: Reporter = makeFakeReporter(),
		      runner             = new Runner( reporter ),
		      _test              = makeSuccessfulTest( "Title" )
		
		runner.register( _test )
		
		runner.run()
		
		expect( reporter.onTestSuccess ).lastCalledWith( _test.title )
	} )
	
	test( `Tells reporter about test failure`, () => {
		const reporter: Reporter = makeFakeReporter(),
		      runner             = new Runner( reporter ),
		      _test              = makeFailedTest( "Title" )
		
		runner.register( _test )
		
		runner.run()
		
		expect( reporter.onTestFailure ).toHaveBeenCalledWith( _test.title, expect.anything() )
	} )
} )


function makeFakeReporter(): Reporter
{
	return {
		onTestSuccess: jest.fn(),
		onTestFailure: jest.fn(),
	}
}


function makeSuccessfulTest( title: string ): ITest
{
	return {
		title,
		run: jest.fn(),
	}
}


function makeFailedTest( title: string ): ITest
{
	return {
		title,
		run()
		{
			throw new Error( "Error" )
		},
	}
}


function makeFakeTest( title: string )
{
	return makeSuccessfulTest( title )
}
