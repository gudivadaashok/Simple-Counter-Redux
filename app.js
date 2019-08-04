
const buttonReset = document.getElementById('button-reset');

const buttonIncrement = document.getElementById('button-increment');
const buttonDecrement = document.getElementById('button-decrement');

/**
 *  First off, we design our (very simple) state shape with the initalState
 *  Just a simple JavaScript object which describes any dynamic data that our app needs
 **/
let initalState = {
    counter: 0
};

/**
 *  Next, define (as strings) the names of actions which might take place in your app
 *
 *  These should describe "what happened" and should not describe how they will change the state
 **/
const actionTypes = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    RESET: 'RESET'
};
/**
 *  Action creators are factory functions which return our action objects
 **/
const actionCreators = {
    increment: function () {
        return {
            type: actionTypes.INCREMENT
        };
    },
    decrement: function () {
        return {
            type: actionTypes.DECREMENT
        };
    },
    reset : function () {
        return {
            type: actionTypes.RESET
        }
    }
};

/**
 *  This is the reducer function which we
 *  Remember: no side-effects! This should be a pure function!
 */
const reducer = function (state, action) {
    //  Return inital state if previously undefined (when Redux first calls the reducer)
    if (typeof state === 'undefined') {
        return initalState;
    }
    if (action.type === actionTypes.INCREMENT) {
        return {
            counter: state.counter + 1
        };
    }
    if (action.type === actionTypes.DECREMENT) {
        return {
            counter: state.counter - 1
        };
    }
    if (action.type === actionTypes.RESET){
        return initalState;
    }
    //  Always return the previous state if the action is unknown
    return state;
};

/**
 *  Create our store, which allows us to:
 *  - read the state
 *  - dispatch actions
 *  - subscribe to dispatches
 */
const store = Redux.createStore(reducer);


//  Dispatch the correct actions when each button is clicked
buttonIncrement.addEventListener('click', function () {
    store.dispatch(actionCreators.increment());
});
buttonDecrement.addEventListener('click', function () {
    store.dispatch(actionCreators.decrement());
});

buttonReset.addEventListener('click', function () {
    store.dispatch(actionCreators.reset())
});


/**
 *  This is our listener, which allows us to
 **/
const counterElement = document.getElementById('count');
let updateCounter = function () {
    let state = store.getState();
    counterElement.innerText = state.counter;
};

store.subscribe(updateCounter);
