import '../styles/global.scss';
import '../styles/main.scss';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  wallet,
  AvatarComponent,
} from '@rainbow-me/rainbowkit';
import { chain, createClient, configureChains, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { createTheme } from '@mui/material/styles';



import { Theme } from '@rainbow-me/rainbowkit';

import avatarimg from '../public/face.jpg';
import dynamic from 'next/dynamic';
//import AppBar from '../components/AppBar';
//import DrawingArea from './DrawingArea';


const ResponsiveAppBar = dynamic(() => import('../components/AppBar'), { ssr: false });




const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.mainnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'false'
      ? [chain.mainnet]
      : []),
  ],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_API, priority: 0 }),
    infuraProvider({ apiKey: process.env.INFURA_API, priority: 1}),
    publicProvider({ priority: 2 }),
  ]
);

const { wallets } = getDefaultWallets({
  appName: 'RainbowKit Mint NFT Demo',
  chains,
});

const demoAppInfo = {
  appName: 'RainbowKit Mint NFT Demo',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [wallet.argent({ chains }), wallet.trust({ chains })],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const theme = createTheme({
  palette: {
      primary: {
          main: "#a89be1",
          contrastText: "#ffffff",
      },
      secondary: {
          main: "#dabaee",
          contrastText: "#ffffff",
      },
      success: {
        main: "#9afa92",
        contrastText: "ffffff"
      },
  },
});


const myCustomTheme: Theme = {
  blurs: {
    modalOverlay: '...',
  },
  colors: {
    accentColor: 'white',
    accentColorForeground: '#1d1d1d',
    actionButtonBorder: 'solid black 2px',
    actionButtonBorderMobile: 'solid black 2px',
    actionButtonSecondaryBackground: 'white',
    closeButton: '...',
    closeButtonBackground: '...',
    connectButtonBackground: 'white',
    connectButtonBackgroundError: 'red',
    connectButtonInnerBackground: 'white',
    connectButtonText: '#1d1d1d',
    connectButtonTextError: '...',
    connectionIndicator: '#1d1d1d',
    error: '...',
    generalBorder: '...',
    generalBorderDim: '...',
    menuItemBackground: '...',
    modalBackdrop: '...',
    modalBackground: 'white',
    modalBorder: 'solid black 2px',
    modalText: 'black',
    modalTextDim: '...',
    modalTextSecondary: '...',
    profileAction: '...',
    profileActionHover: '...',
    profileForeground: '...',
    selectedOptionBorder: '...',
    standby: '...',
  },
  fonts: {
    body: '...',
  },
  radii: {
    actionButton: '6px',
    connectButton: '6px',
    menuButton: '6px',
    modal: '6px',
    modalMobile: '6px',
  },
  shadows: {
    connectButton: 'medium',
    dialog: '...',
    profileDetailsAction: '...',
    selectedOption: '...',
    selectedWallet: '...',
    walletLogo: '...',
  },
};



function MyApp({ Component, pageProps }: AppProps) {



  return (
    
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider theme={myCustomTheme} appInfo={demoAppInfo} chains={chains} coolMode>
        
      <ThemeProvider theme={theme}>

        <div className="provider">
          <div className="header">
            <ResponsiveAppBar/>
          </div>
            
            <Component {...pageProps} />

            <div className="footer">
              Made with ❤️ by Mason Keresty<br/>(@m_keresty, keresty.eth)
            </div>
        </div>
      </ThemeProvider>

      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;

