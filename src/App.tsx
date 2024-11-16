import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import Dashboard from './components/Dashboard/Dashboard';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.spacing.large};
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <Dashboard />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
