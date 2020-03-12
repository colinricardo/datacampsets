import getConfig from "next/config";
import ReactGA from "react-ga";

const { publicRuntimeConfig = {} } = getConfig() || {};

const GA_TRACKING_ID = publicRuntimeConfig.GA_TRACKING_ID;

export const initGA = () => {
  console.log("Initializing GA with ID:", GA_TRACKING_ID);
  ReactGA.initialize(GA_TRACKING_ID, {
    debug: false,
    gaOptions: {
      siteSpeedSampleRate: 100,
    },
  });
  ReactGA.plugin.require("ec");
};

export const logPageView = () => {
  console.log("Logging page view.");
  // @ts-ignore
  ReactGA.set({ page: window.location.pathname });
  // @ts-ignore
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = "", action = "") => {
  console.log("Logging event.");
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

export const logException = (description = "", fatal = false) => {
  console.log("Logging exception.");
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};

export default {
  initGA,
  logPageView,
  logEvent,
  logException,
};
