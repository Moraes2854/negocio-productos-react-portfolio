import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { NegocioProductApp } from './NegocioProductApp';
import { LoadingProvider } from './common/context/LoadingContext';
import { AuthProvider } from './auth/context/AuthContext';
import { AppProvider } from './common/context/AppContext';

const client = new QueryClient();


export const App = () => {
  return (
    <QueryClientProvider client={ client }>
      <AppProvider>
        <AuthProvider>
            <LoadingProvider>
              <NegocioProductApp/>
            </LoadingProvider>
        </AuthProvider>
      </AppProvider>
    </QueryClientProvider>
  )
}
