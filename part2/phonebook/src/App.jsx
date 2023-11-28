import { useState, useEffect } from 'react';
import Filter  from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import personService from './services/persons';
import Notification from './components/Notification';


const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, []);

  // This will return an array of filtered persons (.includes() method allows partial matches) 
  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  //Used to add or update a person 
  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
  
    if (existingPerson) {
      const confirmUpdate = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`);
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService
          .updatePerson(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson));
            setNewName('');
            setNewNumber('');
            setMessage(`Changed ${updatedPerson.name}'s number successfully`);
            setMessageType('success');
            setTimeout(() => {
              setMessage(null)
            }, 5000) // Clear the message after 5 seconds
          })
          .catch(error => {
            console.log("Error updating the person:", error);
            if (error.response && error.response.status === 404) {
              setMessage(`Information of ${existingPerson.name} has already been removed from server`);
              setMessageType('error'); // Set the notification type to error
            } else {
              // Handle other types of errors
              setMessage('An error occurred');
              setMessageType('error');
            }
            setTimeout(() => {
              setMessage(null);
            }, 5000); // Clear the message after 5 seconds
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService
        .createPerson(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setMessage(`Added ${returnedPerson.name} successfully`);
          setMessageType('success');
          setTimeout(() => {
            setMessage(null)
          }, 5000) // Clear the message after 5 seconds
        })
        .catch(error => {
          console.log("Error adding the person:", error);
        });
    }
  };
  
  // Used when deleting a person in the phonebook
  const handleDelete = id => {
    const person = persons.find(p => p.id === id);
    const confirmDelete = window.confirm(`Delete ${person.name}?`);
    
    if (confirmDelete) {
      personService
        .deletePerson(id)
        .then(() => {
          // Only update the state if the delete request was successful
          setPersons(persons.filter(p => p.id !== id));
        })
        .catch(error => {
          console.log("Error deleting the person:", error);
        })
    }
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />

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

      <Persons filteredPersons={filteredPersons} onDelete={handleDelete}/> 
    </div>
  );
};

export default App;

          
