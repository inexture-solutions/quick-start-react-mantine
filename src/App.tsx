import { FC } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { persistor, store } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import { routes } from '@/routes';
import { ThemeProvider } from '@inexture/core/providers';
import { theme } from '@/theme';

export const appMode: 'light' | 'dark' | 'auto' = 'light';

const App: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading="Initializing...">
        <ThemeProvider props={{ theme: theme, defaultColorScheme: appMode }}>
          <RouterProvider router={routes} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
