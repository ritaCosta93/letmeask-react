import type { ReactNode } from 'react';
import type { TUser } from './User';

export type TAuthContextType = {
  user: TUser | undefined;
  signInWithGoogle: () => Promise<void>;
};

export type TAuthContextProviderProps = {
  children: ReactNode;
};
