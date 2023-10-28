import React, {Suspense, useState} from 'react';

import {DynamicText, DynamicTextInput, DynamicView} from 'components';
import AddButton from './AddButton';

import TodosList from './TodosList';

function Add() {
  const [text, setText] = useState('');

  return (
    <DynamicView backgroundColor="light" flex={1} p="L">
      <DynamicView variant="rowCenterItems" mb="L">
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
      <TodosList />
    </DynamicView>
  );
}

export default function () {
  return (
    <Suspense
      fallback={
        <DynamicView flex={1} variant="centerItems">
          <DynamicText>Loading...</DynamicText>
        </DynamicView>
      }>
      <Add />
    </Suspense>
  );
}
