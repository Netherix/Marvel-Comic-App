import md5 from "md5";

const publicKey = import.meta.env.VITE_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_PRIVATE_KEY;

const generateAuthParams = () => {
  const timestamp = Date.now();
  const hash = md5(timestamp + privateKey + publicKey);
  console.log(hash)
  return { ts: timestamp, apikey: publicKey, hash };
};

export const fetchCharacters = async (searchTerm, currentPage, charactersPerPage ) => {
  const { ts, apikey, hash } = generateAuthParams();
  const offset = (currentPage - 1) * charactersPerPage;
  const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${apikey}&hash=${hash}&limit=${charactersPerPage}&offset=${offset}&nameStartsWith=${searchTerm}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    console.log(data);
    return { characters: data.data.results, totalCharacters: data.data.total, error: null };
  } catch (error) {
    console.error("Error fetching Marvel characters:", error);
    throw error;
  }
};

export const fetchRandomCharacter = async () => {
  const { ts, apikey, hash } = generateAuthParams();
  const totalCharacters = 1564;
  const randomOffset = Math.floor(Math.random() * totalCharacters);
  const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${apikey}&hash=${hash}&limit=1&offset=${randomOffset}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    return data.data.results[0];
  } catch (error) {
    console.error("Error fetching random Marvel character:", error);
    throw error;
  }
};
