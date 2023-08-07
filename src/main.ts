import './app.css'
import App from './App.svelte'
import { pathname } from './pathnameStore';

const app = new App({
  target: document.getElementById('app'),
})

// Subscribe to path and store it
const observePathChange = () => {
  let oldPathname = window.location.pathname;
  const body = document.querySelector("body");
  const observer = new MutationObserver( mutations => {
      mutations.forEach( () => {
          if (oldPathname !== document.location.pathname) {
              oldPathname = document.location.pathname;
              pathname.set( oldPathname );
          }
      });
  });
  observer.observe(body, { childList: true, subtree: true });
};

window.onload = observePathChange;

export default app
