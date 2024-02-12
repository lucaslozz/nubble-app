import React = require('react');

import {fireEvent, render, screen} from 'test-utils';

import {PasswordInput, IconProps} from '@components';

describe('<PasswordInput/>', () => {
  it('starts with hidden password', () => {
    const mockedOnChange = jest.fn();
    render(
      <PasswordInput
        label="Password"
        placeholder="password"
        value="123456"
        onChange={mockedOnChange}
      />,
    );

    const inputElement = screen.getByPlaceholderText(/password/i);

    expect(inputElement.props.secureTextEntry).toBeTruthy();
  });

  it('should show the password and change the icon to eye off, when the eye icon is pressed', () => {
    const mockedOnChange = jest.fn();
    render(
      <PasswordInput
        label="Password"
        placeholder="password"
        value="123456"
        onChange={mockedOnChange}
      />,
    );

    const eyeOn: IconProps['name'] = 'eyeOn';
    const eyeOff: IconProps['name'] = 'eyeOff';

    fireEvent.press(screen.getByTestId(eyeOn));

    const eyeOffElement = screen.getByTestId(eyeOff);
    const inputElement = screen.getByPlaceholderText(/password/i);

    expect(eyeOffElement).toBeOnTheScreen();
    expect(inputElement.props.secureTextEntry).toBeFalsy();
  });
});
