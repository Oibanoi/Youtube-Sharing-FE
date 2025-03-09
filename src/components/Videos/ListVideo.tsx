import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Spin, Typography } from "antd";
import { videoHooks } from "../../hooks";
import styled from "styled-components";
import { useState } from "react";

const { Title, Text } = Typography;
const ListVideo = () => {
  const [page, setPage] = useState(1);
  const { videos, loading, getVideos, pagination } = videoHooks.useVideoHook({
    page: page,
    page_size: 10,
  });
  const getYoutubeId = (url: string): string | null => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
  const loadMoreVideos = async () => {
    console.log(pagination);
    getVideos({ page: page + 1, page_size: 10 });
    setPage(page + 1);
  };
  return (
    <div>
      {videos.map((video) => (
        <Card key={video.id} style={{ marginBottom: 20 }} bordered={false}>
          <Row gutter={16} align="middle">
            <Col span={12}>
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${getYoutubeId(
                  video.youtubeUrl
                )}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <Title level={4} style={{ margin: 0 }}>
                    {video.title}
                  </Title>
                </Col>
                <Col span={24}>
                  <Text>Shared by: {video.userName}</Text>
                </Col>
              </Row>
              <Row style={{ marginTop: 10 }}>
                <Col span={24}>
                  <TextDesc>{video.description}</TextDesc>
                </Col>
              </Row>

              <Row style={{ marginTop: 10 }}>
                <Col span={24}>
                  <Button
                    icon={<LikeOutlined />}
                    type="default"
                    style={{ marginRight: 8 }}
                  >
                    0 Upvote
                  </Button>
                  <Button icon={<DislikeOutlined />} type="default">
                    Downvote
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      ))}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        {loading ? (
          <Spin />
        ) : (
          <Button
            type="primary"
            onClick={loadMoreVideos}
            disabled={videos.length >= (pagination?.total_items ?? 100)}
          >
            Load More
          </Button>
        )}
      </div>
    </div>
  );
};
export default ListVideo;
const TextDesc = styled(Text)`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;
