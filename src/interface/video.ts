export interface IVideoResponse {
  id: number;
  userName: string;
  youtubeUrl: string;
  title: string;
  description: string;
}
export interface IGetVideoResponse {
  data: IVideoResponse[];
  metadata: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
  };
}
export interface IVideoFilter {
  page: number;
  page_size: number;
}
