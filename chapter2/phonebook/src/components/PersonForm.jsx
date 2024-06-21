const PersonForm = ( { submitHandler, nameChangeHandler, numberChangeHandler } ) => {
    return(
      <form onSubmit={submitHandler}>
          <div>
            name: <input onChange={nameChangeHandler}/>
          </div>
          <div>
            number: <input onChange={numberChangeHandler}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }

  export default PersonForm