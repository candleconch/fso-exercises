import { useEffect, useState } from "react";
import axios from 'axios';
import "./App.css";
const Input = ({value, onChange}) => {
  console.log(value)
  
  return (
    <>
      <label>
        find countries:
        <input type="text" value={value} onChange={onChange}/>
      </label>
    </>
  );
};

const Country = ({country}) => {
  if (Object.keys(country).length === 0) return null;
  console.log(country)
  
  return (
  <div className="country">
    <h1>{country.name.common}</h1>
    <p>Capital {country.capital[0]}</p>
    <p>Area {country.area}</p>
    <h2>Languages</h2>
    <ul>
      {Object.values(country.languages).map(l => {
        return <li key={l}>{l}</li>
      })}
    </ul>
    <img src={country.flags["svg"]}/>
  </div>
  )
}
const Output = ({ countries, country }) => {
  const multipleCountries = (<div>
      {countries.map((country) => {
        return <p key={country.name.official}>{country.name.common}</p>;
      })}
    </div>);
    const output = countries.length > 1 ? multipleCountries
    : <Country country={country}/>
  return countries.length > 10 ? (
    <p>Too many matches, specify another filter</p>
  ) : output;
};
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState({})
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState([]);
  
  useEffect(()=>{
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then(response => {
      //console.log(response.data)
      setCountries(response.data)
      
    })
  
  },[]);

  useEffect(() => {
    if (shown.length === 1) {
      console.log('requesting ', shown[0].name.common)
      const countryName = shown[0].name.common;
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
      .then(response => {
       // console.log(response.data)
        
        setCountry(response.data)
    })
  } else {
    setCountry({})
  }
  },[shown])

    const handleChange = (e) => {
    const newValue = e.target.value;
    setQuery(newValue);
    if (newValue.trim() === "") {
      setShown([]);
      return;
    }
    setShown(countries.filter(country => country.name.common.toLowerCase().includes(newValue)))
  };
  return (
    <>
      <Input value={query} onChange={handleChange} />
      {query ?
      <Output countries={shown} country={country}/> : <p>Country info will show up here.</p>}
    </>
  );
}

export default App;
