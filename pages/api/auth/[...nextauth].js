import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: '976064291632-89urvb6qr8dq5ef2g0nerpaj6u6ggso8.apps.googleusercontent.com', //DO NOT COMMIT
      clientSecret: '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', //DO NOT COMMIT
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.username = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();

      session.user.uid = token.sub;
      return session;
    }
  }
});