import { defaults } from "../default";

export const userEndpoints = {
  createNewUser: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/add-user/",
    },
  },
  userProfileView: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/user-profile/",
    },
  },
};
