import React from "react";
import { Card } from "react-bootstrap";
// import HtmlParser from 'react-html-parser';
import { useTranslation } from "react-i18next";
import { Comments } from "./Comments";
import { CommentaryForm } from "./CommentaryForm";
import { formatDate, IMAGE_PATH } from "utils/constants";

export const TopicOneView = ({
  topic = {},
  topicSlug = "",
  showComments = false,
  topicRef = null,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Card.Title>{topic.title}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        <h6>
          {t("app:createdAt")} {`${formatDate(topic.createdAt)}`}
        </h6>
      </Card.Subtitle>
      <Card ref={topicRef}>
        <Card.Img
          variant="top"
          src={`${IMAGE_PATH}/${topic.coverImage}`}
          alt={topic.description}
        />
        <Card.Body>
          {/* {HtmlParser(topic.content)} */}
          <strong>{t("app:title")}</strong>
          {showComments && <Comments slug={topicSlug} />}
        </Card.Body>
        <Card.Footer>
          {showComments && <CommentaryForm slug={topicSlug} />}
        </Card.Footer>
      </Card>
    </>
  );
};
