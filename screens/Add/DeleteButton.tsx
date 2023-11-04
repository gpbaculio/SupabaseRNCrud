import React, {useState} from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {DynamicPressable, DynamicText} from 'components';

import {colors} from 'theme/themeConfig';
import {Todo} from 'hooks/useGetTodos';
import DeleteModal from './DeleteModal';

type DeleteButtonProps = {
  item: Todo;
};

export default function DeleteButton({item}: DeleteButtonProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const onRequestClose = () => {
    setModalVisible(false);
  };

  return (
    <>
      <DeleteModal
        item={item}
        modalVisible={modalVisible}
        onRequestClose={onRequestClose}
      />
      <DynamicPressable
        variant="rowCenterItems"
        borderColor="divider"
        borderWidth={1}
        py="4"
        px="4"
        borderRadius={4}
        backgroundColor="smokyBlack"
        onPress={() => {
          setModalVisible(true);
        }}>
        <FontAwesome name="trash" size={16} color={colors.danger} />
        <DynamicText ml="4">Delete</DynamicText>
      </DynamicPressable>
    </>
  );
}
