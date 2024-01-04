import { callApi } from "../../../utils/api/apiUtils";
import { userEndpoints } from "../../Endpoints/User";

export const addNewUserService = ({ body }: any) =>
  callApi({
    uriEndPoint: userEndpoints.createNewUser.v1,
    body,
  });

export const userProfileView = ({ query }: any) =>
  callApi({
    uriEndPoint: userEndpoints.userProfileView.v1,
    query,
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

export const accountSummary = ({ query }: any) =>
  callApi({
    uriEndPoint: userEndpoints.accountSummary.v1,
    query,
  });

export const accountSummaryCredit = ({ query }: any) =>
  callApi({
    uriEndPoint: userEndpoints.accountSummaryCredit.v1,
    query,
  });

export const scriptQuantity = ({ query }: any) =>
  callApi({
    uriEndPoint: userEndpoints.scriptQuantity.v1,
    query,
  });

export const settlementApi = ({ query }: any) =>
  callApi({
    uriEndPoint: userEndpoints.settlementApi.v1,
    query,
  });

export const positionHeaderApi = () =>
  callApi({
    uriEndPoint: userEndpoints.positionHeaderApi.v1,
  });

export const getMasterChildApi = () =>
  callApi({
    uriEndPoint: userEndpoints.getMasterChildApi.v1,
  });

export const permissionToggleApi = ({ body }: any) =>
  callApi({
    uriEndPoint: userEndpoints.permissionToggleApi.v1,
    body,
  });
