import {useInfiniteQuery} from '@tanstack/react-query';
import {useState} from 'react';

import {supabase} from 'supabase';

export const TODOS_QUERY_KEY = 'todos';

const PAGE_COUNT = 10;

export type Todo = {
  created_at: string;
  id: string;
  text: string;
  updated_at: string;
};

function useGetTodos() {
  const [totalCount, setTotalCount] = useState(0);

  return useInfiniteQuery<Todo[]>({
    queryKey: [TODOS_QUERY_KEY],
    initialPageParam: 0,
    refetchInterval: 10000,
    getNextPageParam: (_, allPages, lastPage) => {
      const resultsCount = allPages.flat().length;
      const from = (lastPage as number) * PAGE_COUNT;

      if (
        (totalCount && resultsCount >= totalCount) ||
        (totalCount && from >= totalCount)
      ) {
        return undefined;
      }

      const currentPage = Math.ceil(resultsCount / PAGE_COUNT);

      return currentPage;
    },
    queryFn: async ({pageParam = 0}) => {
      const from = (pageParam as number) * PAGE_COUNT;
      const to = from + PAGE_COUNT - 1;

      const {data, error, count} = await supabase
        .from(TODOS_QUERY_KEY)
        .select('*', {count: 'exact'})
        .range(from, to)
        .order('created_at', {ascending: false});

      if (count) {
        setTotalCount(count);
      }

      if (error) {
        return [];
      }

      return data;
    },
  });
}

export default useGetTodos;
