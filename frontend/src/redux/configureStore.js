import { createStore } from 'redux';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';

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
    

    const store = createStore(authReducer, getStateFromStorage(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    store.subscribe(() => {
        updateStateInStorage(store.getState());
    });
    return store;
}

export default configureStore;