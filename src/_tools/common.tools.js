// From: https://davidwalsh.name/javascript-debounce-function
const debounce = (func, delay, immediate) => {
  var timeout;

  return () => {
    const context = this,
      // eslint-disable-next-line
      args = arguments;

    const later = function() {
      timeout = null;

      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, delay);

    if (callNow) func.apply(context, args);
  };
};

const isElement = obj => {
  try {
    // Using W3 DOM2 (works for FF, Opera and Chrome)
    return obj instanceof HTMLElement;
  } catch (e) {
    // Browsers not supporting W3 DOM2 don't have HTMLElement and
    // an exception is thrown and we end up here. Testing some
    // properties that all elements have (works on IE7)
    return (
      typeof obj === "object" &&
      obj.nodeType === 1 &&
      typeof obj.style === "object" &&
      typeof obj.ownerDocument === "object"
    );
  }
};

export { debounce, isElement };
