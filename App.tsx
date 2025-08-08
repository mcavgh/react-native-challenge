import React, { Suspense } from 'react';
import { AppProvider } from './src/app/providers/app-provider';
import { AppNavigator } from './src/app/router/app-navigator';
// Importar configuración de i18n
import './src/shared/i18n/i18n';

export default function App() {
  return (
    <Suspense fallback={null}>
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    </Suspense>
  );
}