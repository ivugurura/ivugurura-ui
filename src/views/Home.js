import React, { useEffect } from "react";
import VideoPlayer from "react-player";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { SampleTopics, Communique } from "../components/common";
import { Page, Radio, TopicsCarousel } from "../components";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getYoutubeVideos } from "../redux/actions";
import { bgStyles, textStyles } from "../utils/styles";
import { AudioPlayer } from "../components/AudioPlayer";
import { systemLanguage } from "utils/constants";

// const ytbImg = `${process.env.PUBLIC_URL}/yt-img.png`;
const Home = () => {
  const { t } = useTranslation();
  const {
    youtubeVideosGet: { youtubeData },
  } = useSelector((state) => state);
  useEffect(() => {
    getYoutubeVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Page title="Home">
      <Communique />
      <Container fluid>
        <Row>
          <Col md={6} lg={6} xs={12}>
            <TopicsCarousel />
          </Col>
          <Col md={6} lg={6} xs={12}>
            <Row>
              <Col xs={12} sm={12} md={6}>
                <h4>{t("app:radioName")}</h4>
                <i>{t("app:radioMsg")}</i>
                <h6>
                  {t("app:listen")}{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    as={Link}
                    to={`/${systemLanguage}/radio`}
                  >
                    {t("app:listenRadio")}
                  </Button>
                </h6>
              </Col>
              <Col xs={12} sm={12} md={6}>
                <Radio />
              </Col>
              <Col xs={12} sm={12} md={12} style={{ height: "40vh" }}>
                {youtubeData.items.length > 0 && (
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeData.items[0]?.id?.videoId}`}
                    title="Ubugorozi Youtube"
                    width="100%"
                    height="100%"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <SampleTopics isHomePage topics={[]} loading={false} />
      <Card>
        <Card.Header className="text-center" style={bgStyles.bgPrimary}>
          <h1 style={textStyles.textTransparent}>{t("app:audioVideoTxt")}</h1>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col xs={12} md={3} lg={4}>
              <AudioPlayer />
            </Col>
            <Col xs={12} md={9} lg={8}>
              <VideoPlayer
                url="https://www.youtube.com/watch?v=jvZy1emoFV0"
                playing={false}
                width="100%"
                height="100%"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Page>
  );
};
export default Home;
