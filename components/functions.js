export const EmailValidator = (email) => {
  let hasAtSymbol = false;
  let hasPeriod = false;
  for (let n = 0; n < email.length; n++) {
    if (email.substring(n, n + 1) === "@") {
      hasAtSymbol = true;
    }
    if (hasAtSymbol === true && email.substring(n, n + 1) === ".") {
      hasPeriod = true;
    }
  }
  if (hasAtSymbol === true && hasPeriod === true) {
    return true;
  } else {
    return false;
  }
};

export const GetPagePath = (path) => {
  for (let n = 1; n < path.length; n++) {
    if (path.substring(n, n + 1) == "/") {
      return path.substring(0, n);
    }
  }
  return path.substring(0, path.length);
};

export const ConvertDate = (date) => {
  const shortDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const shortTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return `${shortDate} ${shortTime}`;
};

import { MonthShort } from "./items";

export const ConvertToStringDate = (timestamp) => {
  return typeof timestamp === "object"
    ? `${MonthShort[timestamp.toDate().getMonth()]} ${timestamp
        .toDate()
        .getDay()}, ${timestamp.toDate().getFullYear()}`
    : `${MonthShort[new Date(timestamp).getMonth()]} ${new Date(
        timestamp
      ).getDay()}, ${new Date(timestamp).getFullYear()}`;
};
