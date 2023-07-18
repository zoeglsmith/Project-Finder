// This file is to be deleted 

import React from 'react';
import { render } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders a greeting', () => {
    const { getByText } = render(<MyComponent />);
    expect(getByText('Hello, world!')).toBeInTheDocument();
  });
});

//This test renders MyComponent and checks that it contains the text "Hello, world!".

