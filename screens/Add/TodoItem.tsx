import React, {useRef, useState} from 'react';
import {TextInput} from 'react-native';

import {ToastPosition, toast} from '@backpackapp-io/react-native-toast';
import {InfiniteData, useQueryClient} from '@tanstack/react-query';

import {DynamicText, DynamicTextInput, DynamicView} from 'components';
import SaveButton from './SaveButton';
import CancelButton from './CancelButton';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

import {TODOS_QUERY_KEY, Todo} from 'hooks/useGetTodos';
import useUpdateTodo from 'hooks/useUpdateTodo';

type TodoProps = {
  item: Todo;
};

export default function TodoItem({item}: TodoProps) {
  const inputRef = useRef<TextInput>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);

  const queryClient = useQueryClient();

  const {mutateAsync, isPending} = useUpdateTodo(item.id);

  const isValid = isPending || text.trim() === item.text.trim();

  const onSave = async () => {
    await mutateAsync(text, {
      onSuccess: data => {
        if (data?.data?.length && data.data[0]) {
          const newTodo = data.data[0];

          queryClient.setQueryData<InfiniteData<Array<Todo>>>(
            [TODOS_QUERY_KEY],
            oldData => {
              const pages = oldData?.pages.map(page =>
                page.map(t => {
                  if (t.id === newTodo.id) {
                    return newTodo;
                  } else {
                    return t;
                  }
                }),
              ) as Array<Todo[]>;

              return {
                ...(oldData as InfiniteData<Todo[]>),
                pages,
              };
            },
          );
        }

        toast.success('Successfully updated todo', {
          position: ToastPosition.BOTTOM,
          duration: 1500,
        });
      },
      onError: () => {
        toast.error('Failed to update todo', {
          position: ToastPosition.BOTTOM,
          duration: 1500,
        });
      },
      onSettled: async data => {
        if (data?.data?.length && data.data[0]) {
          const newTodo = data.data[0];
          setText(newTodo.text);
          setIsEditing(false);
        }
      },
    });
  };

  const onEdit = () => {
    if (!isEditing) {
      setIsEditing(true);
      inputRef?.current?.focus();
    }
  };

  return (
    <>
      <DynamicView
        opacity={isPending ? 0.5 : 1}
        visible={isEditing}
        variant="rowCenterItems"
        justifyContent="space-between">
        <DynamicTextInput
          ref={inputRef}
          value={text}
          onChangeText={value => setText(value)}
          padding="S"
          flex={1}
          backgroundColor="white"
          mr="XS"
        />
        <DynamicView
          variant="rowCenterItems"
          justifyContent="space-between"
          pr="S">
          <SaveButton onPress={onSave} isValid={isValid} />
          <CancelButton onPress={() => setIsEditing(!isEditing)} />
        </DynamicView>
      </DynamicView>
      <DynamicView
        visible={!isEditing}
        padding="S"
        variant="rowCenterItems"
        justifyContent="space-between">
        <DynamicText>{text}</DynamicText>
        <DynamicView variant="rowCenterItems" justifyContent="space-between">
          <EditButton onPress={onEdit} />
          <DeleteButton />
        </DynamicView>
      </DynamicView>
    </>
  );
}
