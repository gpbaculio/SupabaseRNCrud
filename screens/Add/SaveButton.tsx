import React from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {DynamicPressable, DynamicText} from 'components';

import {colors} from 'theme/themeConfig';

type SaveButtonProps = {
  isValid: boolean;
  onPress: () => Promise<void>;
};

export default function SaveButton({isValid, onPress}: SaveButtonProps) {
  return (
    <DynamicPressable
      variant="rowCenterItems"
      borderColor="divider"
      borderWidth={1}
      py="4"
      px="4"
      opacity={isValid ? 0.5 : 1}
      disabled={isValid}
      onPress={onPress}
      borderRadius={4}
      mr="XS"
      backgroundColor="smokyBlack">
      <FontAwesome name="save" size={16} color={colors.success} />
      <DynamicText ml="4">Save</DynamicText>
    </DynamicPressable>
  );
}
