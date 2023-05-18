import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: "UI8HUGHHaGU4QqIUvZeAVQfWTA9sphjRmjvdps6CZzE=",
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Custom",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials;
        const res = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });

        const user = await res.json();

        // const user = await res.json();

        // // If no error and we have user data, return it
        if (res.ok && user) {
          return { accessToken: user.access_token, username };
        }
        // // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return { ...session };
    },
  },
});

export { handler as GET, handler as POST };
