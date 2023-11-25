const PersonForm = ( {addPerson, newName, handleNameChange, newNumber, handleNumberChange } ) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name:
        <input
          value={newName}
          onChange={handleNameChange}
          type="text"
        />
      </div>
      <div>
        number:
        <input
          value={newNumber}
          onChange={handleNumberChange}
          type="text"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}; 

export default PersonForm;