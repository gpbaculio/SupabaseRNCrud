import React, {Suspense} from 'react';

import {DynamicText, DynamicView} from 'components';

import TodosList from './TodosList';
import AddTodoSection from './AddTodoSection';

function Add() {
  return (
    <DynamicView backgroundColor="light" flex={1} p="L">
      <AddTodoSection />
      <TodosList />
    </DynamicView>
  );
}

export default function AddRoot() {
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
