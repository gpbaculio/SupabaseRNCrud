import React from 'react';

import {InfiniteData, useQueryClient} from '@tanstack/react-query';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ToastPosition, toast} from '@backpackapp-io/react-native-toast';

import {DynamicPressable, DynamicText} from 'components';

import {useCreateTodo} from 'hooks';

import {TODOS_QUERY_KEY, Todo} from 'hooks/useGetTodos';
import {colors} from 'theme/themeConfig';

type AddButtonProps = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

export default function AddButton({text, setText}: AddButtonProps) {
  const {mutateAsync, isPending} = useCreateTodo();

  const queryClient = useQueryClient();

  const onAddPress = async () => {
    await mutateAsync(text, {
      onSuccess: data => {
        if (data.data?.length && data.data[0]) {
          const newTodo = data.data[0];
          queryClient.setQueryData<InfiniteData<Array<Todo>>>(
            [TODOS_QUERY_KEY],
            oldData => ({
              ...(oldData as InfiniteData<Todo[]>),
              pages: [newTodo, ...(oldData?.pages ?? [])] as Array<Todo[]>,
            }),
          );
        }
        toast.success('Successfully added todo', {
          position: ToastPosition.BOTTOM,
          duration: 1500,
        });
      },
      onError: () => {
        toast.error('Failed to add todo', {
          position: ToastPosition.BOTTOM,
          duration: 1500,
        });
      },
      onSettled: async () => {
        setText('');
      },
    });
  };

  return (
    <DynamicPressable
      p="S"
      flex={0.2}
      borderWidth={1}
      borderColor="primary"
      variant="rowCenterItems"
      justifyContent="center"
      backgroundColor="primary"
      borderTopRightRadius={8}
      borderBottomRightRadius={8}
      disabled={!text || isPending}
      opacity={!text || isPending ? 0.5 : 1}
      onPress={onAddPress}>
      <DynamicText color="dark" fontFamily="Roboto-Medium" mr="XS">
        ADD
      </DynamicText>
      <FontAwesome name="plus" color={colors.dark} size={14} />
    </DynamicPressable>
  );
}
