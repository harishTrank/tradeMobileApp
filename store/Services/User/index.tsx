import { callApi } from "../../../utils/api/apiUtils";
import { userEndpoints } from "../../Endpoints/User";

export const addNewUserService = ({ body }: any) =>
  callApi({
    uriEndPoint: userEndpoints.createNewUser.v1,
    body,
  });

export const userProfileView = () =>
  callApi({
    uriEndPoint: userEndpoints.userProfileView.v1,
  });

export const userListView = ({ query }: any) =>
  callApi({
    uriEndPoint: userEndpoints.userListView.v1,
    query,
  });

export const searchUserList = () =>
  callApi({
    uriEndPoint: userEndpoints.searchUserList.v1,
  });
