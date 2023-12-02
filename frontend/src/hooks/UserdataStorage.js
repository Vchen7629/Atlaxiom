import { useState, useEffect } from 'react';

const DataStorage = (initialData) => {
  const storedData = localStorage.getItem('userData');
  let initialParsedData 
  try {
    initialParsedData = storedData ? JSON.parse(storedData) : initialData;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    initialParsedData = initialData;
  }

  const [persistedData, setPersistedData] = useState(initialParsedData);

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(persistedData));
  }, [persistedData]);

  console.log('Local Storage:', localStorage.getItem('userData'));

  return [persistedData, setPersistedData];
};

export default DataStorage;