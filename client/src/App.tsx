import { memo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  StyledEngineProvider,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { Layout } from 'components/common/Layout';
import { Router } from './Router';
import { theme } from 'theme';

const queryClient = new QueryClient();

export const App = memo(() => {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Router />
            </Layout>
          </ThemeProvider>
        </BrowserRouter>
      </StyledEngineProvider>
    </QueryClientProvider>
  );
});
