
import {combineReducers} from 'redux';
import authReducer from './reducers/auth-reducer';
import cartReducer from './reducers/cart-reducer';
import productReducer from './reducers/product-reducer';
import categoryReducer from './reducers/category-reducer';


export default combineReducers({
    authReducer,
    categoryReducer,
    cartReducer,
    productReducer
});