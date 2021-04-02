import React, {useEffect} from 'react'
import RecipeList from './Recipes/RecipeList'
import CssBaseline from "@material-ui/core/CssBaseline";
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from "./Recipes/Header";
import {Context} from './context';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
} from "react-router-dom";
import RecipeFull from "./Recipes/RecipeFull";
// import ImageList from '@material-ui/core/ImageList';
// import ImageListItem from '@material-ui/core/ImageListItem';

function App() {
    const [recipes, setRecipes] = React.useState([])
    const [filteredRecipes, setFilteredRecipes] = React.useState([])
    const [filters, setFilters] = React.useState({})
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


    useEffect(() => {
        let unicCuisine = []
        let toSet = []
        let minCal = null
        let maxCal = null
        recipes.forEach(rec => {
            if (rec.cuisine.title && !unicCuisine.includes(rec.cuisine.title)) {
                unicCuisine.push(rec.cuisine.title)
                toSet.push(
                    {
                        title: rec.cuisine.title,
                        value: true
                    }
                );
            }
            if (rec.caloricity && (!minCal || minCal > rec.caloricity)) {
                minCal = rec.caloricity
            }
            if (rec.caloricity && (!maxCal || maxCal < rec.caloricity)) {
                maxCal = rec.caloricity
            }
        })
        setFilters({
            title: '',
            cuisines: toSet,
            caloricityRange: [minCal, maxCal],
            caloricityCurrent: [minCal, maxCal]
        })

    }, [recipes])

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

    function filterRec(value) {
        if (value) {
            setFilteredRecipes(
                recipes.filter(rec => {
                    return rec.title.toLowerCase().includes(value.toLowerCase())
                }))
        } else {
            setFilteredRecipes(recipes)
        }
    }

    function isValid(arrOfValidCuisines, item) {
        const isValidTitile = item.title.toLowerCase().includes(filters.title.toLowerCase())
        const isValidCuisine = arrOfValidCuisines.includes(item.cuisine.title)
        const isLessThenMax = item.caloricity <= filters.caloricityCurrent[1]
        const isMoreThenMin = item.caloricity >= filters.caloricityCurrent[0]
        return isLessThenMax && isMoreThenMin && isValidCuisine && isValidTitile
    }

    function acceptFilters() {
        const checkFields = []  
        filters.cuisines?.forEach((item)=>{
            if (item.value) checkFields.push(item.title)
        })
        setFilteredRecipes(recipes.filter(isValid.bind(null, checkFields)))
    }


    const classes = useStyles();
    return (

        <Context.Provider value={{
            acceptFilters
        }}>
            <React.Fragment>
                <Router>
                    <CssBaseline/>
                    <main>
                        <Header
                            post={mainFeaturedPost}
                            filters={filters}
                            setFilters={setFilters}
                        />
                    </main>
                    <Route
                        exact
                        path="/"
                        render={() => {
                            return (
                                <Redirect to="/list/main"/>
                            )
                        }}
                    />
                    <Route path="/list/main">
                        <Container className={classes.cardGrid} maxWidth="md">
                            <RecipeList recipes={filteredRecipes}/>
                        </Container>
                    </Route>
                    <Route path="/item/:id" children={<RecipeFull/>}/>
                </Router>
            </React.Fragment>
        </Context.Provider>

    );
}


export default App;


