import React, {useEffect} from 'react'
import TodoList from './Todo/TodoList'
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from "./Todo/Header";

function App() {
    const [todos, setTodos] = React.useState([])

    useEffect(() => {
        fetch('https://test.kode-t.ru/list.json')
            .then(response => response.json())
            .then(todos => {
                console.log(todos.recipes)
                setTodos(todos.recipes)
            })

    })

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

    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <Header post={mainFeaturedPost} />
                <Container className={classes.cardGrid} maxWidth="md">
                    <TodoList todos={todos}/>
                </Container>
            </main>
        </React.Fragment>
    );
}

export default App;


