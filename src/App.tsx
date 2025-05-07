import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { ProfileProvider } from './context/ProfileContext';
import AppContent from './components/AppContent';
import '@solana/wallet-adapter-react-ui/styles.css';

const wallets = [new PhantomWalletAdapter()];

function App() {
  return (
    <Router>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ProfileProvider>
            <AppContent />
          </ProfileProvider>
        </WalletModalProvider>
      </WalletProvider>
    </Router>
  );
}

export default App;
