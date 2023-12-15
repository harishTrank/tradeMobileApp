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

export const userCoinList = () =>
  callApi({
    uriEndPoint: tradeCoinEndpoints.userCoinList.v1,
  });

export const getAllPosition = () =>
  callApi({
    uriEndPoint: tradeCoinEndpoints.getAllPosition.v1,
  });

export const getAllCoinsPosition = () =>
  callApi({
    uriEndPoint: tradeCoinEndpoints.getAllCoinsPosition.v1,
  });

export const getParticularCoin = ({ pathParams }: any) =>
  callApi({
    uriEndPoint: tradeCoinEndpoints.getParticularCoin.v1,
    pathParams,
  });
