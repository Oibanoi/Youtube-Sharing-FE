import { useEffect, useState } from "react";
import ListVideo from "../../components/Videos/ListVideo";

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ height: "inherit", width: isMobile ? "100%" : "60%" }}>
      <ListVideo />
    </div>
  );
};

export default Home;
