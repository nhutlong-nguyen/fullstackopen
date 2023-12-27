import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchInput from './components/SearchInput';
import CountryList from './components/CountryList';
import CountryDetail from './components/CountryDetail';
import ErrorMessage from './components/ErrorMessage';

const App = () => {
  const [input, setInput] = useState('');
  const [allCountries, setAllCountries] = useState([]); 
  const [filteredCountries, setFilteredCountries] = useState([]); 
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [error, setError] = useState(null);

  //used only once
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data);
      })
      .catch(error => {
        setError('Failed to fetch countries');
      });
  }, [])  

  useEffect(() => {
    if (input) {
      const matchedCountries = allCountries.filter(country =>
        country.name.common.toLowerCase().includes(input.toLowerCase())
      );
      if (matchedCountries.length > 10) {
        setError('Too many matches, specify another filter');
        setFilteredCountries([]);
        setSelectedCountry(null);
      } else if (matchedCountries.length === 1) {
        setError(null);
        setFilteredCountries([]); // Clear the filteredCountries array
        setSelectedCountry(matchedCountries[0]); // Set the selectedCountry to the matched object
      } else {
        setError(null);
        setFilteredCountries(matchedCountries);
        setSelectedCountry(null);
      }
    } else {
      setFilteredCountries([]);
      setSelectedCountry(null);
      setError(null);
    }
  }, [input, allCountries]);
  
  const handleInputChange = (event) => {
    console.log('Input changing to:', event.target.value);
    setInput(event.target.value);
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };
  
  return (
    <div>
      <SearchInput
        value={input}
        onChange={handleInputChange}
        placeholder="Enter country name"
      />
      <ErrorMessage message={error} />
      {selectedCountry ? (
        <CountryDetail country={selectedCountry} />
      ) : (
        <CountryList countries={filteredCountries} onShowCountry={handleShowCountry}/>
      )}
    </div>
  );

}

export default App;
