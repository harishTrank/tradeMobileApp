import { useQuery } from "@tanstack/react-query";
import { userProfileView } from "../../store/Services/User";

// export const useViewCollectionPost = (payload: any) =>
//   useQuery(["viewCollectionPost", payload], () => viewCollectionPost(payload));

export const useUserProfileView = () =>
  useQuery(["userProfileView"], () => userProfileView());
