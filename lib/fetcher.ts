import axios from 'axios'; // Importing the Axios library for making HTTP requests

// Define a function called fetcher which takes a URL string as a parameter
const fetcher = (url: string) => 
  // Make a GET request to the specified URL using Axios
  axios.get(url)
    // Once the request is complete, extract the data from the response
    .then(res => res.data);

// Export the fetcher function as the default export of this module
export default fetcher;
