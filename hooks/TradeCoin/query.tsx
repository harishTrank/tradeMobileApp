import { useQuery } from "@tanstack/react-query";
import {
  getAllPosition,
  getParticularCoin,
  getUserTradeCoin,
  tradeHistory,
  userCoinList,
} from "../../store/Services/TradeCoin";

// export const useViewCollectionPost = (payload: any) =>
//   useQuery(["viewCollectionPost", payload], () => viewCollectionPost(payload));

export const useGetUserTradeCoin = () =>
  useQuery(["getUserTradeCoin"], () => getUserTradeCoin());

export const useTradeHistory = (payload: any) =>
  useQuery(["tradeHistory", payload], () => tradeHistory(payload));

export const useUserCoinList = () =>
  useQuery(["userCoinList"], () => userCoinList());

export const UseGetAllPosition = () =>
  useQuery(["getAllPosition"], () => getAllPosition());

export const useGetParticularCoin = (payload: any) =>
  useQuery(["getParticularCoin", payload], () => getParticularCoin(payload));
