import { callApi } from "../../../utils/api/apiUtils";
import { authEndpoints } from "../../Endpoints/Auth";

export const loginApiCall = ({ body }: any) =>
  callApi({
    uriEndPoint: authEndpoints.mobileLogin.v1,
    body,
  });

export const mobileLogout = ({ body }: any) =>
  callApi({
    uriEndPoint: authEndpoints.mobileLogout.v1,
    body,
  });

export const changePassword = ({ body }: any) =>
  callApi({
    uriEndPoint: authEndpoints.changePassword.v1,
    body,
  });

export const loginHistory = ({ query }: any) =>
  callApi({
    uriEndPoint: authEndpoints.loginHistory.v1,
    query,
  });
