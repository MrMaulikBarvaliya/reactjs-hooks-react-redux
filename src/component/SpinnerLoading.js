import React from "react";
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SpinnerLoading = () => {
  return (
    <div>
      <Spinner animation="grow" variant="success" />
    </div>
  );
};

export default SpinnerLoading;
