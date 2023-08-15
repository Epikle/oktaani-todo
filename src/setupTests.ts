import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom/extend-expect';
import { Collection, ItemEntry } from './utils/types';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

export const testCollections: Collection[] = [
  {
    id: 'test-cid-1',
    title: 'test-1-title',
    color: '#7b68ee',
    shared: false,
    type: 'todo',
    createdAt: '2023-08-15T13:45:14.412Z',
  },
  {
    id: 'test-cid-2',
    title: 'test-2-title',
    color: '#ff0000',
    shared: true,
    type: 'todo',
    createdAt: '2023-08-15T13:45:14.412Z',
  },
];

export const testItem: ItemEntry = {
  message: 'test-item',
  colId: 'test-cid-1',
};
