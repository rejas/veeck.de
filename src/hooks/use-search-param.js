import { useEffect, useState } from 'react';
import queryString from 'query-string';

export const useSearchParams = () => {
  const [searchParams, setSearch] = useState({});

  useEffect(() => {
    setSearch(
      document.location.search
        ? queryString.parse(document.location.search)
        : {}
    );
  }, []);

  return searchParams;
};
