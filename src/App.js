import React from 'react';
import MainComponent from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import {useMediaQuery, createMuiTheme} from '@material-ui/core'
import {Provider} from 'react-redux';
import store from './redux/storeConfig';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        type:  prefersDarkMode ? 'dark' : 'light',
    }
  });
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <MainComponent/>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;