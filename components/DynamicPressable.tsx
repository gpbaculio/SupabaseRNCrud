import {Pressable, PressableProps} from 'react-native';

import Animated from 'react-native-reanimated';
import {
  createBox,
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle';

import {Theme} from 'theme/theme';

const BoxPressable = createBox<Theme, PressableProps>(Pressable);

const DynamicPressable = createRestyleComponent<
  VariantProps<Theme, 'buttonVariants'> &
    React.ComponentProps<typeof BoxPressable>,
  Theme
>([createVariant({themeKey: 'buttonVariants'})], BoxPressable);

export const DynamicAnimatedPressable =
  Animated.createAnimatedComponent(DynamicPressable);

export default DynamicPressable;
