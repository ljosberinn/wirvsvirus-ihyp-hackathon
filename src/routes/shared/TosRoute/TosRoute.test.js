import React from 'react';
import { useIdentityContext } from 'react-netlify-identity';

import { render } from '../../../utils/testUtils';

import TosRoute from '.';

jest.mock('react-netlify-identity');

beforeEach(() => {
  useIdentityContext.mockReturnValue({});
});

describe('<TosRoute />', () => {
  it('should render without crashing', () => {
    render(<TosRoute />);
  });
});
