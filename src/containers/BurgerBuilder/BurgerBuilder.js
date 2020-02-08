import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import classes from './BurgerBuilder.module.css';
import * as actions from '../../store/actions/index';

const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);
    const dispatch = useDispatch();

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token != null);

    const onIngredientAdded = ingName => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = ingName => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = path => dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    },[onInitIngredients]);

    const isPurchaseable = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);

        return sum > 0;
    }
    
    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath("/checkout");
            props.history.push("/auth");
        }
    }


    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }
    
    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');   
    }

    
    const disabledInfo ={
        ...ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    
    let burger = error ? <p>Ingredients could not be loaded!</p> : <Spinner />
    if (ings) {
        burger = (
            <div className={classes.BurgerBuilder}>
                <Burger ingredients={ ings } />
                <BuildControls 
                    ingredientAdded={onIngredientAdded} 
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={isPurchaseable(ings)}
                    ordered={purchaseHandler} 
                    isAuth={isAuthenticated}
                    price={price} />
            </div>
        );
        orderSummary = <OrderSummary 
            ingredients={ings}
            price={price}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler} />;
    }
    
    return (
        <Aux>
            <Modal 
                show={purchasing}
                modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );

}

export default withErrorHandler(BurgerBuilder, axios);