import { BrowserRouter } from 'react-router-dom';

import { AppProvider, LoadingProvider } from './common/context';
import { AppRouter } from './router/AppRouter';
import { AuthProvider } from './auth/context/AuthContext';

export const App = () => {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <AppProvider>
          <AuthProvider>
              <AppRouter/>
          </AuthProvider>
        </AppProvider>
      </LoadingProvider>
    </BrowserRouter>
  )
}
