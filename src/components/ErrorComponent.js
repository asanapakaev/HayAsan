import React from 'react';

class ErrorComponent extends React.Component {
  render() {
    return (
      <div style={{height: 200}} className={'d-flex justify-content-center align-items-center'}>
        <h1 className={'text-danger'}>{this.props.title || 'Ошибка'}</h1>
      </div>
    );
  }
}

export default ErrorComponent;
