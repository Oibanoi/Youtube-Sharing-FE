import { requestServices } from "..";
import { getData, getResult } from "../../helpers/request";
import {
  IGetVideoResponse,
  IVideoFilter,
  IVideoResponse,
} from "../../interface";

const { baseClient } = requestServices;
const share = (url: string): Promise<IVideoResponse> => {
  return baseClient.post("/videos", { videoUrl: url }).then(getData);
};
const get = (params: IVideoFilter): Promise<IGetVideoResponse> => {
  return baseClient.get("/videos", { params }).then(getResult);
};
export default {
  share,
  get,
};
