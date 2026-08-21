'use client';

import React from 'react';
import { ThemeProvider } from '@/lib/theme/theme-context';
import { ProcurementProvider } from '@/lib/store/procurement-store';

export const ClientProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <ProcurementProvider>{children}</ProcurementProvider>
    </ThemeProvider>
  );
};
