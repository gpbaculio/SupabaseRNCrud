import React from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {DynamicPressable, DynamicText} from 'components';

import {colors} from 'theme/themeConfig';

type EditButtonProps = {
  onPress: () => void;
};

export default function EditButton({onPress}: EditButtonProps) {
  return (
    <DynamicPressable
      variant="rowCenterItems"
      borderColor="divider"
      borderWidth={1}
      py="4"
      px="4"
      onPress={onPress}
      borderRadius={4}
      mr="XS"
      backgroundColor="smokyBlack">
      <FontAwesome name="edit" size={16} color={colors.success} />
      <DynamicText ml="4">Edit</DynamicText>
    </DynamicPressable>
  );
}
