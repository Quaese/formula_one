// From: https://gist.github.com/yairEO/cb60592476a4204b27e83048949dbb45

var events = {
  on(event, cb, opts) {
    if (!this.namespaces)
      // save the namespaces on the DOM element itself
      this.namespaces = {};

    this.namespaces[event] = cb;
    var options = opts || false;

    this.addEventListener(event.split(".")[0], cb, options);
    return this;
  },
  off(event) {
    this.removeEventListener(event.split(".")[0], this.namespaces[event]);
    delete this.namespaces[event];
    return this;
  }
};

// Extend the DOM with these above custom methods
window.on = document.on = Element.prototype.on = events.on;
window.off = document.off = Element.prototype.off = events.off;
