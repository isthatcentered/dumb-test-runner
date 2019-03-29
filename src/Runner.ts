export interface Test
{
	title: string
	
	run(): void
}

export class Runner
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

export interface Reporter
{
	onTestFailure( title: string, stack: string ): any;
	
	onTestSuccess( title: string ): void
}