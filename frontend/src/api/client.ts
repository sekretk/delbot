import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import type { MainRouter } from '@delbot/shared';

// tRPC proxy client for direct usage (without React hooks)
export const trpcClient = createTRPCProxyClient<MainRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

// tRPC React hooks client
export const trpc = createTRPCReact<MainRouter>();

// tRPC client with React Query integration
export const trpcClientWithReactQuery = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

// Legacy API for backward compatibility (can be removed once all components are migrated)
export const api = {
  getData: async () => {
    const result = await trpcClient.app.getData.query();
    return { status: 200 as const, body: result };
  },
  getHealth: async () => {
    const result = await trpcClient.app.getHealth.query();
    return { status: 200 as const, body: result };
  },
};










