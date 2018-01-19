import React, {Component} from 'react';
import Form from './Form';
import TodoItem from './TodoItem';
import Filter from './Filter';
import cssStyle from './App.css';

//import logo from './logo.svg';
//import './App.css';

/*
    Need to import all the components that are sub-components of this components
 */

class App extends Component {

    /*
        constructor must have super(props)
        all functions that are used in sub-component must be 'bind' here
        state will contain the state of this component, and all sub-components (as much as possible)
     */
    constructor(props) {
        super(props);

        this.onCreateTodo = this.onCreateTodo.bind(this);
        this.onTodoCheck = this.onTodoCheck.bind(this);
        this.onTodoDelete = this.onTodoDelete.bind(this);
        this.onTodoFilter = this.onTodoFilter.bind(this);
        this.onTodoUpdate = this.onTodoUpdate.bind(this);
        this.state = {
            todos: [],
            filters: "all" // "checked", "unchecked"
        };
    }

    /*
        onTodoFilter is the function called by Filter when we change the filter radio,
        which takes the new filter value as argument and modifies the state

        use this.setState(prevState => {return newState})

     */
    onTodoFilter(filter) {
        //need to do this

        console.log(this + 'Filter');
        this.setState(prevState => {
            return {
                ...prevState,
                filters: filter
            };
        })
    }

    /*
        onTodoCheck is function called by TodoItem when an item is checked or unchecked
        argument passed is index of todoItem in todoArray (state)

     */

    onTodoCheck(index) {
        console.log(this + 'Checked');
        this.setState(prevState => {        //how to mutate this checked without changing array?
            return {
                ...prevState,
                todos: prevState.todos.map((value, key) => {
                    if (key === index) {
                        return {...value, checked: !value.checked};
                    }
                    return value;
                })
            };
        })
    }

    /*
        When a toDoItem is deleted this function is called, again with index
     */
    onTodoDelete(index) {
        console.log(this + 'Deleted');
        this.setState(prevState => {        //how to mutate this checked without changing array?
            return {
                ...prevState,
                todos: prevState.todos.filter((item, key) => {
                    return key !== index
                })
            };
        })
    }

    /*
        checkFilter takes a todoList item as argument, and returns true if this element is allowed
        by the filter in state on App
     */
    checkFilter(value) {
        if (this.state.filters === 'all') return true;
        if (this.state.filters === 'checked' && value.checked) return true;
        if (this.state.filters === 'unchecked' && !value.checked) return true;
        return false;
    }

    /*
        This function is called by ToDoItem when we update (and save) the value of a note.
        arguments are index of the todoitem and the newLabel (modified note)

        This updates the state of App, and this update also causes the TodoItem to receive modified
        props and update itself
     */
    onTodoUpdate(index, newLabel)
    {
        this.setState(prevState => {
            let newState = {...prevState};
            newState.todos[index].label = newLabel;
            return newState;
            }
        )
    }
    /*
        when a new ToDoItem is created this function is called.
     */
    onCreateTodo(value) {
        console.log("App Component: ", value);
        console.log(this);
        const newTodo = {
            label: value,
            checked: false
        }
        this.setState(prevState => {
            return {
                ...prevState,
                todos: [
                    ...prevState.todos,
                    newTodo
                ]
            };
        });
    }

    render() {

        //import classnames object?
        return <div className={cssStyle.appContainer + " " + cssStyle.center}>
            <Form onCreateTodo={this.onCreateTodo}/>
            /* Form is for adding bew data, only prop passed is the oncreatetodo function */
            <Filter onFilter={this.onTodoFilter} initialFilter={this.state.filters}/>
            /* Filter is the set of radio buttons denoting the filters, props passed are
                onFilter (what to do when a filter is clicked)
                initialFilter => which button is clicked initially, which is in state of App
             */
            {this.state.todos.map((value, key) => this.checkFilter(value) &&
                <TodoItem label={value.label} checked={value.checked} filter={this.state.filters}
                          onCheck={this.onTodoCheck} onDelete={this.onTodoDelete} index={key} key={key}
                          onUpdate={this.onTodoUpdate}/>)}
              /*
                    Here the list of todoitems is passed through a map, which returns A && B
                    where B is the toDoItem and A is true if the item matches and false if it
                    doesnt. Thus if the filter doesnt match item, that item is not passed through
                    the map, and hence not rendered.
               */
        </div>
    }
}


export default App;
