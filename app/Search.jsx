import React from "react";
import "./Search.css"
import {useState} from "react";

const Search = () => {
  let [inputValue, setInputValue] = useState("");
  let [data, setData] = useState(null);
  

  // fetch API with the "value" (inputValue) typed
  const handleClick = (value) => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`)
      .then(response => {
        if(!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse JSON response
      })
      .then(data => setData(data))
      .catch(error => {
        console.log(`There are a problem with the fetch operation: ${error}`);
      });
  }

  return (
      (data ? 
        ( 
          // Render the page after return API "word"
          <div className="search-container">
            <h1>Search Page</h1>
            <div className="search-input-group">
              <input 
                type="text" 
                placeholder="type a word"
                onInput={(e) => setInputValue(e.target.value)} />
              <button onClick={() => handleClick(inputValue)}>Search</button>
            </div>
            <div className="results-container">
              {/* Render title with the "word" required*/}
              <div className="word-entry">
                <h2>{data[0].word}</h2>
                
                {/* Render "speechs" and "definitions" */}
                <div className="meaning-section">
                {
                  data.map(element => (
                    element.meanings.map((elementMeaning, indexMeaning) => (
                      <div key={indexMeaning}>
                        <h3>{elementMeaning.partOfSpeech}</h3>
                        <div key={indexMeaning} className="definition-item">{elementMeaning.definitions.map((elementDefinition) => (
                          <p>{elementDefinition.definition}</p>
                        ))}</div>
                      </div>
                    ))
                  ))
                }  
                </div>
              </div>  
            </div>
          </div>
        )
        : 
        (
          // Default page
          <div className="search-container">
            <div className="search-input-group">
              <h1>Search Page</h1>
              <input 
                type="text" 
                placeholder="type a word"
                onInput={(e) => setInputValue(e.target.value)}/>
              <button onClick={() => handleClick(inputValue)}>Search</button>
            </div>
          </div>
        )
      )
    );
};

export default Search;
