import { createStore, applyMiddleware, compose } from 'redux';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';
import thunk from 'redux-thunk';

const secureLs = new SecureLS();

const getStateFromStorage = () => {
    const hoaxAuth = secureLs.get('hoax-auth');
    let stateInLocalStorage = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    };

    if (hoaxAuth) {
        try {
            stateInLocalStorage = hoaxAuth;
        } catch (error) { }
    }
    return stateInLocalStorage;
} 

const updateStateInStorage = (newState) => {
    secureLs.set('hoax-auth', newState);
}

// 3rd parameter is required for redux extension to work
const configureStore = () => {
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(authReducer, getStateFromStorage(), composeEnhancers(compose(applyMiddleware(thunk))));
    store.subscribe(() => {
        updateStateInStorage(store.getState());
    });
    return store;
}

export default configureStore;