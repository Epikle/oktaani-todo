import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import BtnDelete from './BtnDelete';

describe('BtnDelete', () => {
  it('Delete btn is showing', () => {
    const dispatch = jest.fn();

    render(<BtnDelete dispatch={dispatch} collectionId="1" />);
    const btn = screen.getByTestId('btn-delete');

    expect(btn).toBeInTheDocument();
  });

  it('When clicked btn dispatchFn should be called twice', () => {
    jest.spyOn(global, 'confirm').mockReturnValueOnce(true);
    const dispatch = jest.fn();

    render(<BtnDelete dispatch={dispatch} collectionId="1" />);
    const btn = screen.getByTestId('btn-delete');
    btn.click();

    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
