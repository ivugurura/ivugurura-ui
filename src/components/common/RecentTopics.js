import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { textStyles } from "../../utils/styles";
import { useSelector } from "react-redux";
import { getTopics } from "../../redux/actions";
import { Loading } from "./Loading";
import { formatDate, systemLanguage } from "../../utils/constants";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const RecentTopics = () => {
  const { t } = useTranslation();
  const { recentLoading, recentTopics } = useSelector(({ topic }) => topic);
  useEffect(() => {
    getTopics({ page: 1, pageSize: 4, category: "recent" });
  }, []);
  return (
    <Card.Body style={textStyles.textTransparent}>
      <Card.Title style={textStyles.textFtTitle}>
        {t("app:recentTopics")}
      </Card.Title>
      {recentLoading ? (
        <Loading />
      ) : recentTopics.length ? (
        recentTopics.map((topic, topicIndex) => (
          <Card.Body key={topicIndex}>
            <Link to={`/${systemLanguage}/topics/${topic.slug}`}>
              <h6>{topic.title}</h6>
              <p>{formatDate(topic.createdAt)}</p>
            </Link>
          </Card.Body>
        ))
      ) : (
        <h4>No topics</h4>
      )}
    </Card.Body>
  );
};
