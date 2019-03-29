import { Test } from "./Test"




describe( `Test`, () => {
	test( `Calls it's block on run()`, () => {
		const block = jest.fn()
		
		new Test( { title: "Title", block } ).run()
		
		expect( block ).toHaveBeenCalled()
	} )
} )