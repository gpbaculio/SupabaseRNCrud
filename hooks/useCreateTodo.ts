import {useMutation} from '@tanstack/react-query';

import {supabase} from 'supabase';

import {TODOS_QUERY_KEY, Todo} from './useGetTodos';
import {PostgrestSingleResponse} from '@supabase/supabase-js';

function useCreateTodo() {
  return useMutation<PostgrestSingleResponse<Todo[]>, Error, string, unknown>({
    mutationFn: async (text: string) =>
      await supabase.from(TODOS_QUERY_KEY).insert([{text}]).select(),
  });
}

export default useCreateTodo;
