import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from "@/lib/prismadb";
import { compare } from 'bcrypt';

NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password", // Corrected to lowercase 'password'
        },
      },
      async authorize(credentials) { // Corrected argument name
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email, // Corrected accessing credentials.email
          },
        });
        if (!user || !user.hashedPassword) {
          throw new Error("Email does not exist");
        }
        const isCorrectPassword = await compare(
          credentials.password, // Corrected accessing credentials.password
          user.hashedPassword
        );
        if (!isCorrectPassword) {
          throw new Error("Incorrect password")
        }
        return user; // Returning user object if authentication is successful
      },
    }),
  ],
});

export default NextAuth;
