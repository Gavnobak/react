import React from "react"
import TodoItem from './TodoItem'
import PropTypes from 'prop-types'
import Grid from "@material-ui/core/Grid";


function TodoList(props) {
    return (
        <Grid container spacing={4}>
            {props.todos.map((todo, index) => {
                return <TodoItem todo={todo}/>
            })}
        </Grid>
    )
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default TodoList