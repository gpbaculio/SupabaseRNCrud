import {createText} from '@shopify/restyle';

import DynamicView, {DynamicAnimatedView} from './DynamicView';
import DynamicPressable from './DynamicPressable';
import DynamicTextInput from './DynamicTextInput';

import {Theme} from 'theme/theme';

const DynamicText = createText<Theme>();

export {
  DynamicText,
  DynamicView,
  DynamicAnimatedView,
  DynamicPressable,
  DynamicTextInput,
};
