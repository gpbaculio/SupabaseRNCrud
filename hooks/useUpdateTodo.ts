import {useMutation} from '@tanstack/react-query';

import {PostgrestSingleResponse} from '@supabase/supabase-js';

import {supabase} from 'supabase';

import {TODOS_QUERY_KEY, Todo} from './useGetTodos';

export default function useUpdateTodo() {
  return useMutation<PostgrestSingleResponse<Todo[]>, Error, string, unknown>({
    mutationFn: async (text: string) =>
      await supabase
        .from(TODOS_QUERY_KEY)
        .update({text})
        .eq('text', text)
        .select(),
  });
}
