import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initDB } from './db.js'

async function bootstrap() {
  const result = await initDB();

    if (!result.ok) {
        document.getElementById('root').innerHTML =
              '<h2>Storage unavailable</h2>' +
                    '<p>This app needs local storage to work. ' +
                          'Private browsing mode or a full device can block it.</p>';
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

                                                          bootstrap();