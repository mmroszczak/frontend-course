const Persons = ( {personsToShow, deleteHandler} ) => {
    return(
      
      personsToShow.map(person => 
        <p key={person.name}>
  
        {person.name} {person.number}
        <button onClick={() => deleteHandler(person.id)}>Delete</button>
  
        </p>
      )
  
    )
  }

  export default Persons