import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth"; // Importing the serverAuth function for authentication

// Define the request handler function
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Check if the request method is not GET
    if (req.method !== "GET") {
      // If it's not a GET request, return a 405 Method Not Allowed status code
      return res.status(405).end();
    }

    // Authenticate the user using the serverAuth function
    const { currentUser } = await serverAuth(req);

    // If authentication is successful, return the current user as JSON
    return res.status(200).json(currentUser);
  } catch (error) {
    // If an error occurs during authentication or processing, log the error and return a 500 Internal Server Error status code
    console.log(error);
    return res.status(500).end();
  }
};

// Export the request handler function as the default export of this module
export default handler;
