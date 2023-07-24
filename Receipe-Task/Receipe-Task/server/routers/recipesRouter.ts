import {z} from 'zod'
import { publicProcedure,router } from '../main/trpc'
import { PrismaClient } from '@prisma/client'

const prisma =new PrismaClient()

export const receipes = router({
    // get all items 
    receipelist:publicProcedure.query(async () =>{
        const recipe= await prisma.recipe.findMany()
        return recipe
    }),

    // get unique id 
    receipeid:publicProcedure.input(z.number()).mutation(async(opts)=>{
        const {input} =opts;
        const recipeid= await prisma.recipe.findUnique({
            where:{
                id:input
            }
        })
        return recipeid
    }),

    // recipe items create 
    receipecreate:publicProcedure.input(z.object({name:z.string(),description:z.string(),cookingInstructions:z.string(),price:z.number()}))
    .mutation(async (opts) =>{
        const {input} =opts;
        const recipe = await prisma.recipe.create({
            data:{
                name:input.name,
                description:input.description,
                cookingInstructions:input.cookingInstructions,
                price:input.price
               
            }
        })
        return recipe
    }),

    // recipe delete 
    receipedelete:publicProcedure.input(z.number())
    .mutation (async (opts) =>{
            const {input} =opts;
            const receidelete = await prisma.recipe.delete({
                where:{
                    id:input
                }
            })
            return receidelete
    }),


    // recipe update 
    receipeupdate:publicProcedure.input(z.object({id:z.number(),name:z.string(),description:z.string(), cookingInstructions:z.string(),price:z.number()}))
    .mutation( async (opts)=>{
        const {input} =opts
        const receiupdate =await prisma.recipe.update({
            where:{
                id:input.id
            },
            data:{
                name:input.name,
                description:input.description,
                cookingInstructions:input.cookingInstructions,
                price:input.price
                
            }
        })
        return receiupdate
 })

})