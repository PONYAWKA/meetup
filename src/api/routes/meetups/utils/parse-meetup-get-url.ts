export const parseMeetupGetUrl = (url: string) => {
  const parsedUrl = new URL(url);

  const theme = parsedUrl.searchParams.get("theme") || "";
  const sortField = parsedUrl.searchParams.get("sort") || "id";
  const place = parsedUrl.searchParams.get("place") || "";
  const offset = parseInt(parsedUrl.searchParams.get("offset") || "0");
  const limit = parseInt(parsedUrl.searchParams.get("limit") || "10");
  return {
    filters: [
      theme ? `%${theme}%` : "",
      place ? `%${place}%` : "",
      offset,
      limit,
    ],
    sortField,
  };
};
