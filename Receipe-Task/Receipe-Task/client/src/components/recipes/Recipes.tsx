import React, { useEffect, useState } from 'react'
import { trpc } from '../../index';
import "../../App.css"

export default function Recipes() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [recipes, setRecipes] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [createRecipe, setCreateRecipe] = useState({
        name: '',
        description: '',
        cookingInstructions: '',
        customerId: 0,
    });
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const list = await trpc.recipe.recipeList.query();
        setRecipes(list);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        const updatedValue = name === 'customerId' ? parseInt(value) : value;

        setCreateRecipe((preForm) => ({
            ...preForm,
            [name]: updatedValue,
        }));
    };

    const handleFormSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (selectedRecipe) {
            await trpc.recipe.recipeUpdate.mutate({
                id: selectedRecipe,
                ...createRecipe,
                ingredients: []
            });
        } else {
            await trpc.recipe.recipeCreate.mutate(createRecipe);
        }

        setCreateRecipe({
            name: '',
            description: '',
            cookingInstructions: '',
            customerId: 0,
        });
        setSelectedRecipe(null);
        fetchData();
    };

    const handleDelete = async (recipeId: number) => {
        await trpc.recipe.recipeDelete.mutate(recipeId);
        fetchData();
    };

    const handleUpdate = async (recid: React.SetStateAction<null>) => {
        setSelectedRecipe(recid);
        const selectRecipe = recipes.find((recipe) => recipe.id === recid);

        if (selectRecipe) {
            setCreateRecipe({
                name: selectRecipe.name,
                description: selectRecipe.description,
                cookingInstructions: selectRecipe.cookingInstructions,
                customerId: selectRecipe.customerId,
            });

        } else {
            // Handle the case when the ingredient with the provided ID is not found
            console.error('Ingredient not found');
        }
    }

    return (
        <>
            <div className='bg-gray-300 h-full'>
                <h4 className='text-blue-500 font-medium'>Add recipes</h4>
                <div>&nbsp;</div>
                <form onSubmit={handleFormSubmit}>
                    <div className='flex flex-wrap'>
                        <div className='md:w-6/12'>
                            <label >
                                Name:
                                <input type="text" name="name" value={createRecipe.name} onChange={handleInputChange} className='border ml-10 rounded-md' />
                            </label>
                        </div>
                        <div className='md:w-6/12'>
                            <label>
                                Description:
                                <input
                                    type="text"
                                    name="description"
                                    value={createRecipe.description}
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
                                Instruction:
                                <input type="text" name="cookingInstructions" value={createRecipe.cookingInstructions} onChange={handleInputChange} className='border ml-2 rounded-md' />
                            </label>
                        </div>
                        <div>&nbsp;</div>
                        <div className=''>
                            <label>
                            CustomerId:
                                <input
                                    type="number"
                                    name="customerId"
                                    value={createRecipe.customerId}
                                    onChange={handleInputChange}
                                    className='border ml-2 rounded-md'
                                />
                            </label>
                        </div>
                    </div>
                    <div>&nbsp;</div>
                    <button type="submit" className='ml-4 bg-green-400 w-28'>{selectedRecipe ? 'Update' : 'Add'}</button>
                </form>
                <div>&nbsp;</div>
                <h4 className='font-bold text-red-400'>Recipes</h4>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>CookingInstruction</th>
                            {/* <th>CustomerId</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes.map((recipe) => (
                            <tr key={recipe.id}>
                                <td className='text-start'>{recipe.id}</td>
                                <td className='text-center'>{recipe.name}</td>
                                <td className='text-center'>{recipe.description}</td>
                                <td className='text-center'>{recipe.cookingInstructions}</td>
                                {/* <td className='text-center'>{recipe.customerId}</td> */}
                                
                                    <td>
                                        <button className="delete_button bg-red-700 mx-1 w-14 rounded-md my-auto text-white"
                                            onClick={() => { handleDelete(recipe.id) }}>Delete</button>
                                 
                                    
                                        <button className="edit_button ml-2 bg-orange-400 mx-1 w-14 rounded-md my-auto text-white"
                                            onClick={() => { handleUpdate(recipe.id) }}>Update</button>
                                    </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
