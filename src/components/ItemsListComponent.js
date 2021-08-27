import React from 'react';
import requester from "../utils/requester";
import {Button, ButtonGroup, Col, Row} from "react-bootstrap";
import LoadingComponent from "./LoadingComponent";
import ItemComponent from "./ItemComponent";

class ItemsListComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      list: [],
      type: this.props.payload.buttons.length > 0 ? this.props.payload.buttons[0].value : null,
    };
  }

  fetch = async () => {
    this.setState({fetching: true});
    try {
      const data = await requester.get(this.props.payload.buttons.find(g => g.value === this.state.type).url);
      console.log(data);
      this.setState({list: data.results});
    } catch (e) {

    } finally {
      this.setState({fetching: false});
    }
  };

  componentDidMount() {
    this.fetch().then();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.type !== this.state.type) {
      this.fetch().then();
    }
  }

  setType = (type) => {
    if (this.state.popular_fetching) return;
    this.setState({type});
  };

  render() {
    const button = this.props.payload.buttons.find(k => k.value === this.state.type);
    return (
      <>
        <div className={'d-flex align-items-center justify-content-between'}>
          <h2 className={'mb-3'}>{this.props.title}</h2>
          <ButtonGroup aria-label="Basic example">
            {this.props.payload.buttons.map(v => (
              <Button onClick={() => this.setType(v.value)}
                      variant={this.state.type === v.value ? 'primary' : 'secondary'}
                      disabled={this.state.type === v.value}>{v.label}</Button>
            ))}
          </ButtonGroup>
        </div>
        {this.state.fetching ? (
          <LoadingComponent/>
        ) : (
          <Row>
            {this.state.list.slice(0, 8).map(v => (
              <Col className={'mb-4'} xs={6} sm={4} md={4} lg={3}>
                <ItemComponent to={button.getUrl(v)} v={v} />
              </Col>
            ))}
          </Row>
        )}
      </>
    );
  }
}

export default ItemsListComponent;
