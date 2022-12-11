import { useCallback } from 'react';
import { useQueryClient, UseQueryOptions } from 'react-query';
import { useMutation as mutation, useQuery as query } from 'react-query';
import apiFetch from '../services/apiFetch';

export const useQuery = <T>({
  route,
  method,
  payload,
  ...rest
}: {
  route: string;
  method?: string;
  payload?: any;
} & UseQueryOptions<T>) => {
  const fetch = useFetch();
  return query(
    payload ? `${route}+${JSON.stringify(payload)}` : route,
    //@ts-ignore
    () => fetch({ method, route, payload }),
    rest,
  );
};

export const useMutation = <T>({
  route,
  method = 'POST',
  queryKey,
  ...rest
}: {
  route: string;
  method?: string;
  queryKey?: string;
}) => {
  const fetch = useFetchData<T>();
  const queryClient = useQueryClient();

  const onSuccess = () => queryClient.invalidateQueries(queryKey);

  return mutation((payload: any) => fetch({ method, route, payload }), {
    onSuccess,
    ...rest,
  });
};

const useFetch = () => {
  return useCallback(<T>(params: any) => apiFetch<T>(params), []);
};

export const useFetchData = <T>() => {
  const fetch = useFetch();
  return useCallback(
    async (params: any) => {
      const { error, data } = await fetch<{
        error?: { message: string };
        data: T;
      }>(params);
      if (error) {
        throw new Error(error.message.toString());
      }
      return data;
    },
    [fetch],
  );
};
