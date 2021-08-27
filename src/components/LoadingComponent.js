import React from 'react';
import {Spinner} from "react-bootstrap";

class LoadingComponent extends React.Component {
  render() {
    return (
      <div style={{height: 200}} className={'d-flex justify-content-center align-items-center'}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
}

export default LoadingComponent;
