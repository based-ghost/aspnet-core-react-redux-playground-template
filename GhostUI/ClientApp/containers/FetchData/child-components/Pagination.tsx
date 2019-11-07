import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PaginationProps = {
  readonly startDateIndex?: number;
};

const Pagination = React.memo<PaginationProps>(({ startDateIndex }) => (
  <p className="buttons is-pagination-group">
    <Link className="button is-info" to={`/fetchdata/${(startDateIndex || 0) - 5}`}>
      <FontAwesomeIcon icon="chevron-left" />
      Previous
    </Link>
    <Link className="button is-info" to={`/fetchdata/${(startDateIndex || 0) + 5}`}>
      Next
      <FontAwesomeIcon icon="chevron-right" />
    </Link>
  </p>
));

Pagination.displayName = 'Pagination';

export default Pagination;