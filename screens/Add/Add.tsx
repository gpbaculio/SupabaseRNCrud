import React, {useState} from 'react';

import {DynamicTextInput, DynamicView} from 'components';
import AddButton from './AddButton';

export default function Add() {
  const [text, setText] = useState('');

  return (
    <DynamicView backgroundColor="light" flex={1} p="L">
      <DynamicView variant="rowCenterItems">
        <DynamicTextInput
          p="S"
          placeholder="What needs to be done?"
          borderTopLeftRadius={8}
          borderBottomLeftRadius={8}
          flex={0.8}
          borderColor="divider"
          borderWidth={1}
          value={text}
          onChangeText={value => setText(value)}
        />
        <AddButton text={text} setText={setText} />
      </DynamicView>
    </DynamicView>
  );
}
