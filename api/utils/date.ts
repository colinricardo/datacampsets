import { getUnixTime, parse } from "date-fns";

// // This function should work with any date format allowed by Date().
const dateStringToUnix = (date: string) => {
  const unixTimeStamp = (new Date(date).getTime() / 1000).toFixed(0);
  return unixTimeStamp;
};

// These are in seconds.
const DAY = 86400;
const TWENTY_HOURS = 72000;
const FOUR_HOURS = 14400;
const TWO_HOURS = 7200;
const HOUR = 3600;
const HALF_HOUR = 1800;
const MINUTE = 60;
const ONE_YEAR = 31622400;
const ONE_DAY = 86400;
const TWO_DAYS = 172800;
const THREE_DAYS = 259200;
const FOUR_DAYS = 345600;
const ONE_HOUR = 3600;

const map = {
  oneDay: ONE_DAY,
  twoDays: TWO_DAYS,
  threeDays: THREE_DAYS,
  fourDays: FOUR_DAYS,
  fourHours: FOUR_HOURS,
  oneHour: ONE_HOUR,
};

// JS provides unix time in milliseconds, which is not what we want.
const getUnixTimeForNow = () => {
  return Math.round(Date.now() / 1000);
};

const getUnixTimeForStartOfDay = () => {
  const now = new Date();
  const startOfDay = +new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  return Math.round(startOfDay / 1000);
};

const roundToHalfHour = (unixTime: number) => {
  const _ = unixTime - (unixTime % HALF_HOUR);
  return _ + HALF_HOUR;
};

const roundToHour = (unixTime: number) => {
  const _ = unixTime - (unixTime % HOUR);
  return _ + HOUR;
};

const getTimePlus24Hours = (unixTime: number) => {
  return roundToHalfHour(unixTime + DAY);
};

const getTimePlus4Hours = (unixTime: number) => {
  return roundToHalfHour(unixTime + FOUR_HOURS);
};

const getTimeMinus20Hours = (unixTime: number) => {
  return roundToHalfHour(unixTime - TWENTY_HOURS);
};

const getTimeMinus4Hours = (unixTime: number) => {
  return roundToHalfHour(unixTime - FOUR_HOURS);
};

const getTimeMinus2Hours = (unixTime: number) => {
  return roundToHalfHour(unixTime - TWO_HOURS);
};

const getTimeMinusNDays = (unixTime: number, nDays: number) => {
  return roundToHalfHour(unixTime - ONE_DAY * nDays);
};

const getTimePlus1Year = (unixTime: number) => {
  return roundToHalfHour(unixTime + ONE_YEAR);
};

const getNowPlus24Hours = () => {
  return getTimePlus24Hours(getUnixTimeForNow());
};

const getNowPlus1Year = () => {
  return getTimePlus1Year(getUnixTimeForNow());
};

const getNowPlus4Hours = () => {
  return getTimePlus4Hours(getUnixTimeForNow());
};

const getNowMinus20Hours = () => {
  return getTimeMinus20Hours(getUnixTimeForNow());
};

const getNowMinus4Hours = () => {
  return getTimeMinus4Hours(getUnixTimeForNow());
};

const getNowMinus2Hours = () => {
  return getTimeMinus2Hours(getUnixTimeForNow());
};

const getNowMinusNDays = (nDays: number) => {
  return getTimeMinusNDays(getUnixTimeForNow(), nDays);
};

const getNowMinus = (unit) => {
  return roundToHalfHour(getUnixTimeForNow() - map[unit]);
};

const getNowPlus = (unit) => {
  return roundToHalfHour(getUnixTimeForNow() + map[unit]);
};

const formatStringFromSeconds = (secs: number) => {
  const d = new Date(secs * 1000);
  let time = "";
  if (d.getMinutes() !== 0) {
    time = `${d.getUTCHours()} hours ${d.getMinutes()} minutes`;
  } else {
    time = `${d.getUTCHours()} hours`;
  }
  return time;
};

// e.g. '27/01/2020 11:37:00' --> 1580121420
const getUnixFromDVLADateString = (DVLADateString: string) => {
  // per date-fns: 'dd/MM/yyyy HH:mm:ss'
  const format = "dd/MM/yyyy HH:mm:ss";
  const d = parse(DVLADateString, format, new Date()); // 3rd arg is a fallback.
  return getUnixTime(d);
};

export default {
  DAY,
  TWENTY_HOURS,
  FOUR_HOURS,
  HOUR,
  MINUTE,
  getUnixTimeForNow,
  getTimePlus24Hours,
  getTimePlus4Hours,
  getNowPlus24Hours,
  getNowPlus4Hours,
  getTimeMinus20Hours,
  getTimeMinus4Hours,
  getTimeMinus2Hours,
  getTimeMinusNDays,
  getNowMinus20Hours,
  getNowMinus4Hours,
  getNowMinus2Hours,
  getNowMinusNDays,
  dateStringToUnix,
  formatStringFromSeconds,
  getNowPlus1Year,
  getNowMinus,
  getNowPlus,
  getUnixFromDVLADateString,
};
