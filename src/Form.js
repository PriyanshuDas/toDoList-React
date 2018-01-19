import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {


    /*
        it has a function, so we use constructor to bind the function
     */
    constructor(props) {
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);

    }

    /*
        onButtonClick, we use the entered text with the function we received as a prop from parent
        to update the state of the parent (by adding a new todoitem.

     */

    onButtonClick(event) {

        this.props.onCreateTodo(this.input.value);
    }

    render() {
        return (
            <div>
                <input type='text' placeholder='type something' ref={(input) => this.input = input}/>
                <button type="button" onClick={this.onButtonClick}>AddToDo</button>
            </div>
        );

    }
}

export default Form;