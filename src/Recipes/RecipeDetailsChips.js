import React, {useContext} from 'react';
import clsx from "clsx";
import {Context} from "../context";
import {makeStyles} from '@material-ui/core/styles';
import {Icon, Box, Chip, Typography} from "@material-ui/core";

function RecipeDetailsChips({recipe}) {
    const {getTimeStr} = useContext(Context)

    const useStyles = makeStyles((theme) => ({
        chipIcon: {
            marginRight: theme.spacing(5),
            border: '0px',
        },
        chipsBox: {
            margin: theme.spacing(2, 0, 0),
            display: 'flex'
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

    const classes = useStyles();

    return (
        <Box className={classes.chipsBox}>
            <Chip
                icon={<Icon className={clsx({
                    [classes.easy]: recipe.difficulty === 'easy',
                    [classes.medium]: recipe.difficulty === 'medium',
                    [classes.hard]: recipe.difficulty === 'hard',
                })}>restaurant_menu</Icon>}
                label={<Typography type="body1">{recipe.difficulty}</Typography>}
                variant="outlined"
                className={clsx(classes.chipIcon, {
                    [classes.easy]: recipe.difficulty === 'easy',
                    [classes.medium]: recipe.difficulty === 'medium',
                    [classes.hard]: recipe.difficulty === 'hard',
                })}
            />
            <Chip
                icon={<Icon>schedule</Icon>}
                label={<Typography type="body1">{getTimeStr(recipe.cookTime)}</Typography>}
                variant="outlined"
                className={classes.chipIcon}
            />
            <Chip
                icon={<Icon>local_fire_department</Icon>}
                label={<Typography type="body1">{recipe.caloricity + " kCal"}</Typography>}
                variant="outlined"
                className={classes.chipIcon}
            />
            <Chip
                icon={<Icon>language</Icon>}
                label={<Typography type="body1">{recipe.cuisine?.title}</Typography>}
                variant="outlined"
                className={classes.chipIcon}
            />
        </Box>
    );
}

export default RecipeDetailsChips