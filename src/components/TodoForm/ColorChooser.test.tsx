import { fireEvent, render } from '@testing-library/react';

import ColorChooser from './ColorChooser';

const setColorFnMock = vi.fn();

describe('ColorChooser', () => {
  it('Should have default color set', () => {
    const { getByTestId } = render(<ColorChooser defaultColor="#FF0000" color="#FF0000" setColor={vi.fn()} />);
    const input = getByTestId('input-color');
    expect(input.getAttribute('value')).toContain('#FF0000');
  });

  it('Click color input should fire handlerfn with setColor prop fn', () => {
    const { getByTestId } = render(<ColorChooser defaultColor="#FF0000" color="#FF0000" setColor={setColorFnMock} />);
    const input = getByTestId('input-color') as HTMLInputElement;
    fireEvent.blur(input, { target: { value: '#00ff00' } });
    expect(input.value).toContain('#00ff00');
    expect(setColorFnMock).toBeCalledTimes(1);
  });
});

afterEach(() => {
  vi.resetAllMocks();
});
