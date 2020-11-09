import React, { useEffect, useState } from 'react'
//CSS
import "./DictionarySearch.css"


const DictionarySearch = (props) => {

    const [search, setSearch] = useState("")
    const [wordResult, setWordResult] = useState({
        "word": "",
        "definitions": [
            {
                "definition": "",
                "partOfSpeech": ""
            }
        ]
    })
    const [showResult, setShowResult] = useState(false)

    const handleSubmit = data => {
        data.preventDefault()
        setSearch(document.getElementById("input-word").value)
    }

    useEffect(() => {
        fetch(`https://wordsapiv1.p.rapidapi.com/words/${search}/definitions`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "985371e109mshb5666c0424d5dcfp1b7485jsndf2afe5a3591",
                "x-rapidapi-host": "wordsapiv1.p.rapidapi.com"
            }
        }).then (response => response.json())
        .then(response => {
            setWordResult(response);
            setShowResult(true)
        })
        .catch(err => {
            console.error(err);
        })
    }, [search])

    const displayDefinition = wordResult.definitions.map((word) => (
        <>
            <h3>Definition: {word.definition}</h3>
            <h3>Word type: {word.partOfSpeech}</h3>
            <hr />
        </>
    ))
    
    return (
        <div className="dictionary-container">
            <h1>Dictionary App</h1>
            <form onSubmit={handleSubmit} className="input-form">
                <input type="text" 
                    id="input-word" 
                    className="dictionary-input"
                    placeholder="Search for a word..." />
            </form>
            {showResult && 
                <div className="results-container">
                    <h2 className="result-word">{wordResult.word}</h2>
                    <div className="results-meanings">
                        {displayDefinition}
                    </div>
                </div>
            }
        </div>
    )
}

export default DictionarySearch