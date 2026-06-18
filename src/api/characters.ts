import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export const getCharacters = async (name: string) => {
  if (!name || name.length < 3) return [];
  
  await new Promise((resolve) => setTimeout(resolve, 1200));
  
  const { data } = await api.get(`/character/?name=${name}`);
  return data.results;
};