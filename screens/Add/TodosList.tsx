import {
  FlatList,
  StyleSheet,
  ListRenderItem,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {DynamicPressable, DynamicText, DynamicView} from 'components';
import {useGetTodos} from 'hooks';

import {colors, spacing} from 'theme/themeConfig';

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
      <DynamicView
        variant="rowCenterItems"
        width="12%"
        justifyContent="space-between">
        <FontAwesome
          name="edit"
          size={16}
          color={colors.success}
          style={styles.trash}
        />
        <FontAwesome name="trash" size={16} color={colors.danger} />
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
      {!isFetchingNextPage && hasNextPage ? (
        <DynamicPressable
          p="S"
          mt="S"
          width="100%"
          borderRadius={8}
          backgroundColor="primary"
          onPress={() => fetchNextPage()}
          variant="centerItems"
          position="absolute">
          <DynamicText>Load More</DynamicText>
        </DynamicPressable>
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
  trash: {
    marginLeft: spacing.XS,
  },
});
