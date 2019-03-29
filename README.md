# Dumb test runner
(do not use in production, obviously)

This is a playground

Current syntax is:
```typescript
verify( 5 ).returns( 5 )
verify( 5 ).returns( 2 ) // throws

verify( someObject ).is( someObject ) 
verify( someObject ).is( otherObject ) // throws

verify( () => {throw new Error()}).throws(  )
verify( () => null).throws(  ) // throws
```

## Todos
- Move to a data model instead of try/catch flow control
	- Test report it's status
	- Suite report it's status and it's tests)
- New 🐒 syntax: 
	- someVar.is(5) 
	- (()=>null).return(10)
