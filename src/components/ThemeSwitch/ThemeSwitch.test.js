import React from 'react';
import { useIdentityContext } from 'react-netlify-identity';

import { render, fireEvent } from '../../utils/testUtils';

import ThemeSwitch, { validOrigins } from '.';

jest.mock('react-netlify-identity');

beforeEach(() => {
  useIdentityContext.mockReturnValue({});
});

const primaryColorClassName = 'has-text-primary';

beforeEach(() => localStorage.clear());

describe('<ThemeSwitch />', () => {
  validOrigins.forEach(origin => {
    test(`it renders successfully from ${origin}`, () => {
      render(<ThemeSwitch from={origin} />);
    });

    test(`it changes the theme onclick from ${origin}`, () => {
      const { getByTestId } = render(<ThemeSwitch from={origin} />);

      const button = getByTestId('toggle-theme');
      const switchElement = getByTestId('theme-switch');

      expect(switchElement.checked).toBe(true);

      fireEvent.click(button);

      expect(switchElement.checked).toBe(false);
    });

    test(`it indicates the active theme visually in ${origin}`, () => {
      const { getByTestId } = render(<ThemeSwitch from={origin} />);

      const button = getByTestId('toggle-theme');
      const sun = getByTestId('sun');
      const moon = getByTestId('moon');

      expect(moon.classList.contains(primaryColorClassName)).toBeTruthy();
      expect(sun.classList.contains(primaryColorClassName)).toBeFalsy();

      fireEvent.click(button);

      expect(moon.classList.contains(primaryColorClassName)).toBeFalsy();
      expect(sun.classList.contains(primaryColorClassName)).toBeTruthy();
    });
  });
});
