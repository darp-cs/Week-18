import React, {Component} from 'react'
import Aux from '../../../hoc/Ax'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

    

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(ingredient =>{
            return <li key ={ingredient}>
                <span style= {{textTranform:'captitalize'}}>{ingredient}</span> : {this.props.ingredients[ingredient]}
                </li>
        });

        return (
            <Aux>
                <h3> Your Order </h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.total.toFixed(2)}</strong></p>

                <p>Continue to Checkout?</p>

                <Button btnType= 'Danger' clicked = {this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType= 'Success' clicked = {this.props.purchaseContinuned}>CONTINUE</Button>

            </Aux>
        );
    }
    

    


};

export default OrderSummary;