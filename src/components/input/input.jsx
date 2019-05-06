import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './input.css';

const Input = ({ onChange, value, onKeyUp }) => (
  <Row>
    <Col>
      <input
        className="inp"
        placeholder="Click to search"
        onChange={onChange}
        onKeyUp={onKeyUp}
        value={value}
      />
    </Col>
  </Row>
);


export default Input;
