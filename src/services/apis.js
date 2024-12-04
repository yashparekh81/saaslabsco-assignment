const URL =
  "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";

export const fetchProjects = () => {
  return fetch(URL)
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.error("Error fetching data:", error));
};
