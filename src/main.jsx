import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initDB } from './db.js'

function showFatal(message) {
  document.getElementById('root').innerHTML =
      '<div style="padding:16px;font-family:monospace;white-space:pre-wrap">' +
          message + '</div>';
          }

          async function bootstrap() {
            const result = await initDB();

              if (!result.ok) {
                  showFatal('<h2>Storage unavailable</h2>' +
                        '<p>This app needs local storage to work. ' +
                              'Private browsing mode or a full device can block it.</p>');
                                  return;
                                    }

                                      if (!result.persisted) {
                                          console.warn('[luminaRomanceDB] Storage not persisted — data may be evicted.');
                                            }

                                              createRoot(document.getElementById('root')).render(
                                                  <StrictMode>
                                                        <App />
                                                            </StrictMode>,
                                                              );
                                                              }

                                                              // Any unexpected throw becomes a visible message, never a blank screen.
                                                              bootstrap().catch((err) => {
                                                                showFatal('<h2>Startup failed</h2>' + err.name + ': ' + err.message);
                                                                });