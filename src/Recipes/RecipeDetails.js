import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {Typography, Grid, Container} from "@material-ui/core";
import RecipeDetailsChips from "./RecipeDetailsChips";
import RecipeDetailsLists from "./RecipeDetailsLists";
import RecipeDetailsGallery from "./RecipeDetailsGallery";

function RecipeDetails() {
    const [recipeByIndex, setRecipeByIndex] = React.useState([])

    let {id} = useParams();

    const getRecipe = (id) => {
        fetch(`https://test.kode-t.ru/detail_${id}.json`)
            .then(response => response.json())
            .then(res => {
                setRecipeByIndex(res.recipe)
            })
    }

    useEffect(() => {
        getRecipe(id)
    }, [id])

    return (
        <Container fixed>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Typography variant="h2" color="inherit" gutterBottom>
                        {recipeByIndex.title}
                    </Typography>
                    <Typography variant="body1" color="inherit" gutterBottom>{recipeByIndex.description}</Typography>
                    <RecipeDetailsChips recipe={recipeByIndex} />
                    <RecipeDetailsLists recipe={recipeByIndex} />
                </Grid>
                <Grid item xs={6}>
                    <RecipeDetailsGallery recipe={recipeByIndex} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default RecipeDetails