import React, {useContext} from "react"
import PropTypes from 'prop-types'
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import {Link} from "react-router-dom";
import {Context} from "../context";
import {Box} from "@material-ui/core";

function RecipeItem({recipe}) {
    const {getTimeStr} = useContext(Context)
    const useStyles = makeStyles((theme) => ({
        card: {
            height: '100%',
            width: '90%',
            display: 'flex',
            borderRadius: '8px',
            flexDirection: 'column',
        },
        cardMedia: {
            paddingTop: '50%',
        },
        cardContent: {
            flexGrow: 1,
        },
        chip: {
            backgroundColor: '#FFFFFF',
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(2),
            alignSelf: "right"
        }
    }));

    const classes = useStyles();

    return (
        <Grid item key={recipe} xs={12} sm={6} md={4}>
            <Link to={`/item/${recipe.id}`} style={{textDecoration: 'none'}}>
                <Card className={classes.card}>
                    <CardMedia className={classes.cardMedia} image={recipe.thumbnail}>
                        <Box style={{textAlign: 'right',}}>
                            <Chip className={classes.chip}
                                  label={<Typography variant="body2">{getTimeStr(recipe.cookTime)}</Typography>}/>
                            <Chip className={classes.chip}
                                  label={<Typography variant="body2">{recipe.caloricity + " kCal"}</Typography>}/>
                            <Chip className={classes.chip}
                                  label={<Typography variant="body2">{recipe.cuisine.title}</Typography>}/>
                        </Box>
                    </CardMedia>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h3">
                            {recipe.title}
                        </Typography>
                        <Typography variant="body1">
                            {recipe.description}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    )
}

RecipeItem.propTypes = {
    recipe: PropTypes.object.isRequired,
}

export default RecipeItem