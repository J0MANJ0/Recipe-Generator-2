import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import GetRecipe from './GetRecipe'
import Recipe from './Recipe'
import { getRecipeFromMistral } from '../../ai.cjs'

const InputRecipe = () => {

    const [ingredients, setIngredients] = useState([])
    const [recipe, setRecipe] = useState("")
    const [isRecipeShown, setIsRecipeShown] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)

    async function generateRecipe() {
        setIsGenerating(true)
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setTimeout(() => {
            setRecipe(recipeMarkdown)
            setIsRecipeShown(true)
            setIsGenerating(false)
        }, 3000)
    }

    function newRecipe() {
        const promptAlert = window.confirm("Do you want a new recipe?")
        if (promptAlert) {
            setIsRecipeShown(prev => !prev)
            setIngredients([])
            setRecipe("")
        } return

    }

    function deleteIngredient(index) {
        const delIngr = ingredients.filter((_, i) => i !== index)
        setIngredients(delIngr)
    }

    const ingredientsList = ingredients.map((ingredient, i) => (
        <div className='ingredient'>
            <>
                <li key={i} id={nanoid()}>{ingredient}</li>
            </>
            <>
                {!recipe && <button key={i} onClick={() => deleteIngredient(i)}>x</button>}
            </>
        </div>
    ))

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        if (!newIngredient) {
            alert("Please enter an ingredient")
            return null
        }
        setIngredients(prev => [...prev, newIngredient])
    }

    return (
        <section>
            <form action={addIngredient} className='submit'>
                <input
                    type="text"
                    placeholder='enter ingredient e.g garlic..'
                    name='ingredient'
                    autoComplete='off'
                />
                <button> Add Ingredient</button>
            </form>
            {ingredients.length < 4 && <p className='hint'>Please add at least four ingredients to generate a recipe</p>}
            <div>
                {ingredients.length ? <GetRecipe ingredientsList={ingredientsList} ingredients={ingredients} generateRecipe={generateRecipe} recipeShown={isRecipeShown} newRecipe={newRecipe} isGenerating={isGenerating} /> : null}
            </div>
            <div className="recipe">
                {recipe && <Recipe recipe={recipe} />}
            </div>
        </section>
    )
}

export default InputRecipe