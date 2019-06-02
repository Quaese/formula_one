export default {
  sortObjectByProperty: (property, reverse) => {
    reverse = reverse ? -1 : 1;
    return (a, b) => {
      return a[property] < b[property]
        ? -reverse
        : a[property] > b[property]
        ? reverse
        : 0;
    };
  }
};
