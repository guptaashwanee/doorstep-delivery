import axios from "axios";
const apiEndPoint =
    "http://cloud.ideoholics.com:8006/parts-delivery/delivery-request/create";

export const createRequest = (data) => {
    return axios.post(apiEndPoint, data);
};