import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import clsx from "clsx";
import {Context} from "../context";
import {makeStyles} from '@material-ui/core/styles';
import {Paper, Typography, Grid, IconButton, InputBase, Icon, Container, Box} from '@material-ui/core';
import FilterModal from "./FilterModal";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
        position: 'sticky',
        marginBottom: theme.spacing(4),
        boxShadow: 'none',
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
        height: '292px',
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
    transparent:{
        backgroundColor: 'transparent'
    }
}));

function Header() {
    const {acceptFilters, filters, setFilters} = useContext(Context)

    const classes = useStyles();

    const [deleteButtonShow, setDeleteButtonShow] = React.useState(false)
    const [showBorder, setShowBorder] = React.useState(false)

    const filterRec = event => {
        if (event.key === 'Enter') {
            acceptFilters()
        }
    }

    const filterWithEmptyTitle = async () => {
        await setFilters({...filters, title: ""})
        setDeleteButtonShow(false)
        //здесь по хорошему нужно добавить применение фильтров
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
                    <Box className={classes.boxInput}>
                        <Paper elevation={0}
                               className={clsx(classes.inputPaper, {
                                   [classes.paperBorderShow]: showBorder,
                                   [classes.paperBorderHide]: !showBorder,
                               })}>
                            <IconButton type="submit" aria-label="search" className={classes.transparent}
                                        onClick={() => acceptFilters()}>
                                <SearchIcon/>
                            </IconButton>
                            <InputBase
                                className={classes.input}
                                placeholder="Search"
                                value={filters.title}
                                inputProps={{'aria-label': 'search'}}
                                onKeyPress={filterRec}
                                //инпут лагает мне кажется из-за неправильной работы со стейтом
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
                                className={clsx(classes.transparent,{
                                    [classes.butHide]: !deleteButtonShow,
                                    [classes.butShow]: deleteButtonShow,
                                })}
                            >
                                <Icon className={classes.iconColor}>cancel</Icon>
                            </IconButton>
                        </Paper>
                        <FilterModal/>
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