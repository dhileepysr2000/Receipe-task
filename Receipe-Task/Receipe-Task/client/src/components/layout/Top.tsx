import React from 'react';
import mealsImage from '../../assets/meals.jpg';
import './Top.css'
import TopButton from './TopButton';

export default function Top(props) {
  return (
    <div>
        <React.Fragment>
            <header className="header">
                <h1>React Meals</h1>
                <TopButton onClick={props.onShowCart} />
            </header>
            <div className='main-image'>
                <img src={mealsImage} alt="A table full of delicious food!" />
            </div>
        </React.Fragment>
    </div>
  )
}
