import React from 'react';
import { render, act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SpotifyAuthProvider, useSpotifyAuth, default as AuthService } from '../services/AuthService.js';
import axios from 'axios';

jest.mock('axios');


// Mock local storage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: jest.fn(key => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock component to test the context
const TestComponent = () => {
  const { token, login, logout, refreshToken } = useSpotifyAuth();
  return (
    <div>
      <div data-testid="token">{token}</div>
      <button onClick={login} data-testid="login">Login</button>
      <button onClick={logout} data-testid="logout">Logout</button>
      <button onClick={refreshToken} data-testid="refresh">Refresh Token</button>
    </div>
  );
};

describe('AuthService', () => {
  beforeEach(() => {
    window.localStorage.clear();
    delete window.location;
    window.location = { hash: '', href: 'http://localhost' };
  });

  test('login redirects to Spotify authorization page', () => {
    AuthService.login();
    expect(window.location.href).toContain('accounts.spotify.com/authorize');
  });

  test('logout clears access token', () => {
    window.localStorage.setItem('access_token', 'test_token');
    AuthService.logout();
    expect(window.localStorage.getItem('access_token')).toBeNull();
  });

  test('getToken extracts token from URL hash', () => {
    window.location.hash = '#access_token=test_token';
    const token = AuthService.getToken();
    expect(token).toBe('test_token');
  });

  test('handleAuthCallback stores token on successful login', () => {
    window.location.hash = '#access_token=test_token';
    const result = AuthService.handleAuthCallback();
    expect(result.type).toBe('LOGIN_SUCCESS');
    expect(result.payload.accessToken).toBe('test_token');
    expect(window.localStorage.getItem('access_token')).toBe('test_token');
  });

  test('handleAuthCallback returns error on failed login', () => {
    window.location.hash = '';
    const result = AuthService.handleAuthCallback();
    expect(result.type).toBe('LOGIN_FAILURE');
    expect(result.payload.error).toBe('No token found in URL');
  });

  test('refreshToken updates tokens in localStorage', async () => {
    axios.post.mockResolvedValue({ 
      data: { 
        access_token: 'new_access_token', 
        refresh_token: 'new_refresh_token' 
      } 
    });

    window.localStorage.setItem('refresh_token', 'old_refresh_token');
    await AuthService.refreshToken();

    expect(window.localStorage.getItem('access_token')).toBe('new_access_token');
    expect(window.localStorage.getItem('refresh_token')).toBe('new_refresh_token');
  });
});

describe('SpotifyAuthProvider', () => {
  test('provides authentication context to child components', async () => {
    render(
      <SpotifyAuthProvider>
        <TestComponent />
      </SpotifyAuthProvider>
    );

    expect(screen.getByTestId('token')).toHaveTextContent('');

    // Simulate successful login
    window.location.hash = '#access_token=test_token';
    await act(async () => {
      AuthService.handleAuthCallback();
    });

    await waitFor(() => {
      expect(screen.getByTestId('token')).toHaveTextContent('test_token');
    });

    // Test logout
    await act(async () => {
      userEvent.click(screen.getByTestId('logout'));
    });

    expect(screen.getByTestId('token')).toHaveTextContent('');

    // Test refresh token
    axios.post.mockResolvedValue({ 
      data: { 
        access_token: 'new_access_token', 
        refresh_token: 'new_refresh_token' 
      } 
    });

    await act(async () => {
      userEvent.click(screen.getByTestId('refresh'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('token')).toHaveTextContent('new_access_token');
    });
  });
});