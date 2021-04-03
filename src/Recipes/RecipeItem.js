import React from "react"
import PropTypes from 'prop-types'
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import {Link} from "react-router-dom";

function RecipeItem({recipe}) {
    const useStyles = makeStyles((theme) => ({
        card: {
            height: '100%', //'384px',
            // width: '90%', //'348px',
            // flexBasis: '50%',
            display: 'flex',
            borderRadius: '8px',
            flexDirection: 'column',
        },
        cardMedia: {
            // minHeight: '50%',
            paddingTop: '50%', // 16:9
        },
        cardContent: {
            flexGrow: 1,
            // minHeight: '50%',
        },
    }));

    const classes = useStyles();

    return (
        <Grid item key={recipe} xs={12} sm={6} md={4} >
            <Link to={`/item/${recipe.id}`} style={{ textDecoration: 'none' }}>
            <Card className={classes.card}>
                <CardMedia className={classes.cardMedia} image={recipe.thumbnail}>
                    <Chip label={recipe.cookTime}/>
                    <Chip label={recipe.caloricity + "kCal"}/>
                    <Chip label={recipe.cuisine.title}/>
                </CardMedia>
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h3">
                        {recipe.title}
                    </Typography>
                    <Typography gutterBottom variant="body">
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