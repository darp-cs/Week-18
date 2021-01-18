import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients) //Turns objects into array of keys no values, will hold arrays within itself
    .map(igKey => { //next you iterate through the array of keys 
        return [...Array(props.ingredients[igKey])].map((_, i) => {  //map the values from the ingredients to a value in the key array
            return <BurgerIngredient key = {igKey +i} type  = {igKey}/> //now that this is done, it look like (k,v) and can fill an object
        });
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, [] );

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>PLEASE START ADDING INGREDIENTS!</p>
    }
    return (

        
        <div className = {classes.Burger}>
            <BurgerIngredient type = "bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type = "bread-bottom"/>
        
        </div>
        
    );

};
export default burger;