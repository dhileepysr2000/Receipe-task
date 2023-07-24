import { router } from './trpc';

import { ingredients } from '../routers/ingredientsRouter';
import {receipes} from '../routers/recipesRouter';
import {customer} from '../routers/customerRouter';
import { orderRouter } from '../routers/orderRouter';
 
export const appRouter = router({
  ingredient: ingredients,
  recipe : receipes,
  customer : customer,
  order : orderRouter,
});
 
export type AppRouter = typeof appRouter
