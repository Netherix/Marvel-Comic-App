import md5 from "md5";

const fetchComics = async (characterId, currentPage, comicsPerPage) => {
  const publicKey = import.meta.env.VITE_PUBLIC_KEY;
  const privateKey = import.meta.env.VITE_PRIVATE_KEY;
  const timestamp = Date.now();
  const hash = md5(timestamp + privateKey + publicKey);
  const offset = (currentPage - 1) * comicsPerPage;
  const url = `http://gateway.marvel.com/v1/public/comics?characters=${characterId}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=${comicsPerPage}&offset=${offset}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();
    return { comics: data.data.results, totalComics: data.data.total, error: null };
  } catch (error) {
    console.error("Error fetching comics:", error);
    return { comics: [], totalComics: 0, error: "Failed to fetch comics. Please try again later." };
  }
};

export default fetchComics;
