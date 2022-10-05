import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from './app/store';
import { server, rest } from './mocks/server';
import App from './App';

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    // store = configureStore({ reducer: { posts: postsReducer }, preloadedState }),
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

test('success state', async () => {
    renderWithProviders(
        <App />
    );

    expect(screen.getByText(/idle/i)).toBeInTheDocument();

    const button = screen.getByText(/click me/i);

    fireEvent.click(button);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    expect(await screen.findByText(/success/i)).toBeInTheDocument();
});

/*
 * Notes: 
 * - test for same endpoint but different use cases
 * - reset redux store between tests
 * - run saga middleware between tests
 */

test('failed state', async () => {
    server.use(
        rest.get('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
            return res(
                ctx.status(500)
            );
        })
    );

    renderWithProviders(
        <App />
    );

    expect(screen.getByText(/idle/i)).toBeInTheDocument();

    const button = screen.getByText(/click me/i);

    fireEvent.click(button);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    expect(await screen.findByText(/fail/i)).toBeInTheDocument();
});
