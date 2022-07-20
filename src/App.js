import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { store } from 'store';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import { BrowserRouter as Router } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import { renderRoutes } from 'react-router-config';
import routes from 'routes';
import './assets/scss/index.scss';
import { ScrollReset } from 'components';
import './App.css';
import { SnackbarProvider } from 'notistack';
import { Button } from '@material-ui/core';
// const history = createBrowserHistory();

function App() {
  const notistackRef = React.createRef();
  const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          action={(key) => (
            <Button
              onClick={onClickDismiss(key)}
              style={{
                'position': 'absolute',
                'left': '0px',
                'width': '100%',
                'height': '100%',
                'color': 'unset',
                'background': '#ffffff00',
                'padding': '0px',
                'margin': '0px',
                'minWidth': '25px',
              }}
            />
          )}
          ref={notistackRef}
        >
          <Router>
            <ScrollReset />
            {renderRoutes(routes)}
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
