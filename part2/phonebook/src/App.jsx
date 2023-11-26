import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter  from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';


const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      });
  }, []);


  const addPerson = (event) => {
    event.preventDefault();

    // Check if the newName already exists in the persons array
    const nameExists = persons.some(person => person.name.toLowerCase() === newName.toLocaleLowerCase());
    
    if (nameExists) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber, id: persons.length + 1};
      setPersons(persons.concat(newPerson));
    }

    //clear the input field after submission
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  //Using .includes() method allows partial matches
  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange}/>

      <h3>Add a new</h3>

      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      /> 

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} /> 
    </div>
  );
};

export default App;

          
