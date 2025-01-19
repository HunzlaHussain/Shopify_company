import { getServerSession, User, type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SCRET,

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}users/api/login`,
            { email, password }
          );
          console.log("Login response:", response.data);

          // Extract data
          const { token, userWithoutPassword } = response.data;

          if (token && userWithoutPassword) {
            return {
              id: userWithoutPassword.id,
              name: userWithoutPassword.name,
              email: userWithoutPassword.email,
              token,
              business_id: 123, // Example: Set your actual value
              customer_id: 456, // Example: Set your actual value
              user_type: "admin", // Example: Set your actual value
            };
          }

          return null; // If the user data is invalid// Invalid user
        } catch (error: any) {
          console.error(
            "Error during login:",
            error.response?.data || error.message
          );
          throw new Error("Login failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in", //(4) custom signin page path
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
