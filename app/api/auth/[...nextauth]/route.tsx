import NextAuth from "next-auth";
import { authOptions } from "@/lib/session";
import nextAuth from "next-auth";

const handler = NextAuth(authOptions)
export { handler as GET , handler as POST};