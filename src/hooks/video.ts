import { useState } from "react";
import { videoServices } from "../services";
import { IVideoResponse } from "../interface";
const useVideoHook = () => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<IVideoResponse[]>([]);
  const [total, setTotal] = useState<number>(0);
  const getVideos = async () => {
    try {
      setLoading(true);
      const res = await videoServices.get();
      if (res) {
        const { posts, total } = res;
        setVideos(posts ?? []);
        setTotal(total);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  const postVideo = async (url: string) => {
    try {
      setLoading(true);
      const res = await videoServices.share(url);
      if (res) {
        console.log(res);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    postVideo,
    getVideos,
    videos,
    total,
  };
};
export default {
  useVideoHook,
};
