export default <Data>(url: Request['url']): Promise<Data> =>
  fetch(`${API_URL}${url}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    });
