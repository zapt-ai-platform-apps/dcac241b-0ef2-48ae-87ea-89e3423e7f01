import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export function useSession() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log('[App] Current session:', data.session);
      setSession(data.session);
    });
  }, []);

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('[App] onAuthStateChange event:', event);
        setSession(currentSession);
      }
    );
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const onAuthChange = (newSession) => {
    setSession(newSession);
  };

  const handleSignOut = async () => {
    console.log('[App] Handling sign out');
    await supabase.auth.signOut();
  };

  return { session, onAuthChange, handleSignOut };
}