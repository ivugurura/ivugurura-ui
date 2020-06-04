import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Breadcrumb } from 'react-bootstrap';
import { RecentTopics, Communique, Loading } from '../components/common';
import { bgStyles } from '../utils/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryDetail, getTopics } from '../redux/actions';

const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
export const CategoryTopics = ({ match }) => {
  const { categorySlug } = match.params;
  const dispatch = useDispatch();
  const { topic, oneCategory } = useSelector(({ topic, oneCategory }) => ({
    topic,
    oneCategory,
  }));
  const { categoryLoading, categoryTopics } = topic;
  const { categoryFetched, categoryFetching, category } = oneCategory;
  useEffect(() => {
    dispatch(getCategoryDetail(categorySlug));
    if (categoryFetched) {
      dispatch(getTopics({ page: 1, pageSize: 10, category: category.id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getCategoryDetail,
    categorySlug,
    categoryFetched,
    getTopics,
    category.id,
  ]);

  return (
    <>
      <Communique />
      <Container fluid>
        <Row>
          <Col xs={12} md={9} lg={9}>
            {categoryFetching ? (
              <Loading />
            ) : (
              <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>{category.parent.name}</Breadcrumb.Item>
                <Breadcrumb.Item active>{category.name}</Breadcrumb.Item>
              </Breadcrumb>
            )}
            <div className='card-columns'>
              {categoryLoading ? (
                <Loading />
              ) : categoryTopics.length ? (
                categoryTopics.map((topic, topicIndex) => (
                  <Card>
                    <Card.Img
                      src={`${process.env.REACT_APP_API_URL}/images/${topic.coverImage}`}
                    />
                    <Card.Body>
                      <Card.Title>{topic.title}</Card.Title>
                      <Card.Text>{topic.description}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <h4 className='text-center'>
                  No topics for category {category.name}!
                </h4>
              )}
            </div>
          </Col>
          <Col xs={12} md={3} lg={3} style={bgStyles.bgPrimary}>
            <RecentTopics />
            <Card>
              <Card.Img src={topicImg} />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
