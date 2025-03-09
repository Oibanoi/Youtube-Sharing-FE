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
    current_page: number;
    page_size: number;
    total_items: number;
  };
}
export interface IVideoFilter {
  page: number;
  page_size: number;
}
