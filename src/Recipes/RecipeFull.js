import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useParams} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import GridListTile from "@material-ui/core/GridListTile";
import GridList from "@material-ui/core/GridList";
import Container from "@material-ui/core/Container";
import Icon from "@material-ui/core/Icon";


function RecipeFull() {
    const [recipeByIndex, setRecipeByIndex] = React.useState([])
    const useStyles = makeStyles((theme) => ({
        root: {
            // flexGrow: 1,
            // maxWidth: 752,
        },
        title: {
            margin: theme.spacing(4, 0, 2),
        },
        gridList: {
            width: 500,
            height: 450,
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
        <Container fixed>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Typography variant="h2" color="inherit" gutterBottom>
                        {recipeByIndex.title}
                    </Typography>
                    <Typography component="body1" color="inherit" gutterBottom>{recipeByIndex.description}</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={3}><Icon>schedule</Icon>{recipeByIndex.difficulty}</Grid>
                        <Grid item xs={3}><Icon>schedule</Icon>{recipeByIndex.cookTime}</Grid>
                        <Grid item xs={3}><Icon>schedule</Icon>{recipeByIndex.caloricity + "kCal"}</Grid>
                        <Grid item xs={3}><Icon>language</Icon>{recipeByIndex.cuisine?.title}</Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3" className={classes.title}>
                                Ingredients
                            </Typography>
                            <List component="nav" className={classes.root} aria-label="contacts">
                                {recipeByIndex.ingredients?.map((ingr, index) => {
                                    return <ListItem key={index}>
                                        <ListItemText
                                            primary={<Typography type="body1">{ingr}</Typography>}
                                        />
                                    </ListItem>
                                })}
                            </List>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3" className={classes.title}>
                                Instructions
                            </Typography>
                            <List component="nav" className={classes.root} aria-label="contacts">
                                {recipeByIndex.instructions?.map((instruction, index) => {
                                    return <ListItem key={index}>
                                        <ListItemText
                                            primary={<Typography type="body1">{instruction}</Typography>}
                                        />
                                    </ListItem>
                                })}
                            </List>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={6}>
                    <GridList cellHeight={160} className={classes.gridList} cols={3}>
                        {recipeByIndex.images?.map((item, index) => (
                            <GridListTile key={index} cols={1}>
                                <img src={item}/>
                            </GridListTile>
                        ))}
                    </GridList>
                </Grid>
            </Grid>
        </Container>
    );
}

export default RecipeFull