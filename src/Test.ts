export interface ITest
{
	title: string
	
	run(): void
}

export class Test implements ITest
{
	public readonly block: () => void
	public readonly title: string
	
	
	constructor( { title, block }: { title: string, block: () => void } )
	{
		this.block = block
		this.title = title
		
	}
	
	
	run(): void
	{
		this.block()
	}
}