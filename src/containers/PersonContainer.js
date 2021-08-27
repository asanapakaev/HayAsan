import React from 'react';
import requester from "../utils/requester";
import LoadingComponent from "../components/LoadingComponent";
import {Link} from "react-router-dom";
import {Card, Row, Col, Button, Spinner} from "react-bootstrap";
import {getFileUrl} from "../utils";

class PersonContainer extends React.Component {
  state = {
    items: [],
    loading: false,
    next_page: false,
    current_page: 1,
  }

  componentDidMount() {
    this.setState({loading: true});
    requester.get('/person/popular').then((res) => {
      this.setState({items: res.results});
      console.log(res);
    }).finally(() => {
      this.setState({loading: false});
    });
  }

  nextPage = () => {
    this.setState(prev => ({next_page: true, current_page: prev.current_page + 1}));
    requester.get('/person/popular', {
      page: this.state.current_page + 1,
    }).then((res) => {
      this.setState(p => ({items: [...p.items, ...res.results,]}));
    }).finally(() => {
      this.setState({next_page: false});
    });
  };

  render() {
    return (
      <>
        <h1 className={'h2 mb-3'}>Популярные люди</h1>
        {this.state.loading ? (
          <LoadingComponent/>
        ) : (
          <>
            <Row>
              {this.state.items.map(v => (
                <Col className={'mb-4'} xs={12} md={6}>
                  <Card as={Link} to={`/person/${v.id}`} className={'d-flex flex-row'}>
                    <img width={150} src={getFileUrl(v.profile_path)}/>
                    <Card.Body>
                      <Card.Title>{v.name}</Card.Title>
                      {v.known_for.length > 0 && (
                        <div className={'text-muted'}>
                          <strong>Извесность за:</strong>
                          <ul>
                            {v.known_for.map(g => (
                              <div>{'title' in g ? g.title : g.name}</div>
                            ))}
                          </ul>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <div className={'d-flex justify-content-center'}>
              <Button onClick={() => this.nextPage()} disabled={this.state.next_page} className={'mb-4'}>
                {this.state.next_page && (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Loading...</span>{' '}
                  </>
                )}
                Загрузить еще
              </Button>
            </div>
          </>
        )}
      </>
    );
  }
}

export default PersonContainer;
