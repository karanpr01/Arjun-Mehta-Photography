import { curtainEnabled } from "~/lib/motion";

// Runs in <head> BEFORE the page paints.
// 1) Marks the page as "JavaScript is running" (the "js" class), so intro animations can
//    start from their hidden state without a flash.
// 2) Applies a saved theme instantly, so there is no flash of the wrong colours.
//    If nothing is saved, we do nothing: the CSS follows the visitor's OS setting.
// 3) Decides whether the entry curtain shows: only on the first visit of a session, only on
//    the Home page, and never for visitors who asked for reduced motion.
export const themeInitScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){d.dataset.theme=t;}}catch(e){}${
  curtainEnabled
    ? `try{if(location.pathname==="/"&&!sessionStorage.getItem("curtain")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("show-curtain");}}catch(e){}`
    : ""
}})();`;
