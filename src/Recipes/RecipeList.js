import React from "react"
import RecipeListItem from './RecipeListItem'
import PropTypes from 'prop-types'
import Grid from "@material-ui/core/Grid";


function RecipeList(props) {

    return (
        <Grid container spacing={2}>
            {props.recipes?.map((recipe, index) => {
                return <RecipeListItem
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