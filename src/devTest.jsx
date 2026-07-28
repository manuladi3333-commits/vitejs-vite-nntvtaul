// src/devTest.jsx  — TEMPORARY, delete after Phase 1
import { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "./db";

const TEST_NAME = "Test Character";

export default function DevTest() {
  const [output, setOutput] = useState("Nothing run yet.");
    const [busy, setBusy] = useState(false);

      async function writeRow() {
          setBusy(true);
              try {
                    await db.characters.add({
                            name: TEST_NAME,
                                    seed: Math.floor(Math.random() * 1000000),
                                            createdAt: new Date(),          // Date object — matches schema lock
                                                  });
                                                        const total = await db.characters.count();
                                                              const recent = await db.characters
                                                                      .orderBy("createdAt").reverse().limit(5).toArray();
                                                                            const lines = recent.map(
                                                                                    (c) => `id ${c.id} | ${c.name} | seed ${c.seed} | ${new Date(c.createdAt).toLocaleString()}`
                                                                                          );
                                                                                                setOutput(`Total characters: ${total}\n\n5 most recent:\n${lines.join("\n")}`);
                                                                                                    } catch (err) {
                                                                                                          setOutput(`Write failed: ${err.name} — ${err.message}`);
                                                                                                              } finally {
                                                                                                                    setBusy(false);
                                                                                                                        }
                                                                                                                          }

                                                                                                                            async function clearRows() {
                                                                                                                                setBusy(true);
                                                                                                                                    try {
                                                                                                                                          const deleted = await db.characters.where("name").equals(TEST_NAME).delete();
                                                                                                                                                const total = await db.characters.count();
                                                                                                                                                      setOutput(`Deleted ${deleted} test rows.\nTotal characters now: ${total}`);
                                                                                                                                                          } catch (err) {
                                                                                                                                                                setOutput(`Clear failed: ${err.name} — ${err.message}`);
                                                                                                                                                                    } finally {
                                                                                                                                                                          setBusy(false);
                                                                                                                                                                              }
                                                                                                                                                                                }

                                                                                                                                                                                  return (
                                                                                                                                                                                      <div style={{ padding: 24, fontFamily: "system-ui" }}>
                                                                                                                                                                                            <h1>DevTest (temporary)</h1>
                                                                                                                                                                                                  <button onClick={writeRow} disabled={busy} style={{ padding: "12px 16px", marginRight: 8 }}>
                                                                                                                                                                                                          Write test row
                                                                                                                                                                                                                </button>
                                                                                                                                                                                                                      <button onClick={clearRows} disabled={busy} style={{ padding: "12px 16px" }}>
                                                                                                                                                                                                                              Clear test rows
                                                                                                                                                                                                                                    </button>
                                                                                                                                                                                                                                          <pre style={{ marginTop: 20, whiteSpace: "pre-wrap", fontSize: 14 }}>{output}</pre>
                                                                                                                                                                                                                                                <Link to="/">Back to Home</Link>
                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                      }