import React from 'react';

import {useQueryClient} from '@tanstack/react-query';
import {ToastPosition, toast} from '@backpackapp-io/react-native-toast';

import {DynamicPressable, DynamicText} from 'components';

import {useCreateTodo} from 'hooks';
import {TODOS_QUERY_KEY} from 'hooks/useGetTodos';

type AddButtonProps = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

export default function AddButton({text, setText}: AddButtonProps) {
  const {mutateAsync, isPending} = useCreateTodo();

  const queryClient = useQueryClient();

  const onAddPress = async () => {
    await mutateAsync(text, {
      onSuccess: () => {
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
        await queryClient.invalidateQueries({
          queryKey: [TODOS_QUERY_KEY],
        });
      },
    });
  };

  return (
    <DynamicPressable
      p="S"
      flex={0.2}
      borderWidth={1}
      borderColor="primary"
      variant="centerItems"
      backgroundColor="primary"
      borderTopRightRadius={8}
      borderBottomRightRadius={8}
      disabled={!text || isPending}
      opacity={!text || isPending ? 0.5 : 1}
      onPress={onAddPress}>
      <DynamicText color="dark" fontFamily="Roboto-Medium">
        ADD
      </DynamicText>
    </DynamicPressable>
  );
}
