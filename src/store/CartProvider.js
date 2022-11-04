import React, { useReducer } from 'react';
import CartContext from './cart-content';

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, actions) => {
    if (actions.type === 'ADD_ITEM') {
        const updatedTotalAmount = state.totalAmount + actions.payload.price * actions.payload.amount;
        const existingCartItemIndex = state.items.findIndex(item => item.id === actions.payload.id)
        const existingCartItem = state.items[existingCartItemIndex]

        let updatedItems;
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + actions.payload.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(actions.payload);
        }

        return { items: updatedItems, totalAmount: updatedTotalAmount }
    }

    if (actions.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === actions.id)
        const existingCartItem = state.items[existingCartItemIndex]
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;
        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== actions.id);
        } else {
            const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return { items: updatedItems, totalAmount: updatedTotalAmount }
    }

    return defaultCartState
}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);


    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD_ITEM', payload: item })
    }

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE_ITEM', id: id })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;
