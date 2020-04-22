import React, { Fragment } from 'react';
import { Row, Col, Container, Card, Form } from 'react-bootstrap';
import { RecentTopics, SampleTopics } from '../components/common';
import { bgStyles } from '../utils/styles';

const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
export const TopicView = () => {
  return (
    <Fragment>
      <Container fluid>
        <Row>
          <Col xs={12} md={9} lg={9}>
            <Card.Title>
              Ingaruka mbi yo kurya ibivumbiko byinshi (Calories)
            </Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>April, 20</Card.Subtitle>
            <Card>
              <Card.Img variant='top' src={topicImg} />
              <Card.Body>
                <Card.Text>
                  Muraho bene data tubaramukije mu izina rya Yesu ngo Uwiteka
                  abahire kandi abahe Umugisha! Mwese mumenye ko turi ku isi
                  tutarahishyize. Hari uwaturemye, turi umutungo we bwite.
                  “Kandi ntimuri abanyu ngo mwigenge ” 1Abakorinto 6:19
                  Twishimire rero ko Ajya kuturema yaduhaye ubwenge butekereza
                  akaturutisha ibindi biremwa, ariko kandi kubaho utibaza
                  impamvu uriho n’icyo usabwa mu minsi uzamara, uba ufite icyo
                  ubura mu bwenge. DORE I BYO UMUNTU UFITE UBWENGE AGOMBA
                  KWIBAZA. Kuki ndiho? None nzahoraho? Iherezo ryanjye rizaba
                  irihe? 1. KUKI NDIHO? “Nzanira umuntu wese witiriwe izina
                  ryanjye, uwo naremeye kumpesha icyubahiro. Ni jye wamuremye,
                  ni jye wamubumbye.” Yesaya 43:7. “Mwa bari mu isi yose mwe,
                  Muvugirize Uwiteka impundu, Mukorere Uwiteka munezerewe, Muze
                  mu maso ye muririmba mumenye yuko Uwiteka ari we Mana, Ni we
                  waturemye natwe turi abe, Turi ubwoko bwe, Turi intama zo mu
                  cyanya cye.” Zaburi 100:1-3. “Mwinjire mu marembo ye mushima,
                  No mu bikari bye muhimbaza, Mumushime, musingize izina rye.”
                  Zaburi 100:4 Guhesha Imana icyubahiro ni ukudakora icyaha,
                  kandi Umuntu akora icyaha mu buryo bune ari bwo: Mu bikorwa;
                  Yakobo 2:12 Mu magambo; Matayo 12:36-37 Mu ntekerezo
                  n’imigambi; Imigani 24:8-9; 15:26 No mu kudasohoza inshingano
                  zose ushinzwe. Yakobo 4:17 Luka 6:49 Muri ubu buryo uba ubaye
                  umunyabyaha Kandi usuzuguye Imana, uyibabaje, wikururiyeho
                  urubanza no gucirwaho iteka. Imana ntinezezwa n’abagira
                  urwango nubwo rwaba ruhishwe mu mutima; “Umuntu wese wanga
                  mwene Se ni umwicanyi, kandi muzi yuko ari nta mwicanyi ufite
                  ubugingo buhoraho muri we.” 1 Yohana 3:15. “Uwangana ahorana
                  amagambo ashukana, Arik o mu mutima we abitsemo uburyarya.”
                  Imigani 26:24 “Nyamara niba musohoza amategeko y’Umwami wacu,
                  nk’uko byanditswe ngo”Ukunde mugenzi wawe nk’uko wikunda”,
                  muba mukoze neza.” Yakobo 2:8. “Ufite urukundo ntagirira
                  mugenzi we nabi, ni cyo gituma urukundo ari rwo rusohoza
                  amategeko.” Abaroma 13:10
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Form.Control as='textarea' rows='3' />
                <Form.Row className='mt-2'>
                  <Form.Group as={Col} md='4' controlId='validationFormik01'>
                    <Form.Control type='text' name='firstName' />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md='4' controlId='validationFormik02'>
                    <Form.Control type='text' name='lastName' />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md='4'
                    controlId='validationFormikUsername'
                  >
                    <Form.Control
                      type='text'
                      placeholder='Username'
                      aria-describedby='inputGroupPrepend'
                      name='username'
                    />
                    <Form.Control.Feedback type='invalid'>
                      Error
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
              </Card.Footer>
            </Card>
          </Col>
          <Col xs={12} md={3} lg={3} style={bgStyles.bgPrimary}>
            <RecentTopics />
            <Card>
              <Card.Img src={topicImg} />
            </Card>
          </Col>
        </Row>
      </Container>
      <SampleTopics />
    </Fragment>
  );
};
