
const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default SearchInput;
