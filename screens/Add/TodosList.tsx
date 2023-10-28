import {FlatList, StyleSheet, ListRenderItem} from 'react-native';
import React from 'react';

import {DynamicText, DynamicView} from 'components';
import {useGetTodos} from 'hooks';

import {colors} from 'theme/themeConfig';

import {Todo} from 'hooks/useGetTodos';

function Separator() {
  return <DynamicView height={1} backgroundColor="divider" />;
}

export default function TodosList() {
  const {data} = useGetTodos();

  const renderItem: ListRenderItem<Todo> = ({item}) => (
    <DynamicView padding="S" variant="rowCenterItems">
      <DynamicText>{item.text}</DynamicText>
    </DynamicView>
  );
  console.log('data ', data);
  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      data={data?.pages.flat()}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      ItemSeparatorComponent={Separator}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.divider,
  },
});
