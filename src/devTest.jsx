import { useState } from 'react';
import { db } from './db.js';

// Blob-safe: describes binary fields instead of serializing them.
function describe(record) {
  const out = {};
    for (const [key, value] of Object.entries(record)) {
        if (value instanceof Blob) out[key] = `[Blob ${value.size} bytes, ${value.type}]`;
            else if (value instanceof Date) out[key] = value.toISOString();
                else out[key] = value;
                  }
                    return out;
                    }

                    export default function DevTest() {
                      const [output, setOutput] = useState('Ready.');

                        async function runWriteTest() {
                            try {
                                  const newId = await db.characters.add({
                                          name: "Test Character",
                                                  imageBlob: null,
                                                          prompt: "a test prompt",
                                                                  seed: 12345,
                                                                          cfgScale: 7,
                                                                                  createdAt: new Date(),
                                                                                        });
                                                                                              const total = await db.characters.count();
                                                                                                    const recent = await db.characters
                                                                                                            .orderBy('createdAt').reverse().limit(5).toArray();

                                                                                                                  setOutput(
                                                                                                                          `Saved with id: ${newId}\nTotal records: ${total}\n\n` +
                                                                                                                                  `Most recent 5:\n${JSON.stringify(recent.map(describe), null, 2)}`
                                                                                                                                        );
                                                                                                                                            } catch (err) {
                                                                                                                                                  setOutput(`WRITE FAILED\n\n${err.name}: ${err.message}`);
                                                                                                                                                      }
                                                                                                                                                        }

                                                                                                                                                          async function clearTestData() {
                                                                                                                                                              try {
                                                                                                                                                                    const deleted = await db.characters.where('name').equals('Test Character').delete();
                                                                                                                                                                          const total = await db.characters.count();
                                                                                                                                                                                setOutput(`Removed ${deleted} test record(s).\nRemaining: ${total}`);
                                                                                                                                                                                    } catch (err) {
                                                                                                                                                                                          setOutput(`CLEAR FAILED\n\n${err.name}: ${err.message}`);
                                                                                                                                                                                              }
                                                                                                                                                                                                }

                                                                                                                                                                                                  return (
                                                                                                                                                                                                      <div style={{ padding: 16 }}>
                                                                                                                                                                                                            <h2>DB Test</h2>
                                                                                                                                                                                                                  <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                                                                                                                                                                                                                          <button onClick={runWriteTest} style={{ padding: '12px 16px' }}>Write test row</button>
                                                                                                                                                                                                                                  <button onClick={clearTestData} style={{ padding: '12px 16px' }}>Clear test rows</button>
                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                              <pre style={{
                                                                                                                                                                                                                                                      padding: 16, background: '#eee', fontFamily: 'monospace',
                                                                                                                                                                                                                                                              whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                                                                                                                                                                                                                                                                    }}>{output}</pre>
                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                        }                                                    