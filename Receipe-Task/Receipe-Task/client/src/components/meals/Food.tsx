import React, { useState, useEffect, useContext } from 'react';
import "./Food.css";
import { trpc } from '../../index';
import Card from '../ui/Card';
import ItemForm from './ItemForm';
import CartContext from '../../store/CartContext';

export default function Food() {
    const [recipes, setRecipes] = useState([]);
    const cartCtx = useContext(CartContext);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const list = await trpc.recipe.receipelist.query();
        setRecipes(list);
    };

    const addToCartHandler = (itemId, amount) => {
        const recipe = recipes.find(recipe => recipe.id === itemId);
        if (recipe) {
            cartCtx.addItem({
                id: recipe.id,
                name: recipe.name,
                amount: amount,
                price: recipe.price
            });
            console.log(`Adding item with ID ${itemId} to the cart.`);
        }
    };

    return (
        <>
            <section className="description">
                <h2>Delicious Food, Delivered To You</h2>
                <p>
                    Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.
                </p>
                <p>
                    All our meals are cooked with high-quality ingredients, just-in-time and of course by experienced chefs!
                </p>
            </section>

            <section className="meals">
                <Card>
                    <div>
                        <ul>
                            {recipes.map((recipe) => {
                                const { id, name, description, price } = recipe;
                                return (
                                    <li className="meal" key={id}>
                                        <div>
                                            <h1 className="recipe-name">{name}</h1>
                                            <h4 className="description-meal">{description}</h4>
                                            <div className="price">{price ? `$${price.toFixed(2)}` : ''}</div>
                                        </div>
                                        <div>
                                            <ItemForm id={recipe.id} onAddToCart={addToCartHandler} />
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </Card>
            </section>
        </>
    );
}
