import { defaults } from "../default";

export const authEndpoints = {
  mobileLogin: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/login/",
    },
  },
  changePassword: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/update-password/",
    },
  },
  mobileLogout: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/logout/",
    },
  },
};
