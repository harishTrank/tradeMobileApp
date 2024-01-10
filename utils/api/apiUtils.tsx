import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import queryString from "querystring";
import { Alert } from "react-native";

export const hostname = () => {
  // let hostUrl = "http://52.66.205.199:8000/api";
  let hostUrl = "http://192.168.0.175:8000/api";
  // let hostUrl = "http://localhost:8000/api";

  return hostUrl;
};

const hostUrl = hostname();
export const makeUrl = (
  { uri = "", pathParams, query, version }: any,
  host: any
) =>
  `${host || hostUrl}${version}${uri
    .split("/")
    .map((param: any) =>
      param.charAt(0) === ":" ? encodeURI(pathParams[param.slice(1)]) : param
    )
    .join("/")}${query ? `?${queryString.stringify(query)}` : ""}`;

export const getDefaultHeaders = async (multipart: boolean) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  const contentType =
    multipart === true ? "multipart/form-data" : "application/json";

  if (accessToken) {
    const authorization = `Bearer ${accessToken}`;

    return {
      authorization,

      "Content-Type": contentType,
    };
  } else {
    return {
      "Content-Type": contentType,
    };
  }
};

/**
 * Returns true if the input apiResponse has errors.
 * @param {*} apiResponse
 */
export const hasErrors = (apiResponse: any) => {
  const { error } = apiResponse;
  if (error) {
    return true;
  }
  return false;
};
/**
 * Generic utility method that should be called when invoking any REST API
 *
 * This function streamlines the functionality to make api calls,
 * and carries easy management for controlling versions of the apis
 *
 * @since 1.0.0
 *
 * @todo all the incoming values for the APIParamaters.pathParams and APIParamaters.query
 * should be uri encoded.
 * @alias callAxios
 * @memberof apiUtils
 * @param {Object} APIParamaters - Set of objects required to make the api call.
 * @param {Object} APIParamaters.uriEndPoint - Endpoint object as described in apiEndPoints.js.
 * @param {String} APIParamaters.uriEndPoint.api - Path to your endpoint
 * @param {String} APIParamaters.uriEndPoint.method - POST/GET/PUT/DELETE etc.
 * @param {String} APIParamaters.uriEndPoint.version - Versioning of your api
 * @param {Object} APIParamaters.uriEndPoint.headerProps - Object of headers you want to pass.
 * @param {Object} APIParamaters.pathParams - Path parameters. Example :id in the path,
 * then pathParams object will be {id:value}.
 * @param {Object} APIParamaters.query - GET/POST/PUT/DELETE Endpoint.
 * @param {Object} APIParamaters.body - Body of the request.
 * @returns {Promise<object>} Body Data from the server.
 */
const callAxios = async (
  { uriEndPoint, pathParams, query, body, apiHostUrl, multipart }: any,
  options?: CallApiOptions
) => {
  const defHeaders = await getDefaultHeaders(multipart);
  let headers = {};
  if (!options?.hideDefaultHeaders) {
    headers = {
      ...defHeaders,
    };
  }
  return Axios({
    method: uriEndPoint.method,
    url: makeUrl({ ...uriEndPoint, pathParams, query }, apiHostUrl),
    headers: {
      ...headers,
      ...uriEndPoint.headerProps,
    },
    data: body || undefined,
  });
};
/**
 * Extract the error messages from a failed API response.
 * @param {} apiResponse
 */
// const extractErrors = () => {};
/**
 * Generic utility method that should be called when invoking any REST API
 *
 * This function streamlines the functionality to make api calls,
 * and carries easy management for controlling versions of the apis
 *
 * @since 2.0.0
 *
 * @todo all the incoming values for the APIParamaters.pathParams and APIParamaters.query
 * should be uri encoded.
 * @alias callApi
 * @memberof apiUtils
 * @param {Object} APIParamaters - Set of objects required to make the api call.
 * @param {Object} APIParamaters.uriEndPoint - Endpoint object as described in apiEndPoints.js.
 * @param {String} APIParamaters.uriEndPoint.api - Path to your endpoint
 * @param {String} APIParamaters.uriEndPoint.method - POST/GET/PUT/DELETE etc.
 * @param {String} APIParamaters.uriEndPoint.version - Versioning of your api
 * @param {Object} APIParamaters.uriEndPoint.headerProps - Object of headers you want to pass.
 * @param {Object} APIParamaters.pathParams - Path parameters. Example :id in the path,
 * then pathParams object will be {id:value}.
 * @param {Object} APIParamaters.query - GET/POST/PUT/DELETE Endpoint.
 * @param {Object} APIParamaters.body - Body of the request.
 * @returns {Promise<object>} Body Data from the server.
 */

export const callApi = (
  {
    uriEndPoint = { uri: "", method: "", version: "", headerProps: {} },
    pathParams,
    query,
    body,
    apiHostUrl,
    multipart,
  }: CallApiType,
  options?: CallApiOptions
) =>
  new Promise((resolve, reject) => {
    callAxios(
      {
        uriEndPoint,
        pathParams,
        query,
        body,
        apiHostUrl,
        multipart,
      },
      options
    )
      .then((response) => {
        resolve(response.data);
        // localStorage.setItem("timer", 1800);
      })
      .catch((err) => {
        if (!err.response) {
          reject(err);
          Alert.alert("Server TimeOut.");
          // if (!getPageQuery().redirect) {
          //   // history.push(
          //   //   `/server-unreachable?${stringify({
          //   //     redirect: window.location.href,
          //   //   })}`,
          //   // );
          // }
          return;
        }
        if (err?.response?.status === 401) {
          //   history.push(
          //     `/user/login?${stringify({
          //       redirect: window.location.href,
          //     })}`
          //   );
          // unauthorized
          //   clearLocalStroage();
          reject(err.response);
        }
        if (err?.response) {
          reject(err.response);
        }
      });
  });

interface CallApiType {
  uriEndPoint?: UriEndPoint;
  pathParams?: HeaderPropsOrPathParamsOrQueryOrBody;
  query?: HeaderPropsOrPathParamsOrQueryOrBody;
  body?: HeaderPropsOrPathParamsOrQueryOrBody;
  apiHostUrl?: string;
  multipart?: boolean;
}

interface CallApiOptions {
  hideDefaultHeaders: boolean;
}
export interface UriEndPoint {
  pathParams?: UriEndPoint;
  uri: string;
  method: string;
  version: string;
  headerProps?: HeaderPropsOrPathParamsOrQueryOrBody;
  apiKey?: string;
}
interface HeaderPropsOrPathParamsOrQueryOrBody {}

export interface UriEndPointWithVersions {
  v1: UriEndPoint;
}
