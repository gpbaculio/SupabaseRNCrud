import {
  FlatList,
  StyleSheet,
  ListRenderItem,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {DynamicText, DynamicView} from 'components';

import {useGetTodos} from 'hooks';

import {colors} from 'theme/themeConfig';

import {Todo} from 'hooks/useGetTodos';

function Separator() {
  return <DynamicView height={1} backgroundColor="divider" />;
}

export default function TodosList() {
  const {data, fetchNextPage, isFetchingNextPage, hasNextPage} = useGetTodos();

  const renderItem: ListRenderItem<Todo> = ({item}) => (
    <DynamicView
      padding="S"
      variant="rowCenterItems"
      justifyContent="space-between">
      <DynamicText>{item.text}</DynamicText>
      <DynamicView variant="rowCenterItems" justifyContent="space-between">
        <DynamicView
          variant="rowCenterItems"
          borderColor="divider"
          borderWidth={1}
          py="4"
          px="4"
          borderRadius={4}
          mr="XS"
          backgroundColor="smokyBlack">
          <FontAwesome name="edit" size={16} color={colors.success} />
          <DynamicText ml="4">Edit</DynamicText>
        </DynamicView>
        <DynamicView
          variant="rowCenterItems"
          borderColor="divider"
          borderWidth={1}
          py="4"
          px="4"
          borderRadius={4}
          backgroundColor="smokyBlack">
          <FontAwesome name="trash" size={16} color={colors.danger} />
          <DynamicText ml="4">Delete</DynamicText>
        </DynamicView>
      </DynamicView>
    </DynamicView>
  );

  const renderFooter = () => (
    <>
      {isFetchingNextPage ? (
        <DynamicView pb="S">
          <ActivityIndicator color={colors.primary} size="large" />
        </DynamicView>
      ) : null}
    </>
  );

  return (
    <DynamicView flex={1} flexDirection="column">
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={data?.pages.flat()}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        ItemSeparatorComponent={Separator}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        onEndReached={() => {
          if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage();
          }
        }}
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
