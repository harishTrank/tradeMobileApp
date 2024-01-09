import { defaults } from "../default";

export const tradeCoinEndpoints = {
  getUserTradeCoin: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/market-coin/",
    },
  },

  addTradeCoin: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/market-coin/",
    },
  },

  deleteTradeCoin: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: "/market-coin/",
    },
  },

  buySellTradeCoin: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/buy-sell-coin/",
    },
  },

  tradeHistory: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/trade-history/",
    },
  },

  userCoinList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/user-coin-list/",
    },
  },

  getAllPosition: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/position/",
    },
  },
  getAllCoinsPosition: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/position-coins/",
    },
  },

  getParticularCoin: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/trade-particular-view/:id",
    },
  },

  getBrkSettings: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/brk-setting-api/",
    },
  },

  postBrkSettings: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/brk-setting-api/",
    },
  },
  getTradeMarginSettings: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/trademargin-setting-api/",
    },
  },
  postTradeMarginSettings: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/trademargin-setting-api/",
    },
  },
  postAllTradeMarginSettings: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/trademargin-all-setting-api/",
    },
  },
};
