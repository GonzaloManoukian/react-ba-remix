export const getRandomCatImage = async () => {
  const response = await fetch("https://api.thecatapi.com/v1/images/search", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  const image: string = data[0].url;
  return image;
};
