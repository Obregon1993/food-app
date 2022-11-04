import React, { useRef, useState } from 'react';
import classes from './MealItemForm.module.css'
import Input from '../../UI/Input';


const MealItemForm = props => {
    const [amountIsValid, setAmountIsValid] = useState(true)
    const amoutInputRef = useRef()

    const submitHandler = (event) => {
        event.preventDefault();
        const enreteredAmount = +amoutInputRef.current.value;
        if (enreteredAmount < 1 || enreteredAmount > 5) {
            setAmountIsValid(false)
            return
        }
        props.onAddToCart(enreteredAmount)

    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={amoutInputRef}
                label='Amount'
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }}
            />
            <button>+ Add</button>
            {!amountIsValid && <p>Plase Enter a valid amount (1-5)</p>}
        </form>
    );
}

export default MealItemForm;
