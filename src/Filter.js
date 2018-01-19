import React from 'react';
import PropTypes from 'prop-types';

/*
    the props passed to this are what to do when a radio button is clicked (onFilter)
    and what is the initial button that is clicked (based on the filter state of parent component (App)
 */

const Filter = (props) => {
    return (
        <div>
            <input type="radio" name="filter" value="all" onChange={() => props.onFilter("all")}
                   checked={props.initialFilter === "all"}/>All
            <input type="radio" name="filter" value="unchecked" onChange={() => props.onFilter("unchecked")}/>Unchecked
            <input type="radio" name="filter" value="checked" onChange={() => props.onFilter("checked")}/>Checked
        </div>
    );
};
export default Filter;