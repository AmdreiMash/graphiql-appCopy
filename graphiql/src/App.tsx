import { Navigate, Route, Routes } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import SignIn from './Pages/SignIn';
import Graphi from './Pages/Graphi';
import NotFound from './Pages/Page404/404';
import Layout from './сomponents/Layout';
import { withTranslation } from 'react-i18next';
import {
  Alert,
  ButtonStylesParams,
  ColorScheme,
  ColorSchemeProvider,
  Loader,
  MantineProvider,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useState } from 'react';
import SignUp from './Pages/SignUp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  const ReguireAuth = ({ children }: { children: React.ReactElement }) => {
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return (
        <Alert icon={<IconAlertCircle size="1rem" />} title="Attention!" color="red">
          {error.message}
        </Alert>
      );
    }
    return user ? children : <Navigate to="/signin" />;
  };

  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{
          colorScheme,
          fontSizes: {
            xs: '0.6rem',
            sm: '0.75rem',
            md: '0.9rem',
            lg: '1rem',
            xl: '1.2rem',
          },
          components: {
            Button: {
              // Subscribe to theme and component params
              styles: (_theme, _params: ButtonStylesParams, { variant }) => ({
                root: {
                  '&:hover': {
                    backgroundColor: variant === 'subtle' ? 'rgba(135, 131, 131, 0.1)' : undefined,
                  },
                },
              }),
            },
          },
          globalStyles: () => ({
            '.mantine-1tea8o2': {
              minHeight: 'calc(100vh - 90px)',
            },
            body: {
              '::-webkit-scrollbar': {
                width: '0',
              },
            },
          }),
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Welcome />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/graphi"
              element={
                <ReguireAuth>
                  <Graphi />
                </ReguireAuth>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default withTranslation()(App);
