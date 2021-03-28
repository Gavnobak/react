import React, {useEffect} from 'react'
import RecipeList from './Recipes/RecipeList'
import CssBaseline from "@material-ui/core/CssBaseline";
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from "./Recipes/Header";

function App() {
    const [recipes, setRecipes] = React.useState([])
    const [filteredRecipes, setFilteredRecipes] = React.useState([])
    //const [filters, setFilters] = React.useState([])
    const getRecipes = () => {
        fetch('https://test.kode-t.ru/list.json')
            .then(response => response.json())
            .then(res => {
                setRecipes(res.recipes)
                setFilteredRecipes(res.recipes)
            })

    }
    useEffect(() => {
        getRecipes()
    }, [])

    const useStyles = makeStyles((theme) => ({
        heroContent: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(8, 0, 6),
        },
        heroButtons: {
            marginTop: theme.spacing(4),
        },
        cardGrid: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8),
        },
    }));

    const mainFeaturedPost = {
        title: 'Air Recipes',
        description:
            "Best Recipes for Best People",
        image: 'https://s3-alpha-sig.figma.com/img/4753/d7c5/cb990e282b15a01c7b59a7ea480ff736?Expires=1617580800&Signature=bYny6Hx0SK5g6YZ1z3jOYcMOt2oyIyYjsrm03E3aBLPivHpwsr7bDs-Nyw5gwR2AtZylZ4v1Z86zskNHoH5cMmB1fiq5jUepwu9ft3aJGGcmduy~1kFhExM3p4pKy5hoCHORCGQvUKPb1BMASgvZN17qzOejAizBZPfV73Qe6oPaO~S~IHglvZWclt8jqvrSBuAOhchZ0bIwNkOHnNONPz7uRUyId5hI8iQirzObLHh8TMJPtQVZrlT4t3FIsdcI9l2YPiRM2BcC~A6vPVY2PzF9A4GgzFyy5Ef9ewEFgWLqfPP6koEbYl7IQ3bWxAq9F5UFRuOzvoFnzVYWYGtFeQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    };

    function filterRec(filterValue) {
        setFilteredRecipes(
            recipes.filter(rec => {
                return rec.title.toLowerCase().includes(filterValue.toLowerCase())
            }))
    }

    // function getFilters() {
    //     let filtersNew = {
    //         cuisines: {},
    //         minCal: null,
    //         maxCal: null
    //     }
    //     recipes.forEach(rec => {
    //         if (rec.cuisine.title && !filtersNew.cuisines.hasOwnProperty(rec.cuisine.title)) {
    //             filtersNew.cuisines[rec.cuisine.title] = true
    //         }
    //         if (rec.caloricity && (!filtersNew.minCal || filtersNew.minCal > rec.caloricity)) {
    //             filtersNew.minCal = rec.caloricity
    //         }
    //         if (rec.caloricity && (!filtersNew.maxCal || filtersNew.maxCal < rec.caloricity)) {
    //             filtersNew.maxCal = rec.caloricity
    //         }
    //     })
    //     setFilters(prevState => ({
    //         ...prevState,
    //          minCal: filtersNew.minCal, maxCal: filtersNew.maxCal
    //     }));
    //     // setFilters({  ...filters,cuisines:filtersNew.cuisines, minCal: filtersNew.minCal, maxCal: filtersNew.maxCal})
    //     console.log(filters)
    // }

    const classes = useStyles();
    return (

        <React.Fragment>
            <CssBaseline/>
            {/*<Context.Provider value={{filterRec}}>*/}
            <main>
                <Header
                    post={mainFeaturedPost}
                    // filters={filters}
                    // getFilters={getFilters}
                    onChange={filterRec}
                />
                <Container className={classes.cardGrid} maxWidth="md">
                    <RecipeList recipes={filteredRecipes}/>
                </Container>
            </main>
            {/*</Context.Provider>*/}
        </React.Fragment>

    );
}

export default App;


