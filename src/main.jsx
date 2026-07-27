import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initDB } from './db.js'

async function bootstrap() {
  const result = await initDB();

    if (!result.ok) {
        // Surface the failure instead of rendering an app that silently cannot save.
            document.getElementById('root').innerHTML =
                  '<h2>Storage unavailable</h2>' +
                        '<p>This app needs local storage to work. ' +
                              'Private browsing mode or a full device can block it.</p>';
                                  return;
                                    }

                                      if (!result.persisted) {
                                          console.warn(
                                                '[luminaRomanceDB] Storage is not persisted — the browser may evict your data. ' +
                                                      'Install the app to the home screen and export backups regularly.'
                                                          );
                                                            }

                                                              createRoot(document.getElementById('root')).render(
                                                                  <StrictMode>
                                                                        <App />
                                                                            </StrictMode>,
                                                                              );
                                                                              }

                                                                              bootstrap();