// Import necessary modules
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

// Define the Register function as an asynchronous function
const Register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Check if the request method is not POST, return 405 status code if true
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    // Extract email, name, and password from the request body
    const { email, name, password } = req.body;

    // Check if there is an existing user with the provided email
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    // If there is an existing user, return 422 status code with error message
    if (existingUser) {
      return res.status(422).json({ error: "Email taken" });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user in the database with provided email, name, hashed password, and other optional data
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "", // Optional: You may want to provide a default image or handle image uploads separately
        emailVerified: new Date(), // Optional: Set email verification date
      },
    });

    // Return 200 status code with the created user object
    return res.status(200).json(user);
  } catch (error) {
    // If an error occurs during the process, log the error and return 400 status code with error message
    console.log(error);
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
};

// Export the Register function as the default export
export default Register;
