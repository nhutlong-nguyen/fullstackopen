import Person from './Person';

const Persons = ( {filteredPersons} ) => {
    return (
      <ul>
        {filteredPersons.map(person =>
          <Person key={person.id} name={person.name} number={person.number} />
        )}
      </ul>
    );
};

export default Persons;