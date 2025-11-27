export const timeDifference = (timePosted: string) => {
  let dateNow = +new Date();

  // get total seconds between the times
  let delta = Math.abs(dateNow - +timePosted) / 1000;

  // calculate (and subtract) whole years
  let years = Math.floor(delta / (86400 * 30 * 12));
  delta -= years * (86400 * 30 * 12);

  // calculate (and subtract) whole months
  let months = Math.floor(delta / (86400 * 30));
  delta -= months * (86400 * 30);

  // calculate (and subtract) whole days
  let days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  let hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  let minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  let seconds = Math.floor(delta % 60); // in theory the modulus is not required

  let timeDiff = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  timeDiff.years = years > 0 ? years : 0;
  timeDiff.months = months > 0 ? months : 0;
  timeDiff.days = days > 0 ? days : 0;
  timeDiff.hours = hours > 0 ? hours : 0;
  timeDiff.minutes = minutes > 0 ? minutes : 0;
  timeDiff.seconds = seconds > 0 ? seconds : 0;

  return timeDiff;
};
