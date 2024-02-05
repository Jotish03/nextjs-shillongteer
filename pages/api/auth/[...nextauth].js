import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import { compare } from "bcrypt";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const client = await MongoClient.connect(
            "mongodb+srv://shillongdb:Shillong2024@nextjsteer.thgrjq8.mongodb.net/?retryWrites=true&w=majority"
          );

          const db = client.db("nextjsteer");
          const collection = db.collection("users");

          const user = await collection.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found");
          }

          const isValidPassword = await compare(
            credentials.password,
            user.password
          );

          if (!isValidPassword) {
            throw new Error("Invalid password");
          }

          await client.close();

          // Include the role property in the session object

          return {
            role: user.role,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Error during authentication:", error);
          throw new Error(error.message); // Throw the specific error message
        }
      },
    }),
  ],
});
