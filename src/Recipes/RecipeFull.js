import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useParams} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";


function RecipeFull() {
    const [recipeByIndex, setRecipeByIndex] = React.useState([])
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            maxWidth: 752,
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            margin: theme.spacing(4, 0, 2),
        },
    }));


    let {id} = useParams();
    const classes = useStyles();

    const getRecipe = (id) => {
        fetch(`https://test.kode-t.ru/detail_${id}.json`)
            .then(response => response.json())
            .then(res => {
                setRecipeByIndex(res.recipe)
            })

    }

    useEffect(() => {
        getRecipe(id)
    }, [])

    return (
        <div>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                {recipeByIndex.title}
            </Typography>
            <Typography component="h5" color="inherit" gutterBottom>
                <div>{recipeByIndex.description}</div>
                <div>
                    <div>{recipeByIndex.difficulty}</div>
                    <div>{recipeByIndex.cookTime}</div>
                    <div>{recipeByIndex.caloricity + "kCal"}</div>
                    <div>{recipeByIndex.cuisine?.title}</div>
                </div>
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                        Ingredients
                    </Typography>
                    <div className={classes.demo}>
                        <List component="nav" className={classes.root} aria-label="contacts">
                            {recipeByIndex.ingredients?.map((ingr, index) => {
                                return <ListItem key={index}>
                                    <ListItemText
                                        primary={ingr}
                                    />
                                </ListItem>
                            })}
                        </List>
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                        Instructions
                    </Typography>
                    <div className={classes.demo}>
                        <List component="nav" className={classes.root} aria-label="contacts">
                            {recipeByIndex.instructions?.map((instruction, index) => {
                                return <ListItem key={index}>
                                    <ListItemText
                                        primary={instruction}
                                    />
                                </ListItem>
                            })}
                        </List>
                    </div>
                </Grid>
            </Grid>
            {/*<ImageList variant="masonry" cols={3} gap={8}>*/}
            {/*    {recipeByIndex.images?.map((item,index) => (*/}
            {/*        <ImageListItem key={index}>*/}
            {/*            <img*/}
            {/*                srcSet={`${item}?w=161&fit=crop&auto=format 1x,*/}
            {/*                ${item}?w=161&fit=crop&auto=format&dpr=2 2x`}*/}
            {/*                // alt={item.title}*/}
            {/*                loading="lazy"*/}
            {/*            />*/}
            {/*        </ImageListItem>*/}
            {/*    ))}*/}
            {/*</ImageList>*/}
        </div>
    );
}

export default RecipeFull