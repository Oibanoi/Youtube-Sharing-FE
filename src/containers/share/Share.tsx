import { Input, Button, message, Form } from "antd";
import { useState } from "react";
import { videoHooks } from "../../hooks";
import { useNavigate } from "react-router-dom";

const Share = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const { postVideo } = videoHooks.useVideoHook({ page: 1, page_size: 10 });
  const navigate = useNavigate();
  const handleShareClick = () => {
    if (!youtubeUrl || youtubeUrl === "") {
      message.error("Please enter a YouTube URL");
      return;
    }
    postVideo(youtubeUrl).then(() => {
      navigate("/");
    });
  };
  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        maxWidth: "400px",
      }}
    >
      <h3>Share a YouTube movie</h3>
      <Form>
        <Form.Item
          label={<label htmlFor="youtube-url">YouTube URL</label>}
          required
          validateStatus={youtubeUrl ? "success" : "error"}
          help={youtubeUrl ? "" : "Please input a valid YouTube URL."}
        >
          <Input
            id="youtube-url"
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            style={{
              width: "100%",
              marginTop: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              padding: "8px",
            }}
            value={youtubeUrl}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={handleShareClick}
            style={{
              width: "100%",
              borderRadius: "4px",
              padding: "10px",
            }}
          >
            Share
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Share;
