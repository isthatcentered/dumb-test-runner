export class Test
{
	private readonly __block: () => void
	private readonly __title: string
	
	
	constructor( { title, block }: { title: string, block: () => void } )
	{
		this.__block = block
		this.__title = title
		
	}
	
	
	run(): void
	{
		this.__block()
	}
}