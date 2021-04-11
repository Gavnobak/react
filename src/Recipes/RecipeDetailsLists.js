import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography, Grid, List, ListItem, ListItemText, Box, Avatar} from "@material-ui/core";

function RecipeDetailsLists({recipe}) {

    const useStyles = makeStyles((theme) => ({
        title: {
            margin: theme.spacing(2, 0, 0),
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
        listItem: {
            paddingLeft: "unset"
        },
    }));

    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item>
                    <Typography variant="h3" className={classes.title}>
                        Ingredients
                    </Typography>
                    <List dense component="nav" className={classes.root} aria-label="contacts">
                        {recipe.ingredients?.map((ingr, index) => {
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
                        {recipe.instructions?.map((instruction, index) => {
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
        </React.Fragment>
    );
}

export default RecipeDetailsLists