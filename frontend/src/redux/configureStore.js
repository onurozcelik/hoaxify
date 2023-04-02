import { createStore } from 'redux';
import authReducer from './authReducer';

// 3rd parameter is required for redux extension to work
const configureStore = () => {
    const hoaxAuth = localStorage.getItem('hoax-auth');
    let stateInLocalStorage = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    };

    if (hoaxAuth) {
        try {
            stateInLocalStorage = JSON.parse(hoaxAuth);
        } catch (error) { }
    }

    const store = createStore(authReducer, stateInLocalStorage, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    store.subscribe(() => {
        localStorage.setItem('hoax-auth', JSON.stringify(store.getState()));
    });
    return store;
}

export default configureStore;