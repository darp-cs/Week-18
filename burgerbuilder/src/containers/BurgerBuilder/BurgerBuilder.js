import React, {Component} from 'react';
import Aux from '../../hoc/Ax';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = { //Constant global variables are made capital letters to signify wont change
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component{

    state = {
        ingredients: {
            salad: 1,
            bacon: 2,
            cheese: 1,
            meat:2
        },

        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice+ priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients}); //this.setState merges state passed in with old state
        this.updatePurchaseState(updatedIngredients);
        
    }


    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount -1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice- priceDeduction;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients}); //this.setState merges state passed in with old state
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState = (ingredients) =>{

        const sum = Object.keys(ingredients)
        .map(ingredient => {
            return ingredients[ingredient]
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({purchasable: sum>0})
    }

    purchaseHandler= () =>{
        this.setState({purchasing:true})
    }

    purchaseCancelledHandler = () =>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () =>{
        alert('You Continue')
    }
    render(){

        const disabledInfo ={
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelledHandler} >
                    <OrderSummary 
                    ingredients = {this.state.ingredients} 
                    purchaseCancelled = {this.purchaseCancelledHandler}
                    purchaseContinued = {this.purchaseContinueHandler} 
                    total = {this.state.totalPrice}/>
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                ingredientAdded = {this.addIngredientHandler}
                ingredientRemoved  = {this.removeIngredientHandler} 
                disabled = {disabledInfo}
                purchasable = {this.state.purchasable}
                price = {this.state.totalPrice}
                ordered = {this.purchaseHandler}/>

            </Aux>
        );
    }
}

export default BurgerBuilder