import {Dimensions} from 'react-native';
import React from 'react';

import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Path, Rect, Svg} from 'react-native-svg';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';

import {
  DynamicAnimatedView,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from 'components';

const {width} = Dimensions.get('window');

export default function TabBar({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) {
  const x = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    const translateX = interpolate(
      x.value,
      [0, 1, 2],
      [0, width / 3, width - width / 3],
    );

    return {
      position: 'absolute',
      width,
      height: 45,
      transform: [{translateX}, {translateY: -9}],
    };
  });

  return (
    <DynamicView>
      <DynamicView flexDirection="row" backgroundColor="light">
        <DynamicAnimatedView style={style}>
          <Svg width={width / 3} height="45" viewBox="0 0 209 45" fill="none">
            <Rect x="23" width="163" height="45" rx="16" fill="#FFC244" />
            <Path
              d="M209 44.5H164V4C164 4 186.05 4 186.5 24.25C186.95 44.5 209 44.5 209 44.5Z"
              fill="#FFC244"
              stroke="#FFC244"
            />
            <Path
              d="M1.19209e-06 44.5H45V4C45 4 22.95 4 22.5 24.25C22.05 44.5 1.19209e-06 44.5 1.19209e-06 44.5Z"
              fill="#FFC244"
              stroke="#FFC244"
            />
          </Svg>
        </DynamicAnimatedView>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            x.value = withTiming(index);
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({
                name: route.name,
                merge: true,
                params: undefined,
              });
            }
          };

          return (
            <DynamicPressable
              key={index}
              onPress={onPress}
              flex={1}
              justifyContent="center"
              alignItems="center"
              height={27}>
              <DynamicView flex={1} justifyContent="center" alignItems="center">
                <DynamicText>{label as string}</DynamicText>
              </DynamicView>
            </DynamicPressable>
          );
        })}
      </DynamicView>
      <DynamicView backgroundColor="white" height={12} width="100%">
        <DynamicView
          backgroundColor="primary"
          width="100%"
          height={16}
          borderTopRightRadius={state.index === 1 ? 8 : undefined}
          borderTopLeftRadius={state.index === 1 ? 8 : undefined}
        />
      </DynamicView>
    </DynamicView>
  );
}
