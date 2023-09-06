import axios from 'axios';

import env from '../utils/env';
import { StatsTypes } from '../utils/types';

const api = axios.create({
  baseURL: env.API_URL,
});

// eslint-disable-next-line import/prefer-default-export
export const createStatsByType = async (type: StatsTypes): Promise<void> => {
  try {
    await api.post('/stats', { type });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('API Server not responding.');
  }
};
