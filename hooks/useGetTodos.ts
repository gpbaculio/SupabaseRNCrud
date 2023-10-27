import {useQuery} from '@tanstack/react-query';

import {supabase} from 'supabase';

export const TODOS_QUERY_KEY = 'todos';

const useGetTodos = () => {
  return useQuery({
    queryKey: [TODOS_QUERY_KEY],
    queryFn: async () => {
      return await supabase.from(TODOS_QUERY_KEY).select('*').range(0, 9);
    },
  });
};

export default useGetTodos;
