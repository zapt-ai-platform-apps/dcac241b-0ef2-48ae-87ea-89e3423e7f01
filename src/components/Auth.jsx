import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function AuthComponent({ onAuthChange }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        console.log('[Auth] onAuthStateChange event:', event);
        onAuthChange(session);
      }
    });
    return () => {
      subscription?.unsubscribe();
    };
  }, [onAuthChange]);

  return (
    <div className="min-h-screen h-full flex flex-col items-center justify-center p-4">
      <a
        className="mb-4 text-xl underline cursor-pointer"
        href="https://www.zapt.ai"
        target="_blank"
        rel="noreferrer"
      >
        Sign in with ZAPT
      </a>
      <div className="w-full max-w-xs">
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#FFD700', // gold
                  brandAccent: '#FFD700'
                }
              }
            }
          }}
          theme="dark"
        />
        {loading && <p className="mt-2">Loading...</p>}
      </div>
    </div>
  );
}