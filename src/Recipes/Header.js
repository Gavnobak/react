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
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
        position: 'sticky',
        marginBottom: theme.spacing(4),
    },
    mainimage: {
        transform: 'scale(-1, 1)',
        backgroundImage: `url(${theme.styles.mainImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        height: '600px',
        paddingLeft: theme.spacing(9),
        paddingTop: theme.spacing(15),
    },
    inputPaper: {
        top: theme.spacing(4),
        border: '1px solid',
        borderRadius: 28,
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "276px",
        height: "56px",
    },
    paperBorderShow: {
        borderColor: theme.styles.shade40
    },
    paperBorderHide: {
        borderColor: theme.styles.shade20
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    focused: {},
    textLink: {
        textDecoration: 'none',
        color: 'black'
    },
    boxInput: {
        paddingTop: '35px',
        display: 'flex'
    },
    iconColor: {
        color: theme.styles.shade40
    },
    butShow: {
        visibility: "visible"
    },
    butHide: {
        visibility: "hidden"
    },
}));

function Header(props) {
    const {acceptFilters} = useContext(Context)
    const classes = useStyles();
    const {filters, setFilters} = props;
    const [deleteButtonShow, setDeleteButtonShow] = React.useState(false)
    const [showBorder, setShowBorder] = React.useState(false)

    const filterRec = event => {
        if (event.key === 'Enter') {
            acceptFilters()
        }
    }

    const filterWithEmptyTitle = () => {
        setFilters({...filters, title: ""})
        acceptFilters() //тут баг, нужен колбэк
    }

    return <Paper className={classes.mainFeaturedPost}>
        <Grid container>
            <Grid item md={4}>
                <Container className={classes.mainFeaturedPostContent}>
                    <Box>
                        <Typography variant="h1">
                            <Link to="/list/main" className={classes.textLink}>
                                Air Recipes
                            </Link>
                        </Typography>
                        <Typography variant="body1">
                            <Link to="/list/main" className={classes.textLink}>
                                Best Recipes for Best People
                            </Link>
                        </Typography>

                    </Box>
                    <Box className={classes.boxInput} style={{}}>
                        <Paper elevation={0}
                               className={clsx(classes.inputPaper, {
                                   [classes.paperBorderShow]: showBorder,
                                   [classes.paperBorderHide]: !showBorder,
                               })}>
                            <IconButton type="submit" aria-label="search" style={{backgroundColor: 'transparent'}}
                                        onClick={() => acceptFilters()}>
                                <SearchIcon/>
                            </IconButton>
                            <InputBase
                                className={classes.input}
                                placeholder="Search"
                                value={filters.title}
                                inputProps={{'aria-label': 'search'}}
                                onKeyPress={filterRec}
                                onChange={event => setFilters({...filters, title: event.target.value})}
                                onFocus={() => {
                                    setShowBorder(true)
                                    setDeleteButtonShow(false)
                                }}
                                onBlur={() => {
                                    if (filters.title) setDeleteButtonShow(true)
                                    setShowBorder(false)
                                }}
                            />
                            <IconButton
                                type="submit"
                                aria-label="search"
                                onClick={filterWithEmptyTitle}
                                style={{backgroundColor: 'transparent'}}
                                className={clsx({
                                    [classes.butHide]: !deleteButtonShow,
                                    [classes.butShow]: deleteButtonShow,
                                })}
                            >
                                <Icon className={classes.iconColor}>cancel</Icon>
                            </IconButton>
                        </Paper>
                        <FilterModal filters={filters} setFilters={setFilters}/>
                    </Box>
                </Container>
            </Grid>
            <Grid item md={8} className={classes.mainimage}>
            </Grid>
        </Grid>
    </Paper>;
}

Header.propTypes = {
    post: PropTypes.object,
};

export default Header