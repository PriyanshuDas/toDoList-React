import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component
{
    /* Again call super(props)
        bind functions used in this component
        set state
            isUpdating: whether the current note is in updating state, which changes available buttons, makes text editable, etc
            label: The label that is being currently shown.
            Note that this label is not necessarily same as the one in App.state.todo[index].label.
            This is just the label which is currently being shown (due to edit) and only when it's confirmed, will the state
            of the parent component (ie App) be changed. If the change is discarded somewhere in between, the state of the
            parent component (ie App) will not change, and hence, the state of toDoItem will also be reverted back to the
            value stored in App state
     */
    constructor(props)
    {
        super(props);

        this.onUpdate = this.onUpdate.bind(this);
        this.onUpdateCancel = this.onUpdateCancel.bind(this);
        this.onUpdateSave = this.onUpdateSave.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.state = {
            isUpdating: false,
            label: props.label
        }
    }

    /*
        This runs when the props of the component changes. We update the state of the current component to sync with that of
        the parent component here.
     */
    componentWillReceiveProps(newProps)
    {
        const {label } = this.props;

        if(label !== newProps.label) {
            this.setState(prevState =>{
                return {
                    ...prevState,
                    label: newProps.label
                }
            });
        }
    }


    /*
        When the input of the textBox changes we run this, this changes the label of the current component
        Note that this doesn't yet update the state of the parent component, only the current component
        This change will be discarded if the user presses cancel.
     */
    onInputChange(event)
    {
        console.log('Changing to : ' + event.target.value);
        const newValue = event.target.value;
        this.setState(prevState => {
            return {
                ...prevState,
                label: newValue
            }
        });
    }

    /*
        when we click the update button, we need to change the state of the current input as it is now being updated
        while it's in isUpdating state, the textBox is editable and the buttons available change, this is taken care of
        in the render if condition. ie. if isUpdating then render differently than when !isUpdating
     */
    onUpdate()
    {
        this.setState(prevState => {
            return {
                ...prevState,
                isUpdating: !prevState.isUpdating
            }
        })
    }

    /*
        When we press the cancel button while the current note is being updated, onUpdateCancel will run. This should
        revert the state label of the current component to be the same as the parent (App) component (which is stored as props),
         as we have discarded any changes that we have made so far.
     */
    onUpdateCancel()
    {
        console.log('Cancel');
        this.setState(prevState => {
            return {
                ...prevState,
                label: this.props.label,
                isUpdating: !prevState.isUpdating
            }
        })
    }

    /*
        When update is saved, we need to change the state of the current component to indicate that we are done updating
        at the same time, we also need to sync the parent component (App) with the updated value of toDoItem. this is
        done by calling the function passed as a prop (onUpdate) which is run in parent component and updates its state.
        the arguments passed to that are the index of the current toDoItem as well as the updated label
     */
    onUpdateSave()
    {
        console.log('Save + ('+this.props.index+', '+this.state.label + ')');
        this.props.onUpdate(this.props.index, this.state.label);
        this.setState(prevState => {
            return {
                ...prevState,
                isUpdating: !prevState.isUpdating
            }
        })

    }


    /*
        We just declare these const for ease of use in this function code block.
        if the current note is being updated, then we have to render differently, maintaining the text box currently
        being updated, without changing the state of the parent component (as we may discard this change)

        if the current note is not being updated, then we have to use the props sent by the parent to render.
     */
    render() {
        const { isUpdating } = this.state;
        const {checked, onCheck, index, label, onDelete} = this.props;
        console.log(isUpdating);

        if(isUpdating) {
            return (
                <div>
                    <input ref={(input) => this.input = input} value={this.state.label} onChange={this.onInputChange}/>
                    <button onClick={this.onUpdateCancel}>Cancel</button>
                    <button onClick={this.onUpdateSave}>Save</button>
                </div>
            )
        }
        return (
            <div>
                <input type='checkbox' checked={checked} onChange={() => onCheck(index)}/>
                <span>{label}</span>
                <button onClick={() => onDelete(index)}>Delete Note</button>
                <button onClick = {this.onUpdate}>Edit</button>
            </div>
        )
    }
}

export default TodoItem;