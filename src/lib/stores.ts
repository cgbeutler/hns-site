// import { persisted } from 'svelte-local-storage-store'
import { HnsCharacter } from './HnsCharacter'
import { validate, v4 as uuidv4, NIL } from 'uuid';
import { get, writable, type Writable } from 'svelte/store'
import { Account } from './Account';
import type { ModelState, ValidationProblemDetails } from './ModelState';

const HnsKeyPrefix = "HnsCharacters/"
const isBrowser = typeof window !== 'undefined';
console.log("IsBrowser: " + isBrowser)

async function createAccountStore() {
  const store = writable<Account>(null);
  const { subscribe, set, update } = store;

  fetch("http://localhost:5064/Api/Account/", {
    method: "GET",
    credentials: 'include',
    headers: {
      Accept: "application/json",
    },
  }).then( response => {
    if (response.ok) {
      response.json().then( o => set( Object.assign( new Account(), o ) ));
    }
    else {
      console.log( response.statusText );
    };
  });

  return {
    subscribe,
    set,
    update,
    
    createAccount: async ( name, email, password, errorCallback: (errors: string[])=>void ): Promise<string[]> => {
      if (get(store)) {
        return [ "Already logged-in. Log out first." ];
      }
      const response = await fetch("http://localhost:5064/Api/Account/Create", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      switch (response.status) {
        case 200: { // OK
          response.json().then( o => set( Object.assign( new Account(), o ) ));
        } break;
        case 400: { // Bad Request
          response.json().then( o =>{
            let errors = Object.values((o as ValidationProblemDetails).errors).flatMap( v => v );
            errorCallback(errors);
          });
        } break;
        case 422: { // Client Error
          response.json().then( o => {
            let errors = Object.values(o as {[key:string]: string}).flatMap( v => v )
            errorCallback(errors);
          });
        } break;
        default: {
          console.error( "Unrecognized response status '" + response.status + ": " + response.statusText + "'" );
        } break;
      }
    },

    login: async ( login: string, password: string, errorCallback: (errors: string[])=>void ) => {
      if (get(store)) {
        console.log("Tried to login while already logged in. Log out first.")
        return;
      }
      const response = await fetch("http://localhost:5064/Api/Account/Login", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      switch (response.status) {
        case 200: {
          response.json().then( o => set( Object.assign( new Account(), o ) ));
        } break;
        case 400: {
          response.json().then( o =>{
            let errors = Object.values((o as ValidationProblemDetails).errors).flatMap( v => v );
            errorCallback(errors);
          });
        } break;
        case 401: {
          response.json().then( o => {
            let errors = Object.values(o as ModelState).flatMap( v => v.errors.map( e => e.errorMessage ))
            errorCallback(errors);
          });
        } break;
        default: {
          console.error( "Unrecognized response status '" + response.status + ": " + response.statusText + "'" );
        } break;
      }
    },

    logout: async () => {
      await fetch("http://localhost:5064/Api/Account/Logout", {
        method: "POST",
        credentials: 'include',
      })
      .then(
        r => { // TEST: All stores need clearing. Is reload enough?
          account.set( null );
          location.reload();
        }, 
        e => console.log( e )
      );
    },
    
    updateAccount: async (
        name: string|null, email: string|null, password: string|null, currentPassword: string,
        successCallback: ()=>void, errorCallback: (errors: string[])=>void ) => {
      const response = await fetch("http://localhost:5064/Api/Account", {
        method: "PUT",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, password, currentPassword }),
      });
      switch (response.status) {
        case 200: { // Ok
          response.json().then( o => set( Object.assign( new Account(), o ) ));
          successCallback();
        } break;
        case 400: { // Bad Request
          response.json().then( o =>{
            let errors = Object.values((o as ValidationProblemDetails).errors).flatMap( v => v );
            errorCallback(errors);
          });
        } break;
        case 401: { // Unauthorized
          response.json().then( o => {
            let errors = Object.values(o as ModelState).flatMap( v => v.errors.map( e => e.errorMessage ))
            errorCallback(errors);
          });
        } break;
        case 422: { // Client Error
          response.json().then( o => {
            let errors = Object.values(o as {[key:string]: string}).flatMap( v => v )
            errorCallback(errors);
          });
        } break;
        default: {
          console.error( "Unrecognized response status '" + response.status + ": " + response.statusText + "'" );
        } break;
      }
    }
  };
}

export const account = await createAccountStore();


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
    refresh: update( charDict => {
      // Remove old, dead values
      for (const id of Object.keys(charDict)) {
        const key = HnsKeyPrefix + id
        if (localStorage.getItem(key) === null) { charDict[id] = undefined }
      }
      // Add any missing
      for (var i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.startsWith(HnsKeyPrefix)) { continue }

        let id = key.substring(HnsKeyPrefix.length)
        let character = charDict[id]
        if (character === undefined) { charDict[id] = loadHnsCharacter(id) }
      }
      return charDict
    }),
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
