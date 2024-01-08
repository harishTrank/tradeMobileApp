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
  userDetailsView: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/user-details-api/",
    },
  },
  userListView: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/user-list/",
    },
  },
  searchUserList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/search-user-api/",
    },
  },

  accountSummary: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/account-summary/",
    },
  },

  accountSummaryCredit: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/account-summary-credit-api/",
    },
  },

  scriptQuantity: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/script-quantity-api/",
    },
  },

  settlementApi: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/settlement-api/",
    },
  },

  positionHeaderApi: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/position-header-api/",
    },
  },

  getMasterChildApi: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/master-child-api/",
    },
  },

  permissionToggleApi: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/permission-toggle/",
    },
  },

  userAccountLimit: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/account-limit/",
    },
  },

  userAccountLimitCreated: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/limit-user-creation/",
    },
  },
  getAdminTraderight: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/admin-right-get/",
    },
  },
};
