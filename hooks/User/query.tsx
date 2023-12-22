import { useQuery } from "@tanstack/react-query";
import {
  accountSummary,
  searchUserList,
  settlementApi,
  userListView,
  userProfileView,
} from "../../store/Services/User";

// export const useViewCollectionPost = (payload: any) =>
//   useQuery(["viewCollectionPost", payload], () => viewCollectionPost(payload));

export const useUserProfileView = () =>
  useQuery(["userProfileView"], () => userProfileView());

export const useUserListView = (payload: any) =>
  useQuery(["userListView", payload], () => userListView(payload));

export const useSearchUserList = () =>
  useQuery(["searchUserList"], () => searchUserList());

export const useAccountSummary = (payload: any) =>
  useQuery(["accountSummary", payload], () => accountSummary(payload));

export const useSettlementApi = (payload: any) =>
  useQuery(["settlementApi", payload], () => settlementApi(payload));
