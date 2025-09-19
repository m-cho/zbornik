import Fuse, { IFuseOptions } from 'fuse.js';
import { useCallback, useMemo, useState } from 'react';

const useFuzzySearch = <T>(data: T[], options: IFuseOptions<T>) => {
  const [query, setQuery] = useState('');

  const fuse = useMemo(() => new Fuse(data, options), [data, options]);

  const hits = useMemo(() => {
    if (!query) {
      return data; // Return all data if no query
    }
    return fuse.search(query).map(result => result.item);
  }, [fuse, query, data]);

  const handleSearchChange = useCallback((searchText: string) => {
    setQuery(searchText);
  }, []);

  return { hits, query, handleSearchChange };
};

export default useFuzzySearch;