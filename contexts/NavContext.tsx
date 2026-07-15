"use client";

import React, { createContext, useContext, useState } from 'react';

export interface NavSelection {
  category: string;
  subItem?: string;
}

interface NavContextType {
  selection: NavSelection;
  setSelection: (s: NavSelection) => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [selection, setSelection] = useState<NavSelection>({ category: 'live' });
  return (
    <NavContext.Provider value={{ selection, setSelection }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error('useNav must be used within NavProvider');
  return ctx;
}