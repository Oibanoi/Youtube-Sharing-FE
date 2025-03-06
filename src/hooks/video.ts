import { useEffect, useState } from "react";
import { videoServices } from "../services";
import { IPagination, IVideoFilter, IVideoResponse } from "../interface";
const useVideoHook = (defaultFilters: IVideoFilter) => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<IVideoResponse[]>([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [pagination, setPagination] = useState<IPagination>();
  console.log("useVideoHook");
  const getVideos = async (params: IVideoFilter) => {
    try {
      setLoading(true);
      const res = await videoServices.get(params);
      console.log(res);
      if (res.data) {
        const { currentPage, pageSize, totalItems } = res.metadata;
        const videos = res.data;
        setVideos(videos);
        setPagination({
          currentPage: currentPage,
          pageSize,
          totalItems: totalItems,
        });
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
  useEffect(() => {
    console.log("useEffect");
    getVideos(filters);
  }, [filters]);
  return {
    loading,
    postVideo,
    getVideos,
    videos,
    pagination,
    setFilters,
  };
};
export default {
  useVideoHook,
};
