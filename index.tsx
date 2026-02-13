
import React from 'react';
import ReactDOM from 'react-dom/client';

/**
 * BRIDGE GLOBALE: Inizializzazione Chiavi API.
 * Questo blocco garantisce che l'SDK Google GenAI trovi la chiave API corretta.
 * Mappa VITE_API_KEY (da Vercel/Vite) su process.env.API_KEY (richiesto dall'SDK).
 */
if (typeof window !== 'undefined') {
  // Inizializza la gerarchia process.env globale se mancante
  (window as any).process = (window as any).process || {};
  (window as any).process.env = (window as any).process.env || {};

  try {
    // Recupera la chiave dalle variabili di ambiente di Vite
    // IMPORTANTE: Su Vercel la variabile DEVE chiamarsi VITE_API_KEY
    const env = (import.meta as any).env;
    const apiKey = env?.VITE_API_KEY || env?.API_KEY || (window as any).process?.env?.API_KEY;

    if (apiKey) {
      // Imposta la chiave dove l'SDK se l'aspetta
      (window as any).process.env.API_KEY = apiKey;
      console.log("Configurazione API: Chiave rilevata correttamente.");
    } else {
      console.warn("Attenzione: Chiave API non trovata nelle variabili di ambiente (VITE_API_KEY).");
    }
  } catch (err) {
    console.error("Errore nel bridge ambientale:", err);
  }
}

import { App } from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
