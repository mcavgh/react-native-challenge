import { useState, useMemo } from 'react';

export function useSearch<T>(data: T[], searchKeys: (keyof T)[]) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    
    return data.filter(item =>
      searchKeys.some(key => {
        const value = item[key];
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, searchKeys]);

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
  };
}