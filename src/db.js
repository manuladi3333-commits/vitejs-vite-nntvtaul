import Dexie from "dexie";

// Store names exported as constants so all three apps reference one source of truth.
export const STORES = {
  CHARACTERS: "characters",
  FRAMES: "frames",
  PROJECTS: "projects",
};

export const db = new Dexie("luminaRomanceDB");

// NOTE: the strings below declare INDEXES only, not fields.
// Non-indexed fields (imageBlob, layerData) are still stored on the record —
// they are simply not queryable, which is correct: they are never searched by.
db.version(1).stores({
  [STORES.CHARACTERS]: "++id, name, seed, createdAt",
  [STORES.FRAMES]: "++id, characterId, order, createdAt, [characterId+order]",
  [STORES.PROJECTS]: "++id, title, *frameIds, createdAt",
});

/**
 * Ask the browser to make IndexedDB non-evictable.
 * Data here is local-only with no server copy, so eviction = permanent loss.
 * Returns true if storage is persisted.
 */
export async function requestPersistentStorage() {
  if (!navigator.storage?.persist) return false;
  if (await navigator.storage.persisted()) return true;
  return navigator.storage.persist();
}

/**
 * Open the database explicitly so failures surface at startup
 * (private browsing, denied quota) instead of on the first write.
 */
export async function initDB() {
  try {
    await db.open();
    const persisted = await requestPersistentStorage();
    return { ok: true, persisted };
  } catch (err) {
    console.error("[luminaRomanceDB] failed to open:", err);
    return { ok: false, persisted: false, error: err };
  }
}