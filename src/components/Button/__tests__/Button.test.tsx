import React from 'react';
import {StyleSheet} from 'react-native';

import {ReactTestInstance} from 'react-test-renderer';
import {fireEvent, render, screen} from 'test-utils';

import {theme} from '@theme';

import {Button, ButtonProps} from '../Button';

function renderComponent(props?: Partial<ButtonProps>) {
  render(<Button title="Button Title" {...props} />);

  const titleElement = screen.queryByText(/button title/i);
  const loadingElement = screen.queryByTestId('activity-indicator');
  const buttonElement = screen.queryByTestId('button-element');

  return {titleElement, loadingElement, buttonElement};
}

describe('<Button />', () => {
  it('should call onPress fuction when the button is pressed', () => {
    const mockedOnPress = jest.fn();
    const {titleElement} = renderComponent({onPress: mockedOnPress});

    fireEvent.press(titleElement as ReactTestInstance);

    expect(mockedOnPress).toHaveBeenCalled();
  });

  it('should not call onPress fuction when the button is disabled', () => {
    const mockedOnPress = jest.fn();
    const {titleElement} = renderComponent({
      onPress: mockedOnPress,
      disabled: true,
    });

    fireEvent.press(titleElement as ReactTestInstance);

    expect(mockedOnPress).not.toHaveBeenCalled();
  });

  it('should tint the background to gray if the button is disabled', () => {
    const {titleElement} = renderComponent({disabled: true});

    const titleStyle = StyleSheet.flatten(titleElement?.props.style);

    expect(titleStyle.color).toEqual(theme.colors.gray2);
  });

  it('should render activity indicator, disable button and hide the title if loading is true', () => {
    const mockedOnPress = jest.fn();
    const {titleElement, loadingElement, buttonElement} = renderComponent({
      loading: true,
      onPress: mockedOnPress,
    });

    fireEvent.press(buttonElement as ReactTestInstance);

    expect(titleElement).not.toBeOnTheScreen();
    expect(loadingElement).toBeOnTheScreen();
    expect(mockedOnPress).not.toHaveBeenCalled();
  });
});
