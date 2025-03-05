import { requestServices } from "..";
import { getData } from "../../helpers/request";
import { IVideoResponse } from "../../interface";

const { baseClient } = requestServices;
const share = (url: string): Promise<IVideoResponse> => {
  return baseClient.post("/share", { url: url }).then(getData);
};
const get = () => {
  return baseClient.get("").then(getData);
};
export default {
  share,
  get,
};
