import React, {useState} from 'react';
import {Modal} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {DynamicPressable, DynamicText, DynamicView} from 'components';

import {colors} from 'theme/themeConfig';
import {Todo} from 'hooks/useGetTodos';

type DeleteButtonProps = {
  item: Todo;
};

export default function DeleteButton({item}: DeleteButtonProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <DynamicView
          flex={1}
          variant="centerItems"
          backgroundColor="overlayColor">
          <DynamicView
            width="80%"
            p="S"
            backgroundColor="white"
            borderRadius={6}
            variant="centerItems">
            <DynamicText
              color="danger"
              fontFamily="Roboto-Medium"
              fontSize={18}>
              Delete Todo
            </DynamicText>
            <DynamicText
              py="XS"
              color="dark"
              fontFamily="Roboto-Medium"
              fontSize={18}>
              {item.text}
            </DynamicText>
            <DynamicText fontSize={16} color="dark" pb="XS">
              This action cannot be undone
            </DynamicText>
            <DynamicView variant="rowCenterItems">
              <DynamicPressable
                mr="S"
                borderRadius={4}
                p="4"
                backgroundColor="danger"
                variant="rowCenterItems"
                onPress={() => setModalVisible(false)}>
                <FontAwesome name="trash" size={16} color={colors.white} />
                <DynamicText ml="4" fontSize={15} color="white">
                  Delete
                </DynamicText>
              </DynamicPressable>
              <DynamicPressable
                borderRadius={4}
                p="4"
                backgroundColor="smokyBlack"
                variant="rowCenterItems"
                onPress={() => setModalVisible(false)}>
                <FontAwesome name="times" size={16} color={colors.danger} />
                <DynamicText ml="4" fontSize={15}>
                  Cancel
                </DynamicText>
              </DynamicPressable>
            </DynamicView>
          </DynamicView>
        </DynamicView>
      </Modal>
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
