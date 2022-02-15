import '../styles/globals.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#ed1c24'
    },
    secondary: {
      main: '#235789'
    }
  }
});
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ed1c24'
    },
    secondary: {
      main: '#235789'
    },
    background: {
      paper: '#000'
    }
  }
})

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
