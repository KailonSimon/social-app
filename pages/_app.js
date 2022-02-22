import '../styles/globals.css'
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from '../styles/MUIthemes';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <ThemeProvider theme={darkTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
