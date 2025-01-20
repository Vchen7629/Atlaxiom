import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './app/store.ts';
import { Provider } from 'react-redux';
import { ThemeProvider } from './components/shadcn_components/darklightmode/theme-provider.js';
import { DndContext } from '@dnd-kit/core';

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <DndContext>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
    </DndContext>
    </ThemeProvider>
  </React.StrictMode>
);
