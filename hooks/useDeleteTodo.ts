import {useMutation} from '@tanstack/react-query';

import {supabase} from 'supabase';

import {TODOS_QUERY_KEY, Todo} from './useGetTodos';
import {PostgrestSingleResponse} from '@supabase/supabase-js';

export default function useDeleteTodo() {
  return useMutation<PostgrestSingleResponse<Todo[]>, Error, string, unknown>({
    mutationFn: async (id: string) =>
      await supabase.from(TODOS_QUERY_KEY).delete().eq('id', id).select(),
  });
}
