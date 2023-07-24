import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { trpc } from '../../index';
import "../../App.css"

export default function Ingredients() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ingredients, setIngredients] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ingredient, setIngredient] = useState({
        name: '',
        quantity: 0,
        unit: '',
        recipeId: 0,
    });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedIngredient, setSelectedIngredient] = useState(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const list = await trpc.ingredient.ingredientList.query();
        setIngredients(list);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        const updatedValue = name === 'quantity' || name === 'recipeId' ? parseInt(value) : value;

        setIngredient((preForm) => ({
            ...preForm,
            [name]: updatedValue,
        }));
    };

    const handleFormSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (selectedIngredient) {
            await trpc.ingredient.ingredientUpdate.mutate({
                id: selectedIngredient,
                ...ingredient,
            });
        } else {
            await trpc.ingredient.ingredientCreate.mutate(ingredient);
        }

        setIngredient({
            name: '',
            quantity: 0,
            unit: '',
            recipeId: 0,
        });
        setSelectedIngredient(null);
        fetchData();
    };

    const handleDelete = async (ingredientId: number) => {
        await trpc.ingredient.ingredientDelete.mutate(ingredientId);
        fetchData();
    };

    const handleUpdate = async (ingredid: React.SetStateAction<null>) => {
        setSelectedIngredient(ingredid);
        const selectIngredient = ingredients.find((ingredient) => ingredient.id === ingredid);

        if (selectIngredient) {
            setIngredient({
                name: selectIngredient.name,
                quantity: selectIngredient.quantity,
                unit: selectIngredient.unit,
                recipeId: selectIngredient.recipeId,
            });
            console.log(selectIngredient);
        } else {
            // Handle the case when the ingredient with the provided ID is not found
            console.error('Ingredient not found');
        }
    }

    return (
        <div className='bg-gray-300 h-full'>
            <div className='ml-2'>
                <h4 className='text-blue-500 font-medium'>Add Ingredients</h4>
                <div>&nbsp;</div>
                <form onSubmit={handleFormSubmit}>
                    <div className='flex flex-wrap'>
                        <div className='md:w-6/12'>
                            <label>
                                Name:
                                <input type="text" name="name" value={ingredient.name} onChange={handleInputChange} className='border ml-2 rounded-md' />
                            </label>
                        </div>
                        <div>
                            <label>
                                Quantity:
                                <input
                                    type="number"
                                    name="quantity"
                                    value={ingredient.quantity}
                                    onChange={handleInputChange}
                                    className='border ml-2 rounded-md'
                                />
                            </label>
                        </div>
                    </div>
                    <div>&nbsp;</div>
                    <div className='flex flex-wrap'>
                        <div className='md:w-6/12'>
                            <label>
                                Unit:
                                <input type="text" name="unit" value={ingredient.unit} onChange={handleInputChange} className='border ml-5 rounded-md' />
                            </label>
                        </div>
                        <div>
                            <label>
                                RecipeId:
                                <input
                                    type="number"
                                    name="recipeId"
                                    value={ingredient.recipeId}
                                    onChange={handleInputChange}
                                    className='border ml-2 rounded-md'
                                />
                            </label>
                        </div>
                    </div>
                    <div>&nbsp;</div>
                    <button type="submit" className='ml-4 bg-green-400 w-28'>{selectedIngredient ? 'Update' : 'Add'}</button>
                    
                </form>
                <div>&nbsp;</div>
                <h4 className='font-bold text-red-400'>Ingredients</h4>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            {/* <th>RecipeId</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingredients.map((ingredient) => (
                            <tr key={ingredient.id}>
                                <td className='text-start'>{ingredient.id}</td>
                                <td className='text-center'>{ingredient.name}</td>
                                <td className='text-center'>{ingredient.quantity}</td>
                                <td className='text-center'>{ingredient.unit}</td>
                                {/* <td className='text-center'>{ingredient.recipeId}</td> */}

                                    <td>
                                        <button className="delete_button  bg-red-700 mx-1 w-14 rounded-md my-auto text-white"
                                            onClick={() => { handleDelete(ingredient.id) }}>Delete</button>
                                        <button className="edit_button ml-2 bg-orange-400 mx-1 w-14 rounded-md my-auto text-white"
                                            onClick={() => { handleUpdate(ingredient.id) }}>Update</button>
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
