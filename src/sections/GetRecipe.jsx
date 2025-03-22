import React from 'react'
import Loader from '../components/Loader'

const GenerateRecipe = ({ generateRecipe, isRecipeShown, newRecipe, isGenerating }) => {
    return (
        <div className="get-recipe-container">
            <div>
                {!isRecipeShown ? (
                    <>
                        <h3>Ready for recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </>) : (
                    <>
                        <h3>Ready for a new recipe?</h3>
                        <p>Generate a new recipe</p>
                    </>
                )}
            </div>
            <div className='recipe-buttons'>
                {!isRecipeShown ? <button onClick={generateRecipe}>{isGenerating ? (
                    <>
                        <Loader />
                        Getting...
                    </>
                ) : "Get recipe"}</button> : <button onClick={newRecipe}>New Recipe</button>}
            </div>
        </div>
    )
}

const GetRecipe = ({ ingredientsList, ingredients, generateRecipe, recipeShown, newRecipe, isGenerating }) => {
    return (
        <section className='ingredients'>
            <div>
                <h2>Ingredients on hand:</h2>
                <ul>
                    {ingredientsList}
                </ul>
            </div>
            {ingredients.length >= 4 && <GenerateRecipe generateRecipe={generateRecipe} isRecipeShown={recipeShown} newRecipe={newRecipe} isGenerating={isGenerating} />}
        </section>
    )
}

export default GetRecipe