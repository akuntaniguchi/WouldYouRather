import React from "react";
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import PropTypes from "prop-types";

const PageNotFound = ({ history }) => (
  <Card>
    <CardHeader>Page Not Found</CardHeader>
    <CardBody>
      <Button color="primary" size="sm" onClick={ () => history.push("/") }>
        Home
      </Button>
    </CardBody>
  </Card>
)

PageNotFound.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
}

export default PageNotFound
