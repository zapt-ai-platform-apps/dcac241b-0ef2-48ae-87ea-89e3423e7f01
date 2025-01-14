import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

import AuthComponent from './components/Auth';
import Layout from './components/Layout';
import Home from './components/Home';
import Tools from './components/Tools';
import Community from './components/Community';
import Rewards from './components/Rewards';
import Settings from './components/Settings';

export default function App() {
  const [session, setSession] = useState(null);
  const [view, setView] = useState('home');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log('[App] Current session:', data.session);
      setSession(data.session);
    });
  }, []);

  const onAuthChange = (newSession) => {
    setSession(newSession);
  };

  const handleSignOut = async () => {
    console.log('[App] Handling sign out');
    await supabase.auth.signOut();
  };

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
        return <Settings />;
      default:
        return <Home />;
    }
  };

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) setView(hash);
    const onHashChange = () => {
      const newHash = window.location.hash.replace('#', '');
      setView(newHash || 'home');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (!session) {
    return <AuthComponent onAuthChange={onAuthChange} />;
  }

  return (
    <Layout onSignOut={handleSignOut}>
      {renderView()}
    </Layout>
  );
}