import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = ((credentials?.email as string) ?? "").trim().toLowerCase();
        const password = (credentials?.password as string) ?? "";
        if (!email || !password) return null;
        if (email !== (process.env.ADMIN_EMAIL ?? "").toLowerCase()) return null;
        const hash = process.env.ADMIN_PASSWORD_HASH;
        if (!hash) return null;
        const valid = await bcrypt.compare(password, hash);
        if (!valid) return null;
        return { id: "admin", email, name: "Admin" };
      },
    }),
  ],
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt" },
});
