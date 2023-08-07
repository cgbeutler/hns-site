// import { persisted } from 'svelte-local-storage-store'
import { HnsCharacter } from './HnsCharacter'
import { validate, v4 as uuidv4, NIL } from 'uuid';
import { get, writable, type Writable } from 'svelte/store'

const HnsKeyPrefix = "HnsCharacters/"
const isBrowser = typeof window !== 'undefined';
console.log("IsBrowser: " + isBrowser)


function loadHnsCharacter(id: string): Writable<HnsCharacter> {
  const key = HnsKeyPrefix + id
  const store = writable(new HnsCharacter(id));
  const { subscribe, set, update } = store;

  if (isBrowser) {
    const raw = localStorage.getItem(key)
    if (raw !== null) {
      console.log( "Loading char " + raw )
      set(HnsCharacter.FromJson(raw))
    }
    else {
      console.log( "New char" )
      localStorage.setItem(key, JSON.stringify(get(store)))
    }
  }

  return {
    subscribe,
    set: newChar => {
      console.log( "Set char" )
      if (isBrowser) { localStorage.setItem(key, JSON.stringify(newChar)) }
      set(newChar);
    },
    update: updater => {
      console.log( "Update char" )
      const updatedStore = updater(get(store));
  
      if (isBrowser) { localStorage.setItem(key, JSON.stringify(updatedStore)) }
      set(updatedStore);
    },
  };
}


function loadHnsCharacters() {
  var characters: { [id: string]: Writable<HnsCharacter> } = {};

  // Iterate over localStorage for characters
  for (var i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.startsWith(HnsKeyPrefix)) { continue }

    const id = key.substring(HnsKeyPrefix.length)
    characters[id] = loadHnsCharacter(id)
  }

  const { subscribe, set, update } = writable(characters)

  return {
    subscribe,
    set: newList => {
      console.log( "Set charList" )
      // if (isBrowser) { localStorage.setItem(key, JSON.stringify(newChar)) }
      set(newList);
    },
    update: updater => {
      console.log( "Update charList" )
      update(updater);
    },
    refresh: () => {
      // Remove old, dead values
      for (const id of Object.keys(characters)) {
        const key = HnsKeyPrefix + id
        if (localStorage.getItem(key) === null) { characters[id] = undefined }
      }
      // Add any missing
      for (var i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.startsWith(HnsKeyPrefix)) { continue }

        let id = key.substring(HnsKeyPrefix.length)
        let character = characters[id]
        if (character === undefined) { characters[id] = loadHnsCharacter(id) }
      }
    },
    create: () => {
      let newId: string = uuidv4();
      update(chars => {
        for (let i = 0; i < 100; i++) {
          if (!chars.hasOwnProperty(newId)) break;
          newId = String(uuidv4());
        }
        const key = HnsKeyPrefix + newId;
        if (chars.hasOwnProperty(newId)) { console.error("Could not find spare id"); newId = NIL }
        if (localStorage.getItem(key) !== null) { console.error("Was in store, but not dict"); newId = NIL; }
        else { chars[newId] = loadHnsCharacter(newId) }
        return chars;
      })
      return newId;
    },
    findById: (id: string): Writable<HnsCharacter> => {
      var character = characters[id]
      if (character === undefined) { console.log("No character found at '" + id + "'"); return null }
      return character
    },
    delete: (id: string) => {
      let key = HnsKeyPrefix + id;
      if (localStorage.getItem(key) === null) { console.log("No character found at '" + key + "'") }
      else { localStorage.removeItem(key); console.log("Character deleted from local store '" + key + "'") }

      update(chars => {
        if (!chars.hasOwnProperty(id)) { console.error("Character store did not have id '" + id + "'") }
        else { delete chars[id]; }
        return chars;
      })
    }
  };
}

export const hnsCharacters = loadHnsCharacters();
