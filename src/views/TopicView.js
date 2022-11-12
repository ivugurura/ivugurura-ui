import React, { useEffect, useRef } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import {
  RecentTopics,
  SampleTopics,
  Communique,
  Loading,
} from "components/common";
import { bgStyles } from "utils/styles";
import { useSelector } from "react-redux";
import { getTopicDetail } from "redux/actions/topics";
import { Page } from "components";
import { scrollToRef } from "utils/constants";
import { TopicOneView } from "components/TopicOneView";

const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
const TopicView = ({ match }) => {
  const topicRef = useRef(null);

  const { topicSlug } = match.params;
  const { topic, loading } = useSelector(({ topicGet }) => topicGet);
  useEffect(() => {
    getTopicDetail(topicSlug);
    scrollToRef(topicRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicSlug]);

  return (
    <Page title={topic.title || ""}>
      <Communique />
      <Container fluid>
        <Row>
          <Col xs={12} md={9} lg={9}>
            {loading ? (
              <Loading />
            ) : (
              <TopicOneView
                topic={topic}
                topicSlug={topicSlug}
                topicRef={topicRef}
                showComments
              />
            )}
          </Col>
          <Col xs={12} md={3} lg={3} style={bgStyles.bgPrimary}>
            <RecentTopics />
            <Card>
              <Card.Img src={topicImg} />
            </Card>
          </Col>
        </Row>
      </Container>
      <SampleTopics loading={loading} topics={topic.category?.relatedTopics} />
    </Page>
  );
};
export default TopicView;
