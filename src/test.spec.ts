interface Test
{
	title: string
	
	run(): void
}


class Runner
{
	private __reporter: Reporter
	
	
	constructor( reporter: Reporter )
	{
		this.__reporter = reporter
	}
	
	
	private __tests: Test[] = []
	
	
	register( test: Test )
	{
		this.__tests.push( test )
	}
	
	
	run(): void
	{
		this.__tests.forEach( t => {
			
			try {
				t.run()
				this.__reporter.onTestSuccess( t.title )
			} catch ( e ) {
				this.__reporter.onTestFailure( t.title, e.stack )
			}
		} )
	}
}

interface Reporter
{
	onTestFailure( title: string, stack: string ): any;
	
	onTestSuccess( title: string ): void
}


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


function makeSuccessfulTest( title: string ): Test
{
	return {
		title,
		run: jest.fn(),
	}
}


function makeFailedTest( title: string ): Test
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
