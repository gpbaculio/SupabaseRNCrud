import {
  FlatList,
  StyleSheet,
  ListRenderItem,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

import {DynamicView} from 'components';
import TodoItem from './TodoItem';

import {useGetTodos} from 'hooks';

import {colors} from 'theme/themeConfig';

import {Todo} from 'hooks/useGetTodos';

function Separator() {
  return <DynamicView height={1} backgroundColor="divider" />;
}

export default function TodosList() {
  const {data, fetchNextPage, isFetchingNextPage, hasNextPage} = useGetTodos();

  const keyExtractor = (item: Todo, index: number) => `${item.id}-${index}`;

  const renderItem: ListRenderItem<Todo> = ({item}) => <TodoItem item={item} />;

  const renderFooter = () => (
    <>
      {isFetchingNextPage ? (
        <DynamicView pb="S">
          <ActivityIndicator color={colors.primary} size="large" />
        </DynamicView>
      ) : null}
    </>
  );

  const onEndReached = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <DynamicView flex={1} flexDirection="column">
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={data?.pages.flat()}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={Separator}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        onEndReached={onEndReached}
      />
    </DynamicView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.divider,
  },
});
