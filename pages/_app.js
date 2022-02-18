import '../styles/globals.css'
import { ThemeProvider } from '@mui/material/styles';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../src/features/redux/store';
import { darkTheme } from '../styles/MUIthemes';


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
