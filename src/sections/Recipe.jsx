import React from 'react'
import ReactMarkdwon from "react-markdown"


const Recipe = ({ recipe }) => {
    return (
        <section className='recipe'>
            <h1>Chef Mark recommends:</h1>
            <ReactMarkdwon>{recipe}</ReactMarkdwon>
        </section>
    )
}

export default Recipe