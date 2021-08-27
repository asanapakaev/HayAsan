import React from 'react';
import {Link} from "react-router-dom";
import {Card} from "react-bootstrap";
import {getFileUrl} from "../utils";

class ItemComponent extends React.Component {
  render() {
    return (
      <Card as={Link} to={this.props.to} className={'h-100'}>
        <Card.Img variant="top" src={getFileUrl(this.props.v.poster_path)}/>
        <Card.Body className={'text-center'}>
          <Card.Title>{'title' in this.props.v ? this.props.v.title : this.props.v.name}</Card.Title>
          {'first_air_date' in this.props.v && <div className={'text-muted'}>{this.props.v.first_air_date}</div>}
        </Card.Body>
      </Card>
    );
  }
}

export default ItemComponent;
