import { QueryClient } from "@tanstack/react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 120000, // 2minutes
    },
  },
});

export default client;
