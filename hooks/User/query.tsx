import { useQuery } from "@tanstack/react-query";
import { userListView, userProfileView } from "../../store/Services/User";

// export const useViewCollectionPost = (payload: any) =>
//   useQuery(["viewCollectionPost", payload], () => viewCollectionPost(payload));

export const useUserProfileView = () =>
  useQuery(["userProfileView"], () => userProfileView());

export const useUserListView = (payload: any) =>
  useQuery(["userListView", payload], () => userListView(payload));
