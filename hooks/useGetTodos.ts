import {useInfiniteQuery} from '@tanstack/react-query';

import {supabase} from 'supabase';

export const TODOS_QUERY_KEY = 'todos';
const PAGE_COUNT = 10;
export type Todo = {
  created_at: string;
  id: string;
  text: string;
  updated_at: string;
};

const useGetTodos = () => {
  return useInfiniteQuery<Todo[]>({
    queryKey: [TODOS_QUERY_KEY],
    initialPageParam: 1,
    getNextPageParam: (_, allPages) => allPages.flat().length / PAGE_COUNT + 1,
    queryFn: async ({pageParam = 1}) => {
      const from = (pageParam as number) * PAGE_COUNT;
      const to = from + PAGE_COUNT - 1;
      const {data, error} = await supabase
        .from(TODOS_QUERY_KEY)
        .select('*')
        .range(from, to)
        .order('created_at', {ascending: false});

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export default useGetTodos;
