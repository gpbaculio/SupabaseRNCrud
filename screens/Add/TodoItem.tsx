import React from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {DynamicText, DynamicView} from 'components';

import {Todo} from 'hooks/useGetTodos';
import {colors} from 'theme/themeConfig';

type TodoProps = {
  item: Todo;
};

export default function TodoItem({item}: TodoProps) {
  return (
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
}
