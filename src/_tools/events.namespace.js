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

// Example
/*
window
  .on('mousedown.foo', ()=> console.log("namespaced event will be removed after 3s"))
  .on('mousedown.bar', ()=> console.log("event will NOT be removed"))
  .on('mousedown.baz', ()=> console.log("event will fire once"), {once: true});

// after 3 seconds remove the event with `foo` namespace
setTimeout(function(){
    window.off('mousedown.foo')
}, 3000)
*/
