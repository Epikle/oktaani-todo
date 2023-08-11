/* eslint-disable react/jsx-props-no-spreading */
import { fireEvent, render } from '@testing-library/react';

import ColorChooser from './ColorChooser';
import useSelectedStore from '../../context/useSelectedStore';
import useTodoStore from '../../context/useTodoStore';
import useStatusStore from '../../context/useStatusStore';

const setColorFnMock = vi.fn();
const spySelectedColor = vi.spyOn(useSelectedStore.getState(), 'color', 'get');
const spySelectedCollection = vi.spyOn(useSelectedStore.getState().actions, 'setSelectedCollection');
const spyEditCollection = vi.spyOn(useTodoStore.getState().actions, 'editCollection');
const spySetError = vi.spyOn(useStatusStore.getState().actions, 'setError');

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
    expect(spySelectedCollection).toBeCalledTimes(0);
  });

  it('Click color input should fire handlerfn with editCollection fn', () => {
    spySelectedColor.mockImplementation(() => 'true');
    const { getByTestId } = render(<ColorChooser defaultColor="#FF0000" color="#FF0000" setColor={setColorFnMock} />);
    const input = getByTestId('input-color') as HTMLInputElement;
    fireEvent.blur(input, { target: { value: '#00ff00' } });
    expect(input.value).toContain('#00ff00');
    expect(setColorFnMock).toBeCalledTimes(0);
  });

  it('Edit collection should throw error', () => {
    spySelectedColor.mockImplementation(() => 'true');
    spyEditCollection.mockImplementation(() => {
      throw new Error('Error');
    });
    const { getByTestId } = render(<ColorChooser defaultColor="#FF0000" color="#FF0000" setColor={setColorFnMock} />);
    const input = getByTestId('input-color') as HTMLInputElement;
    fireEvent.blur(input, { target: { value: '#00ff00' } });
    expect(input.value).toContain('#00ff00');
    expect(setColorFnMock).toBeCalledTimes(0);
    expect(spySetError).toBeCalledTimes(1);
  });
});

afterEach(() => {
  vi.resetAllMocks();
});
