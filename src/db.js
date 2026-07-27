// src/db.js
import Dexie from "dexie";

export const db = new Dexie("luminaRomanceDB");

db.version(1).stores({
  characters: "++id, name, seed, createdAt",
    frames: "++id, characterId, order, createdAt, [characterId+order]",
      projects: "++id, title, *frameIds, createdAt",
      });

      async function requestPersistentStorage() {
        if (!navigator.storage?.persist) return false;
          if (await navigator.storage.persisted()) return true;
            return navigator.storage.persist();
            }

            export async function initDB() {
              try {
                  await db.open();
                      const persisted = await requestPersistentStorage();
                          return { ok: true, persisted };
                            } catch (err) {
                                return { ok: false, persisted: false, error: err };
                                  }
                                  }
                                  