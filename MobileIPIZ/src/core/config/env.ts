import { Platform } from 'react-native';

const rawApiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();
const defaultApiBaseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

export const env = {
  apiBaseUrl: (rawApiBaseUrl || defaultApiBaseUrl).replace(/\/+$/, ''),
  requestTimeoutMs: 8000,
  useMockApi: process.env.EXPO_PUBLIC_USE_MOCK_API === 'true',
};
