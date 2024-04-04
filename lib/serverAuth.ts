import { NextApiRequest } from "next";
import prismadb from '@/lib/prismadb';
import { getSession } from "next-auth/react";

// Define a function for server-side authentication
const serverAuth = async (req: NextApiRequest) => {
  // Retrieve the session object using NextAuth
  const session = await getSession({ req });

  // Check if the user is not signed in
  if (!session?.user?.email) {
    // Throw an error if the user is not signed in
    throw new Error('Not signed in');
  }

  // Query the database to find the current user based on email
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    }
  });

  // Check if the current user exists
  if (!currentUser) {
    // Throw an error if the user is not found in the database
    throw new Error('Not signed in');
  }

  // Return the current user object if authentication is successful
  return { currentUser };
}

// Export the serverAuth function as the default export of this module
export default serverAuth;
