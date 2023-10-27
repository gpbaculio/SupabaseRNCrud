import {useMutation} from '@tanstack/react-query';

import {supabase} from 'supabase';

import {TODOS_QUERY_KEY} from './useGetTodos';

const useCreateTodo = () => {
  return useMutation({
    mutationFn: async (text: string) => {
      return await supabase.from(TODOS_QUERY_KEY).insert([{text}]).select();
    },
  });
};

export default useCreateTodo;
