import React from "react"
import RecipeItem from './RecipeItem'
import PropTypes from 'prop-types'
import Grid from "@material-ui/core/Grid";


function RecipeList(props) {

    return (
        <Grid container spacing={4}>
            {props.recipes.map((recipe, index) => {
                return <RecipeItem
                    recipe={recipe}
                    key={recipe.id}
                />
            })}
        </Grid>


    )
}

RecipeList.propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default RecipeList