import Person from './Person';

const Persons = ( {filteredPersons, onDelete} ) => {
    return (
      <ul>
        {filteredPersons.map(person =>
          <Person key={person.id} id={person.id} name={person.name} number={person.number} onDelete={onDelete}/>
        )}
      </ul>
    );
};

export default Persons;