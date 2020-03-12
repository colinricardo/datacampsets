const setJWT = (jwt: string) => {
  // @ts-ignore
  localStorage.setItem("jwt", jwt);
};

const getJWT = () => {
  try {
    // @ts-ignore
    return localStorage.getItem("jwt") || "";
  } catch (err) {
    return "";
  }
};

const removeJWT = () => {
  // @ts-ignore
  localStorage.removeItem("jwt");
};

export default {
  setJWT,
  getJWT,
  removeJWT,
};
