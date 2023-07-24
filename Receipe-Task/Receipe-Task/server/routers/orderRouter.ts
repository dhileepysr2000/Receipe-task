import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { router, publicProcedure } from '../main/trpc';

const prisma = new PrismaClient();

export const orderRouter = router({
  createOrder: publicProcedure
    .input(
      z.object({
        name: z.string(),
        street: z.string(),
        pincode: z.string(),
        city: z.string(),
       
      })
    )
    .mutation(async (opts) => {
      const { name, street, pincode, city} = opts.input;

      const createdOrder = await prisma.order.create({
        data: {
          name,
          street,
          pincode,
          city,
          
        },
      });

      return createdOrder;
    }),

  getOrderById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async (opts) => {
      const { id } = opts.input;

      const order = await prisma.order.findUnique({
        where: {
          id,
        },
      });

      return order;
    }),
});

