import { useQuery } from "@tanstack/react-query";
import {
  getAllPosition,
  getIntradaySquareOff,
  getParticularCoin,
  getUserTradeCoin,
  getWeeklyAdmin,
  tradeHistory,
  userCoinList,
} from "../../store/Services/TradeCoin";

// export const useViewCollectionPost = (payload: any) =>
//   useQuery(["viewCollectionPost", payload], () => viewCollectionPost(payload));

export const useGetUserTradeCoin = () =>
  useQuery(["getUserTradeCoin"], () => getUserTradeCoin());

export const useTradeHistory = (payload: any) =>
  useQuery(["tradeHistory", payload], () => tradeHistory(payload));

export const useUserCoinList = (payload: any) =>
  useQuery(["userCoinList", payload], () => userCoinList(payload));

export const UseGetAllPosition = (payload: any) =>
  useQuery(["getAllPosition", payload], () => getAllPosition(payload));

export const useGetParticularCoin = (payload: any) =>
  useQuery(["getParticularCoin", payload], () => getParticularCoin(payload));

export const useGetIntradaySquareOff = (payload: any) =>
  useQuery(["getIntradaySquareOff", payload], () =>
    getIntradaySquareOff(payload)
  );

export const useGetWeeklyAdmin = (payload: any) =>
  useQuery(["getWeeklyAdmin", payload], () => getWeeklyAdmin(payload));
