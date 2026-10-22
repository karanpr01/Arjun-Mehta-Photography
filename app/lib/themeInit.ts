// Runs in <head> BEFORE the page paints, so a saved theme is applied
// instantly and there is no flash of the wrong colours.
// If nothing is saved, we do nothing: the CSS follows the visitor's OS setting.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t;}}catch(e){}})();`;