const Filter = ( {filter, handleFilterChange}) => {
    return(
     <div>
       filter shown with 
       <input
       value={filter}
       onChange={handleFilterChange}
       type="text"
       /> 
     </div>
    
    );
};

export default Filter;