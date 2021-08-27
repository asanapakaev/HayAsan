import React from 'react';
import {BrowserRouter, Link, Switch, Route,} from 'react-router-dom';
import {Navbar, Container, Nav, NavDropdown, Row, Col, ListGroup,} from "react-bootstrap";
import HomeContainer from "./containers/HomeContainer";
import requester from "./utils/requester";
import TVContainer from "./containers/TVContainer";
import {getFirstLetterUpper} from "./utils";
import GenreViewContainer from "./containers/GenreViewContainer";
import PersonContainer from "./containers/PersonContainer";
import MovieContainer from "./containers/MovieContainer";
import MovieViewContainer from "./containers/MovieViewContainer";
import TvViewContainer from "./containers/TvViewContainer";

class App extends React.Component {
  state = {
    genres_movie: [],
    genres_tv: [],
  }

  componentDidMount() {
    requester.get('/genre/movie/list').then(({genres: genres_movie}) => {
      this.setState({genres_movie});
    });
    requester.get('/genre/tv/list').then(({genres: genres_tv}) => {
      this.setState({genres_tv});
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Navbar bg="dark" expand="lg" variant={'dark'}>
          <Container>
            <Navbar.Brand as={Link} to={'/'}>
              <img
                src="https://cinematica.kg/99c13a566f8363476f14db5420aaee6b.png"
                height="30"
                className="d-inline-block align-top"
                alt="Cinematica Logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to={'/'}>Главная</Nav.Link>
                <Nav.Link as={Link} to={'/movie'}>Фильмы</Nav.Link>
                <Nav.Link as={Link} to={'/tv'}>Сериалы</Nav.Link>
                <Nav.Link as={Link} to={'/person'}>Люди</Nav.Link>
                <NavDropdown title="Жанры TV" id="basic-nav-dropdown">
                  {this.state.genres_tv.map(v => (
                    <NavDropdown.Item as={Link} to={`/genre/tv/${v.id}`}>{getFirstLetterUpper(v.name)}</NavDropdown.Item>
                  ))}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className={'mt-3'}>
          <Row>
            <Col xs={12} md={9}>
              <Switch>
                <Route component={GenreViewContainer} path={'/genre/:type/:id'} />
                <Route component={MovieViewContainer} path={'/movie/:id'} />
                <Route component={TvViewContainer} path={'/tv/:id'} />
                <Route component={TVContainer} path={'/tv'} />
                <Route component={PersonContainer} path={'/person'} />
                <Route component={MovieContainer} path={'/movie'} />
                <Route component={HomeContainer} path={'/'} />
              </Switch>
            </Col>
            <Col md={3} className={'d-none d-md-block'}>
              <ListGroup className={'mb-4'}>
                {this.state.genres_movie.map(v => (
                  <ListGroup.Item as={Link} to={`/genre/movie/${v.id}`}>{getFirstLetterUpper(v.name)}</ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
