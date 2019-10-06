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

export { debounce };
