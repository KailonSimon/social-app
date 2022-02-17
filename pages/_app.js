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
    },
    neutral: {
      main: 'rgb(110, 118, 125)'
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    lineHeight: '20px',
    fontSize: 14,
    headerH1: {
      fontWeight: 700,
      fontSize: '17px'
    },
    postH1: {
      fontWeight: 700,
    },
    postH2: {
      fontWeight: 400,
      color: 'rgb(110, 118, 125)'
    },
    postText: {
      fontWeight: 400,
    },
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
