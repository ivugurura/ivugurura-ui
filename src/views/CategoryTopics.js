import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Breadcrumb } from 'react-bootstrap';
import { RecentTopics, Communique, Loading } from '../components/common';
import { bgStyles } from '../utils/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryDetail, getTopics } from '../redux/actions';
import { Link } from 'react-router-dom';
import { scrollToRef } from '../utils/constants';
import { Page } from '../components';

const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
export const CategoryTopics = ({ match }) => {
  const categoriesRef = useRef(null);
  const { categorySlug } = match.params;
  const dispatch = useDispatch();
  const { topic, oneCategory } = useSelector(({ topic, oneCategory }) => ({
    topic,
    oneCategory
  }));
  const { categoryLoading, categoryTopics } = topic;
  const { categoryFetched, categoryFetching, category } = oneCategory;
  useEffect(() => {
    scrollToRef(categoriesRef);
    dispatch(getCategoryDetail(categorySlug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySlug]);
  useEffect(() => {
    if (categoryFetched) {
      dispatch(getTopics({ page: 1, pageSize: 20, category: category.id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFetched]);
  return (
    <Page title={category.name || ''}>
      <Communique />
      <Container fluid>
        <Row>
          <Col xs={12} md={9} lg={9}>
            {categoryFetching ? (
              <Loading />
            ) : (
              <Breadcrumb>
                <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
                <Breadcrumb.Item>{category.parent.name}</Breadcrumb.Item>
                <Breadcrumb.Item active>{category.name}</Breadcrumb.Item>
              </Breadcrumb>
            )}
            <div className='card-columns' ref={categoriesRef}>
              {categoryLoading ? (
                <Loading />
              ) : categoryTopics.length ? (
                categoryTopics.map((topic, topicIndex) => (
                  <Link key={topicIndex} to={`/topics/${topic.slug}`}>
                    <Card>
                      <Card.Img
                        src={`${process.env.REACT_APP_API_URL}/images/${topic.coverImage}`}
                      />
                      <Card.Body>
                        <Card.Title>{topic.title}</Card.Title>
                        <Card.Text>{topic.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                ))
              ) : (
                <h4 className='text-center'>{category.name}</h4>
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
    </Page>
  );
};
