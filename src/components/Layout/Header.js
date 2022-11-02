import React from 'react';
import mealsImage from '../../assets/meals.jpg'

const Header = (props) => {
    return (
        <React.Fragment>
            <header>
                <h1>Meals</h1>
                <button>Cart</button>
            </header>
            <div>
                <img src={mealsImage} alt='meals pic' />
            </div>
        </React.Fragment>
    );
}

export default Header;
