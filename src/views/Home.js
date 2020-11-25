import React from 'react';
import VideoPlayer from 'react-player';
import { Container, Row, Col } from 'react-bootstrap';
import { SampleTopics, Communique } from '../components/common';
import { Page, Radio, TopicsCarousel } from '../components';
import { useTranslation } from 'react-i18next';

// const ytbImg = `${process.env.PUBLIC_URL}/yt-img.png`;
const Home = () => {
	const { t } = useTranslation();
	return (
		<Page title='Home'>
			<Communique />
			<Container fluid>
				<Row style={{ height: '60vh' }}>
					<Col md={6} lg={6} xs={12}>
						<TopicsCarousel />
					</Col>
					<Col md={6} lg={6} xs={12}>
						<Row>
							<Col xs={12} sm={12} md={6}>
								<h4>{t('app:radioName')}</h4>
								<i>{t('app:radioMsg')}</i>
								<h6>{t('app:listen')}</h6>
							</Col>
							<Col xs={12} sm={12} md={6}>
								<Radio />
							</Col>
							<Col xs={12} sm={12} md={12}>
								<VideoPlayer
									url='https://www.youtube.com/watch?v=45KCx3YrSKU'
									playing={false}
									width='100%'
									height='170%'
								/>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
			<SampleTopics isHomePage topics={[]} loading={false} />
			{/* <Card>
        <Card.Header className='text-center' style={bgStyles.bgPrimary}>
          <h1 style={textStyles.textTransparent}>
            {translate('audioVideoTxt')}
          </h1>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col xs={12} md={3} lg={4}>
              <AudioPlayer />
            </Col>
            <Col xs={12} md={9} lg={8}>
              <VideoPlayer
                url='https://www.youtube.com/watch?v=jvZy1emoFV0'
                playing={false}
                width='100%'
              />
            </Col>
          </Row>
        </Card.Body>
      </Card> */}
		</Page>
	);
};
export default Home;
