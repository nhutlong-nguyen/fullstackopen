const Person = ({ id, name, number, onDelete }) => {
    return (
      <>
        <li>
          {name} {number} 
          <button onClick={() => onDelete(id)}>delete</button>
        </li>
      </>
    );
};

export default Person;
        