import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type {AppRouter} from '../../server/main/MainRouter';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      // this url is connected to server
    }),
  ],
});