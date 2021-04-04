import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FilterModal from "./FilterModal";
import {Link} from "react-router-dom";
import {Context} from "../context";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        // backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
    // root: {
    //     border: '1px solid #DDDDDD',
    //     overflow: 'hidden',
    //     borderRadius: 28,
    //     // backgroundColor: '#fcfcfb',
    //     transition: theme.transitions.create(['border-color', 'box-shadow']),
    //     '&:hover': {
    //         // backgroundColor: '#fff',
    //     },
    //     '&$focused': {
    //         // backgroundColor: '#fff',
    //         boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    //         borderColor: theme.palette.primary.main,
    //     },
    // },
    root: {
        border: '1px solid #DDDDDD',
        borderRadius: 28,
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "276px",
        height: "56px",
        "&$focused": {
            borderColor: "red"
        }
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    focused: {},
    rotate45: {
        transform: [{ rotate: '45deg' }],
        color: "#DDDDDD",
    }
}));

function Header(props) {
    const {acceptFilters} = useContext(Context)
    const classes = useStyles();
    const {post, filters, setFilters} = props;

    const filterRec = event => {
        if (event.key === 'Enter') {
            acceptFilters()
        }
    }

    const filterWithEmptyTitle = () => {
        setFilters({...filters, title: ""})
        acceptFilters()
    }

    return <Paper className={classes.mainFeaturedPost} style={{backgroundImage: `url(${post.image})`}}>
        {<img style={{display: 'none'}} src={post.image}/>}
        <div className={classes.overlay}/>
        <Grid container>
            <Grid item md={6}>
                <div className={classes.mainFeaturedPostContent}>

                    <Link to="/list/main" style={{textDecoration: 'none'}}>
                        <Typography variant="h1" gutterBottom>
                            {post.title}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {post.description}
                        </Typography>
                    </Link>
                    <div>
                        <Paper  className={classes.root}  >
                            <IconButton type="submit"  aria-label="search">
                                <SearchIcon/>
                            </IconButton>
                            <InputBase
                                className={classes.input}
                                placeholder="Search"
                                value={filters.title}
                                inputProps={{'aria-label': 'search'}}
                                onKeyPress={filterRec}
                                onChange={event => setFilters({...filters, title: event.target.value})}
                            />
                            {filters.title? (<IconButton
                                type="submit"
                                aria-label="search"
                                onClick={filterWithEmptyTitle}
                            >
                                <Icon className={classes.rotate45} >add_circle</Icon>
                            </IconButton>) : "" }
                        </Paper>
                        <FilterModal filters={filters} setFilters={setFilters}/>
                    </div>
                </div>
            </Grid>
        </Grid>
    </Paper>;
}

Header.propTypes = {
    post: PropTypes.object,
};

export default Header