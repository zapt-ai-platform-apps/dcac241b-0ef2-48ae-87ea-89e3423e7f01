import React from 'react';
import { useSession } from './hooks/useSession';
import { useUserSettings } from './hooks/useUserSettings';

import AuthComponent from './components/Auth';
import Layout from './components/Layout';
import Home from './components/Home';
import Tools from './components/Tools';
import Community from './components/Community';
import Rewards from './components/Rewards';
import Settings from './components/Settings';

export default function App() {
  const { session, onAuthChange, handleSignOut } = useSession();
  const { theme, voiceSpeed, fetchUserSettings } = useUserSettings(session);

  const [view, setView] = React.useState('home');

  React.useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) setView(hash);
    const onHashChange = () => {
      const newHash = window.location.hash.replace('#', '');
      setView(newHash || 'home');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const renderView = () => {
    switch (view) {
      case 'home':
        return <Home />;
      case 'tools':
        return <Tools />;
      case 'community':
        return <Community />;
      case 'rewards':
        return <Rewards />;
      case 'settings':
        return (
          <Settings
            refreshSettings={fetchUserSettings}
          />
        );
      default:
        return <Home />;
    }
  };

  if (!session) {
    return <AuthComponent onAuthChange={onAuthChange} />;
  }

  return (
    <Layout onSignOut={handleSignOut} appTheme={theme}>
      {renderView()}
    </Layout>
  );
}