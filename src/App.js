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
import RecipeDetails from "./Recipes/RecipeDetails";
import {ThemeProvider} from "@material-ui/styles";
import {createMuiTheme} from "@material-ui/core";
import mainimage from './images/mainimage.png';

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



    const theme = createMuiTheme({
        styles: {
            mainImage: mainimage,
            shade50: "#82786A",
            shade40: "#A9A9A9",
            shade20: "#DDDDDD",
            base0: "#000000",
            base1: "#FFFFFF",
            easy: '#2FB65D',
            medium: '#EB8A31',
            hard: '#EB3C31',
        },
        overrides: {
            MuiTouchRipple: {
                child: {
                    backgroundColor: "#DDDDDD",
                }
            }
        },
        typography: {
            h1: {
                fontFamily: "Gilroy",
                fontSize: "64px",
                fontWeight: "800",
                lineHeight: "80px"
            },
            h2: {
                fontFamily: "Gilroy",
                fontSize: "40px",
                fontWeight: "800",
                lineHeight: "48px"
            },
            h3: {
                fontFamily: "Gilroy",
                fontSize: "24px",
                fontWeight: "800",
                lineHeight: "28px"
            },
            body1: {
                fontFamily: "RobotoRegular",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "24px"
            },
            body2: {
                fontFamily: "RobotoRegular",
                fontSize: "12px",
                fontWeight: "400",
                lineHeight: "16px"
            },
            f: {
                fontFamily: "RobotoRegular",
                fontSize: "9px",
                fontWeight: "700",
                lineHeight: "10,55px",
                align: "Center"
            }
        }
    });

    const useStyles = makeStyles((theme) => ({
        heroContent: {
            padding: theme.spacing(8, 0, 6),
        },
        cardGrid: {
            paddingTop: theme.spacing(4) ,
            paddingBottom: theme.spacing(8),
        },
        stickingHeader: {
            position: "sticky",
            top: "0",
        }
    }));

    function isValid(arrOfValidCuisines, item) {
        const isValidTitile = item.title.toLowerCase().includes(filters.title.toLowerCase())
        const isValidCuisine = arrOfValidCuisines.includes(item.cuisine.title)
        const isLessThenMax = item.caloricity <= filters.caloricityCurrent[1]
        const isMoreThenMin = item.caloricity >= filters.caloricityCurrent[0]
        return isLessThenMax && isMoreThenMin && isValidCuisine && isValidTitile
    }

    function acceptFilters() {
        const checkFields = []
        filters.cuisines?.forEach((item) => {
            if (item.value) checkFields.push(item.title)
        })
        setFilteredRecipes(recipes.filter(isValid.bind(null, checkFields)))
    }

    const getTimeStr = (time) => {
        if (time) {
            const minute = time/60
            if (minute >= 60) {
                const hours = minute/60
                return hours>1 ? `${hours} hours` : `${hours} hour` // получится очень плохо если там не ровно 3.5 часа а например 3 часа 20 мин
            }

            return `${minute} min`
        }
    }

    const classes = useStyles();
    return (

        <Context.Provider value={{
            acceptFilters, getTimeStr, filters, setFilters
        }}>
            <ThemeProvider theme={theme}>
                <React.Fragment>
                    <Router>
                        <CssBaseline/>
                        <main /*className={classes.stickingHeader}*/>
                            <Header/>
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
                            <Container className={classes.cardGrid} maxWidth="md" /*fixed*/>
                                <RecipeList recipes={filteredRecipes}/>
                            </Container>
                        </Route>
                        <Route path="/item/:id" children={<RecipeDetails />}/>
                    </Router>
                </React.Fragment>
            </ThemeProvider>
        </Context.Provider>

    );
}


// не выполняет проверку во время работы, только при запуске
// App.propTypes = {
//     recipes: PropTypes.arrayOf(PropTypes.shape({
//         id:PropTypes.number,
//         cookTime: PropTypes.number,
//         caloricity: PropTypes.number,
//         title: PropTypes.string,
//         description: PropTypes.string,
//         thumbnail: PropTypes.string,
//         cuisine:PropTypes.shape({
//             id:PropTypes.number,
//             title: PropTypes.string,
//         }),
//     }),)
//
// }

export default App;


