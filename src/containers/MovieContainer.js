import React from 'react';
import requester from "../utils/requester";
import LoadingComponent from "../components/LoadingComponent";
import {Button, Row, Col, Spinner} from "react-bootstrap";
import ItemComponent from "../components/ItemComponent";

class MovieContainer extends React.Component {
  state = {
    items: [],
    loading: false,
    next_page: false,
    current_page: 1,
  }

  componentDidMount() {
    this.setState({loading: true});
    requester.get('/movie/popular', {
      page: 1,
    }).then((res) => {
      this.setState({items: res.results});
      console.log(res);
    }).finally(() => {
      this.setState({loading: false});
    });
  }

  nextPage = () => {
    this.setState(prev => ({next_page: true, current_page: prev.current_page + 1}));
    requester.get('/movie/popular', {
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
        <h1 className={'h2 mb-3'}>Фильмы</h1>
        {this.state.loading ? (
          <LoadingComponent />
        ) : (
          <>
            <Row>
              {this.state.items.map(v => (
                <Col className={'mb-4'} xs={6} sm={4} md={4} lg={3}>
                  <ItemComponent to={`/movie/${v.id}`} v={v} />
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

export default MovieContainer;
