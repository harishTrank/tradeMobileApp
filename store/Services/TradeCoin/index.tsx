import { callApi } from "../../../utils/api/apiUtils";
import { tradeCoinEndpoints } from "../../Endpoints/TradeCoin";

export const addTradeCoin = ({ body }: any) =>
  callApi({
    uriEndPoint: tradeCoinEndpoints.addTradeCoin.v1,
    body,
  });

export const getUserTradeCoin = () =>
  callApi({
    uriEndPoint: tradeCoinEndpoints.getUserTradeCoin.v1,
  });

export const deleteTradeCoin = ({ query }: any) =>
  callApi({
    uriEndPoint: tradeCoinEndpoints.deleteTradeCoin.v1,
    query,
  });

export const buySellTradeCoin = ({ body }: any) =>
  callApi({
    uriEndPoint: tradeCoinEndpoints.buySellTradeCoin.v1,
    body,
  });

export const tradeHistory = ({ query }: any) =>
  callApi({
    uriEndPoint: tradeCoinEndpoints.tradeHistory.v1,
    query,
  });

export const userCoinList = ({ query }: any) =>
  callApi({
    uriEndPoint: tradeCoinEndpoints.userCoinList.v1,
    query,
  });

export const getAllPosition = ({ query }: any) =>
  callApi({
    uriEndPoint: tradeCoinEndpoints.getAllPosition.v1,
    query,
  });

export const getAllCoinsPosition = ({ query }: any) =>
  callApi({
    uriEndPoint: tradeCoinEndpoints.getAllCoinsPosition.v1,
    query,
  });

export const getParticularCoin = ({ pathParams }: any) =>
  callApi({
    uriEndPoint: tradeCoinEndpoints.getParticularCoin.v1,
    pathParams,
  });

export const getBrkSettings = ({ query }: any) =>
  callApi({
    uriEndPoint: tradeCoinEndpoints.getBrkSettings.v1,
    query,
  });

export const postBrkSettings = ({ body }: any) =>
  callApi({
    uriEndPoint: tradeCoinEndpoints.postBrkSettings.v1,
    body,
  });

export const getTradeMarginSettings = ({ query }: any) =>
  callApi({
    uriEndPoint: tradeCoinEndpoints.getTradeMarginSettings.v1,
    query,
  });

export const postTradeMarginSettings = ({ body }: any) =>
  callApi({
    uriEndPoint: tradeCoinEndpoints.postTradeMarginSettings.v1,
    body,
  });

export const postAllTradeMarginSettings = ({ body }: any) =>
  callApi({
    uriEndPoint: tradeCoinEndpoints.postAllTradeMarginSettings.v1,
    body,
  });
