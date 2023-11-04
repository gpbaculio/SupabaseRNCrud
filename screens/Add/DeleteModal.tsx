import {Modal} from 'react-native';
import React from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {DynamicPressable, DynamicText, DynamicView} from 'components';

import {colors} from 'theme/themeConfig';
import {TODOS_QUERY_KEY, Todo} from 'hooks/useGetTodos';
import {useDeleteTodo} from 'hooks';
import {InfiniteData, useQueryClient} from '@tanstack/react-query';
import {ToastPosition, toast} from '@backpackapp-io/react-native-toast';

type DeleteModalProps = {
  item: Todo;
  modalVisible: boolean;
  onRequestClose: () => void;
};

export default function DeleteModal({
  item,
  modalVisible,
  onRequestClose,
}: DeleteModalProps) {
  const queryClient = useQueryClient();

  const {mutateAsync, isPending} = useDeleteTodo();

  const onDeletePress = async () => {
    await mutateAsync(item.id, {
      onSuccess: data => {
        if (data && data.data && data.data.length && data.data[0]) {
          const deletedTodo = data.data[0];

          queryClient.setQueryData<InfiniteData<Array<Todo>>>(
            [TODOS_QUERY_KEY],
            oldData => {
              console.log('oldData?.pages ', JSON.stringify(oldData?.pages));
              const pages = oldData?.pages?.map(page =>
                page?.filter(
                  t => t && deletedTodo && t?.id !== deletedTodo?.id,
                ),
              ) as Array<Todo[]>;

              return {
                ...(oldData as InfiniteData<Todo[]>),
                pages,
              };
            },
          );
          toast.success('Successfully deleted todo', {
            position: ToastPosition.BOTTOM,
            duration: 1500,
          });
        }
      },
      onError: () => {
        toast.error('Failed to delete todo', {
          position: ToastPosition.BOTTOM,
          duration: 1500,
        });
      },
      onSettled: () => {
        onRequestClose();
      },
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={onRequestClose}>
      <DynamicView
        flex={1}
        variant="centerItems"
        backgroundColor="overlayColor">
        <DynamicView
          width="80%"
          p="S"
          backgroundColor="white"
          borderRadius={6}
          variant="centerItems">
          <DynamicText color="danger" fontFamily="Roboto-Medium" fontSize={18}>
            Delete Todo
          </DynamicText>
          <DynamicText
            py="XS"
            color="dark"
            fontFamily="Roboto-Medium"
            fontSize={18}>
            {item.text}
          </DynamicText>
          <DynamicText fontSize={16} color="dark" pb="XS">
            This action cannot be undone
          </DynamicText>
          <DynamicView variant="rowCenterItems">
            <DynamicPressable
              mr="S"
              borderRadius={4}
              p="4"
              opacity={isPending ? 0.5 : 1}
              disabled={isPending}
              backgroundColor="danger"
              variant="rowCenterItems"
              onPress={onDeletePress}>
              <FontAwesome name="trash" size={16} color={colors.white} />
              <DynamicText ml="4" fontSize={15} color="white">
                Delete
              </DynamicText>
            </DynamicPressable>
            <DynamicPressable
              borderRadius={4}
              p="4"
              disabled={isPending}
              backgroundColor="smokyBlack"
              variant="rowCenterItems"
              onPress={onRequestClose}>
              <FontAwesome name="times" size={16} color={colors.danger} />
              <DynamicText ml="4" fontSize={15}>
                Cancel
              </DynamicText>
            </DynamicPressable>
          </DynamicView>
        </DynamicView>
      </DynamicView>
    </Modal>
  );
}
