import React from 'react';
import requester from "../utils/requester";
import LoadingComponent from "../components/LoadingComponent";
import {Col, Row} from "react-bootstrap";
import ErrorComponent from "../components/ErrorComponent";
import ItemComponent from "../components/ItemComponent";

class GenreViewContainer extends React.Component {
  state = {
    items: [],
    loading: false,
  }

  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    if (!['tv', 'movie'].includes(this.props.match.params.type)) return;
    this.setState({loading: true});
    requester.get(`/discover/${this.props.match.params.type}`, {
      with_genres: this.props.match.params.id,
    }).then((response) => {
      this.setState({items: response.results});
    }).finally(() => {
      this.setState({loading: false});
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetch();
    }
  }

  render() {
    if (!['tv', 'movie'].includes(this.props.match.params.type)) {
      return (
        <ErrorComponent />
      );
    }

    return (
      <>
        {this.state.loading ? (
          <LoadingComponent/>
        ) : (
          <>
            <Row>
              {this.state.items.map(v => (
                <Col className={'mb-4'} xs={6} sm={4} md={4} lg={3}>
                  <ItemComponent v={v} to={`/${this.props.match.params.type}/${v.id}`} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </>
    );
  }
}

export default GenreViewContainer;
