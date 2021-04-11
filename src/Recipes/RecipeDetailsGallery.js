import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {List, Box, Paper} from "@material-ui/core";

function RecipeDetailsGallery({recipe}) {

    const [currentImg, setCurrentImg] = React.useState('')

    const useStyles = makeStyles((theme) => ({
        gridList: {
            flexWrap: 'nowrap',
            transform: 'translateZ(0)',
            display: 'flex',
            flexDirection: 'row',
        },
        mainImg: {
            width: '100%',
            aspectRatio: "3/2",
        },
        gridImage: {
            paddingRight: "8px"
        },
        listImage: {
            width: '56px',
            height: '56px',
            backgroundSize: 'cover'
        }
    }));

    const classes = useStyles();

    return (
        <React.Fragment>
            {recipe.images?.length ?
                <Paper elevation={0}>
                    <img alt={`Main pic`}
                         src={currentImg ? currentImg : recipe.images[0]}
                         className={classes.mainImg}/>
                </Paper> : ""}
            {recipe.images?.length > 1 ?
                <Box>
                    <List className={classes.gridList}>
                        {recipe.images?.map((item, index) => (
                            <Box key={index} className={classes.gridImage}>
                                <img alt={`pic ${index}`}
                                     src={item}
                                     className={classes.listImage}
                                     onClick={event => setCurrentImg(item)}/>
                            </Box>
                        ))}
                    </List>
                </Box> : ''}
        </React.Fragment>
    );
}

export default RecipeDetailsGallery