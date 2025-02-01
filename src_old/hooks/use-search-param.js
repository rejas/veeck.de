import queryString from 'query-string';
import * as React from 'react';

export const useSearchParams = () => {
  const [searchParams, setSearch] = React.useState({});

  React.useEffect(() => {
    setSearch(document.location.search ? queryString.parse(document.location.search) : {});
  }, []);

  return searchParams;
};
