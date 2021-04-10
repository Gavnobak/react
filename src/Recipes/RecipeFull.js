import React, {useContext, useEffect} from 'react';
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
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import FaceIcon from '@material-ui/icons/Face';
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import {Context} from "../context";

function RecipeFull() {
    const {getTimeStr} = useContext(Context)
    const [recipeByIndex, setRecipeByIndex] = React.useState([])
    const [currentImg, setCurrentImg] = React.useState('')
    const useStyles = makeStyles((theme) => ({
        listItem: {
            paddingLeft: "unset"
        },
        title: {
            margin: theme.spacing(2, 0, 0),
        },
        gridList: {
            flexWrap: 'nowrap',
            transform: 'translateZ(0)',
        },
        listChip: {
            fontSize: "11px",
            borderColor: theme.styles.shade20,
            border: '1px solid',
            marginRight: "5px",
            display: 'flex',
            width: theme.spacing(2),
            height: theme.spacing(2),
            backgroundColor: 'white',
            color: 'black',
        },
        chipIcon: {
            marginRight: theme.spacing(5),
            border: '0px',
        },
        chipsBox: {
            margin: theme.spacing(2, 0, 0),
            display: 'flex'
        },
        mainImg: {
            width: "100%",
            height: '355px',
            backgroundSize: 'cover'
        },
        gridImage: {
            height: '56px',
            width: '56px',
        },
        easy: {
            color: theme.styles.easy
        },
        medium: {
            color: theme.styles.medium
        },
        hard: {
            color: theme.styles.hard
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
                    <Typography variant="body1" color="inherit" gutterBottom>{recipeByIndex.description}</Typography>
                    <Box className={classes.chipsBox}>
                        <Chip
                            icon={<Icon className={clsx( {
                                [classes.easy]: recipeByIndex.difficulty === 'easy',
                                [classes.medium]: recipeByIndex.difficulty === 'medium',
                                [classes.hard]: recipeByIndex.difficulty === 'hard',
                            })}>restaurant_menu</Icon>}
                            label={<Typography type="body1">{recipeByIndex.difficulty}</Typography>}
                            variant="outlined"
                            className={clsx(classes.chipIcon, {
                                [classes.easy]: recipeByIndex.difficulty === 'easy',
                                [classes.medium]: recipeByIndex.difficulty === 'medium',
                                [classes.hard]: recipeByIndex.difficulty === 'hard',
                            })}
                        />
                        <Chip
                            icon={<Icon>schedule</Icon>}
                            label={<Typography type="body1">{getTimeStr(recipeByIndex.cookTime)}</Typography>}
                            variant="outlined"
                            className={classes.chipIcon}
                        />
                        <Chip
                            icon={<Icon>local_fire_department</Icon>}
                            label={<Typography type="body1">{recipeByIndex.caloricity + " kCal"}</Typography>}
                            variant="outlined"
                            className={classes.chipIcon}
                        />
                        <Chip
                            icon={<Icon>language</Icon>}
                            label={<Typography type="body1">{recipeByIndex.cuisine?.title}</Typography>}
                            variant="outlined"
                            className={classes.chipIcon}
                        />
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Typography variant="h3" className={classes.title}>
                                Ingredients
                            </Typography>
                            <List dense component="nav" className={classes.root} aria-label="contacts">
                                {recipeByIndex.ingredients?.map((ingr, index) => {
                                    return <ListItem className={classes.listItem} key={index}>
                                        <Box style={{marginRight: "5px", fontSize: "20px"}}>&bull;</Box>
                                        <ListItemText
                                            primary={<Typography type="body1">{ingr}</Typography>}
                                        />
                                    </ListItem>
                                })}
                            </List>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Typography variant="h3" className={classes.title}>
                                Instructions
                            </Typography>
                            <List dense component="nav" className={classes.root} aria-label="contacts">
                                {recipeByIndex.instructions?.map((instruction, index) => {
                                    return <ListItem className={classes.listItem} key={index}>
                                        <Avatar className={classes.listChip}>{++index}</Avatar>
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
                    {recipeByIndex.images?.length ?
                        <Paper elevation={0}><img src={currentImg ? currentImg : recipeByIndex.images[0]}
                                                  className={classes.mainImg}/></Paper> : ""}
                    {recipeByIndex.images?.length > 1 ? <div>
                        <GridList className={classes.gridList} cols={2.5}>
                            {recipeByIndex.images?.map((item, index) => (
                                <GridListTile key={index} className={classes.gridImage} xs={2}>
                                    <img src={item} onClick={event => setCurrentImg(item)}/>
                                </GridListTile>
                            ))}
                        </GridList>
                    </div> : ''}
                </Grid>
            </Grid>
        </Container>
    );
}

export default RecipeFull