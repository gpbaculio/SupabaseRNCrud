import React, {Suspense, useState} from 'react';

import {ToastPosition, toast} from '@backpackapp-io/react-native-toast';

import {
  DynamicPressable,
  DynamicText,
  DynamicTextInput,
  DynamicView,
} from 'components';
import useCreateTodo from 'hooks/useCreateTodo';
import {useQueryClient} from '@tanstack/react-query';
import {TODOS_QUERY_KEY} from 'hooks/useGetTodos';

export default function Add() {
  const queryClient = useQueryClient();
  const [text, setText] = useState('');

  const {mutateAsync, isPending} = useCreateTodo();

  return (
    <Suspense fallback={<DynamicText>Loading...</DynamicText>}>
      <DynamicView backgroundColor="light" flex={1} p="L">
        <DynamicView variant="rowCenterItems">
          <DynamicTextInput
            p="S"
            placeholder="What needs to be done?"
            borderTopLeftRadius={8}
            borderBottomLeftRadius={8}
            flex={0.8}
            borderColor="divider"
            borderWidth={1}
            value={text}
            onChangeText={value => setText(value)}
          />
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
            onPress={async () => {
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
            }}>
            <DynamicText color="dark" fontFamily="Roboto-Medium">
              ADD
            </DynamicText>
          </DynamicPressable>
        </DynamicView>
      </DynamicView>
    </Suspense>
  );
}
