import io from "socket.io-client";

// export const nodeURL = "http://localhost:5000";
export const nodeURL = "http://13.232.101.55:5000";

const socket = io(nodeURL);

const connectSocket = () => {
  socket.connect();
};

// ---------------------------------------------
const subscribeToAllData = (callback: any) => {
  socket.on("tradeCoin data", callback);
};

const getAllData = () => {
  socket.emit("tradeCoin");
};
// ---------------------------------------------

// ---------------------------------------------
let filterDataRequestInProgress = false;
const subscribeToFilterData = (callback: any) => {
  socket.on("filterDataSend", callback);
};

const getFilterData = (data: any) => {
  if (!filterDataRequestInProgress) {
    filterDataRequestInProgress = true;
    socket.emit("filterDataGet", data);
  }
};

const getFilterOff = () => {
  filterDataRequestInProgress = false;
  socket.emit("filterDataOff");
};
// ---------------------------------------------

// ---------------------------------------------
const subscribeToGetOneData = (callback: any) => {
  socket.on("getOneDataSend", callback);
};
const getOneData = (data: any) => {
  socket.emit("getOneData", data);
};
const getOneDataOff = () => {
  socket.emit("getOneDataOff");
  socket.off("getOneDataSend");
};
// ---------------------------------------------

const disconnectSocket = () => {
  socket.disconnect();
};

export {
  connectSocket,
  disconnectSocket,
  subscribeToAllData,
  subscribeToFilterData,
  subscribeToGetOneData,
  getAllData,
  getFilterData,
  getOneData,
  getFilterOff,
  getOneDataOff,
};
