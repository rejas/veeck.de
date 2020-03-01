import * as React from 'react';
import queryString from 'query-string';

export const useSearchParams = () => {
  const [searchParams, setSearch] = React.useState({});

  React.useEffect(() => {
    setSearch(
      document.location.search
        ? queryString.parse(document.location.search)
        : {}
    );
  }, []);

  return searchParams;
};
