/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { HeaderNav } from './components/common/HeaderNav';
import { MobileShell } from './components/mobile/MobileShell';
import { DesignSystemStudio } from './components/design-system/DesignSystemStudio';

function MainAppContent() {
  const { viewMode } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#050811] text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans">
      <HeaderNav />

      <main className="flex-1 flex flex-col items-center justify-start overflow-x-hidden">
        {viewMode === 'mobile-app' ? (
          <div className="w-full flex-1 flex items-center justify-center py-4 sm:py-6">
            <MobileShell />
          </div>
        ) : (
          <div className="w-full py-6">
            <DesignSystemStudio />
          </div>
        )}
      </main>

      {/* Quiet, clean design footer */}
      <footer className="w-full border-t border-slate-900 py-4 px-6 text-center text-xs text-slate-500">
        <span>FitTrack Pulse © 2024-2025 · Sistema de Diseño UX/UI & Prototipo Móvil para React Native</span>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
