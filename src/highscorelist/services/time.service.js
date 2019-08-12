export default {
  stringToSeconds: timeString => {
    // [milli seconds, seconds, minutes, hours]
    const factors = [1, 1000, 60000, 3600000],
      timeArray = timeString.split(":").reverse();

    // calculate time with reduce
    return timeArray.reduce(
      (accu, curr, index) => accu + factors[index] * curr,
      0
    );
  },

  secondsToString: (seconds, withHours = false) => {
    let hours,
      minutes,
      milliSeconds = seconds % 1000;

    seconds = parseInt(seconds / 1000);

    // hours
    hours = parseInt(seconds / (60 * 60));
    seconds -= hours * 60 * 60;

    // minutes
    minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;

    return withHours
      ? (hours < 10 ? "0" : "") + hours + ":"
      : "" +
          (minutes < 10 ? "0" : "") +
          minutes +
          ":" +
          (seconds < 10 ? "0" : "") +
          seconds +
          ":" +
          (milliSeconds < 10 ? "00" : milliSeconds < 100 ? "0" : "") +
          milliSeconds;
  },

  formatDateTime: timestamp => {
    const date = new Date(timestamp);

    return `${date.getDate()}.${date.getMonth() +
      1}.${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
};
