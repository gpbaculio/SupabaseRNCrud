import React from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {DynamicPressable, DynamicText} from 'components';

import {colors} from 'theme/themeConfig';

export default function DeleteButton() {
  return (
    <DynamicPressable
      variant="rowCenterItems"
      borderColor="divider"
      borderWidth={1}
      py="4"
      px="4"
      borderRadius={4}
      backgroundColor="smokyBlack">
      <FontAwesome name="trash" size={16} color={colors.danger} />
      <DynamicText ml="4">Delete</DynamicText>
    </DynamicPressable>
  );
}
