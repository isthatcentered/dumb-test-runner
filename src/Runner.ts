import { ITest, Test } from "./Test"




export interface Reporter
{
	onTestFailure( title: string, stack: string ): any;
	
	onTestSuccess( title: string ): void
}

export class Runner
{
	private __reporter: Reporter
	
	
	constructor( reporter: Reporter )
	{
		this.__reporter = reporter
	}
	
	
	private __tests: ITest[] = []
	
	
	register( test: ITest )
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


export function makeTestFunction( runner: Runner ): ( title: string, block: () => void ) => void
{
	return ( title, block ) =>
		runner.register( new Test( { title, block } ) )
}