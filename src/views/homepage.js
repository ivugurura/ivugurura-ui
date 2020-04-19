import React, { Fragment } from 'react';
import MarqueeText from 'react-marquee-text-component';
import VideoPlayer from 'react-player';
import AudioPlayer from 'react-audio-player';
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  FormControl,
  Button,
  Alert,
  Row,
  Card,
  Col,
  Form,
  ListGroup,
} from 'react-bootstrap';
import { bgStyles, textStyles } from '../utils/styles';

const ytbImg = `${process.env.PUBLIC_URL}/yt-img.png`;
const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
const Homepage = () => {
  return (
    <Fragment>
      <Navbar collapseOnSelect expand='lg' style={bgStyles.bgPrimary}>
        <Navbar.Brand href='#home' style={textStyles.textTransparent}>
          Ubugorozi
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#features' style={textStyles.textTransparent}>
              Home
            </Nav.Link>
            <Nav.Link href='#pricing' style={textStyles.textTransparent}>
              Divinity truth
            </Nav.Link>
            <Nav.Link href='#pricing' style={textStyles.textTransparent}>
              Social life
            </Nav.Link>
            <Nav.Link href='#pricing' style={textStyles.textTransparent}>
              The prophrcy
            </Nav.Link>
            <NavDropdown
              title='Preaching and songs'
              id='collasible-nav-dropdown'
              bsPrefix='nav-link'
            >
              <NavDropdown.Item href='#action/3.1'>Audio</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Video</NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
            </NavDropdown>
            <Nav.Link href='#pricing' style={textStyles.textTransparent}>
              Contact us
            </Nav.Link>
          </Nav>
          <Nav className='mr-auto'>
            <FormControl type='text' placeholder='Search' className='mr-sm-2' />
          </Nav>
          <Button variant='danger'>Umva Radio</Button>
        </Navbar.Collapse>
      </Navbar>
      <Container className='mt-2' fluid>
        <Alert variant='danger'>
          <h4>
            <MarqueeText text='Itangazo: Muratumiwe mu materaniro' repeat={1} />
          </h4>
        </Alert>
        <Row>
          <Col md={6} lg={6} xs={12}>
            <Card>
              <Card.Img variant='top' src={ytbImg} />
            </Card>
          </Col>
          <Col md={6} lg={6} xs={12}>
            <Card>
              <VideoPlayer url='' playing={false} width='100%' />
            </Card>
          </Col>
        </Row>
      </Container>
      <Card>
        <Card.Header style={bgStyles.bgPrimary} className='text-center'>
          <h1 style={textStyles.textTransparent}>Radio Ijwi ry Ubugorozi</h1>
          <Card.Link style={textStyles.textTransparent}>
            Yumve nonaha hano
          </Card.Link>
        </Card.Header>
        <Card.Body style={bgStyles.bgAccent}>
          <Row>
            {[1, 2, 3].map((item) => (
              <Col key={item} xs={12} md={4} lg={4}>
                <Card>
                  <Card.Img variant='top' src={topicImg} />
                  <Card.Body>
                    <Card.Title>Topic title</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content...
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header className='text-center'>
          <h1>Indirimbo na video z Abagorozi</h1>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col xs={12} md={4} lg={4}>
              <AudioPlayer src='' controls />
            </Col>
            <Col xs={12} md={8} lg={8}>
              <VideoPlayer url='' playing={false} width='100%' />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <footer>
        <Card style={bgStyles.bgPrimary}>
          <Container style={textStyles.textTransparent} className='mt-4'>
            <Row>
              <Col xs={12} md={4} lg={4}>
                <Card.Body>
                  <Card.Title>Inyandiko</Card.Title>
                  <Form.Control size='lg' as='select'>
                    {[1, 2, 3].map((topic) => (
                      <option key={topic}>{`Icyigisho cya ${topic}`}</option>
                    ))}
                  </Form.Control>
                  {[1, 2, 3].map((item) => (
                    <Card.Text key={item}>{`Icyigisho cya ${item}`}</Card.Text>
                  ))}
                </Card.Body>
              </Col>
              <Col xs={12} md={4} lg={4}>
                <Card.Body>
                  <Card.Title>Twandikire</Card.Title>
                  {['Amazina', 'Email', 'Message'].map((contact) => (
                    <Form.Control
                      key={contact}
                      className='mb-2'
                      type='text'
                      placeholder={contact}
                    />
                  ))}
                </Card.Body>
              </Col>
              <Col xs={12} md={4} lg={4}>
                <Card.Title>Ibyigisho biheruka</Card.Title>
                {[1, 2, 3].map((el) => (
                  <ListGroup variant='flush' key={el}>
                    <ListGroup.Item>
                      <h4>{`Icyigisho cya ${el}`}</h4>
                      <smal>April, 20</smal>
                    </ListGroup.Item>
                  </ListGroup>
                ))}
              </Col>
            </Row>
          </Container>
        </Card>
      </footer>
    </Fragment>
  );
};
export default Homepage;
