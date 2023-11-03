import React from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {DynamicPressable, DynamicText} from 'components';
import {colors} from 'theme/themeConfig';

type CancelButtonProps = {
  onPress: () => void;
};

export default function CancelButton({onPress}: CancelButtonProps) {
  return (
    <DynamicPressable
      variant="rowCenterItems"
      borderColor="divider"
      borderWidth={1}
      py="4"
      px="4"
      borderRadius={4}
      onPress={onPress}
      backgroundColor="smokyBlack">
      <FontAwesome name="times" size={16} color={colors.danger} />
      <DynamicText ml="4">Cancel</DynamicText>
    </DynamicPressable>
  );
}
