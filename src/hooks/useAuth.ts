import firebase from 'firebase';

import { useCallback, useEffect, useState } from 'react';
import { auth } from '../services/firebase';
import type { TUser } from '../types/User';

export function useAuth() {
  const [user, setUser] = useState<TUser>();

  const signInWithGoogle = useCallback(async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await auth.signInWithPopup(provider);

      if (result.user) {
        const { displayName, photoURL, uid } = result.user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        });
      }
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('User closed the popup before completing sign-in.');
        return;
      }
      console.error('Error signing in with Google:', error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const { displayName, photoURL, uid } = firebaseUser;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        });
      } else {
        setUser(undefined);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signInWithGoogle
  };
}
