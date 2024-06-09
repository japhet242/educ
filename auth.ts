import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "./auth.config"
import prisma from "./lib/db"
import NextAuth, { type DefaultSession } from "next-auth"
   

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      role: "ADMIN" |"INSTRUCTOR" | "STUDENT",
      plan:"FREE" | "PREMIUM"
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"]
  }
}
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  pages:{
      error:"/error",
      signIn:"/auth/login"
  },
  events:{
    linkAccount:async (message)=>{
        await prisma.user.update({
          where:{id:message.user.id},
          data:{
            emailVerified:new Date()
          }
        })
    }
  },
  callbacks: {
    async signIn({user,account}) {
      if (account?.provider!=="credentials") {
        return true
      }
      const userverif = await prisma.user.findFirst({
        where:{id:user.id}
      })
      if(userverif && userverif.emailVerified) return true
      
      return false
    },
    async jwt({ token }) {
      if(!token.sub) return token
      const user = await prisma.user.findFirst({
        where:{id:token.sub}
      })
      if (!user || !user.role || !user.plan) {
        return token
      }
      token.role = user.role
      token.plan=user.plan
      return token
    },
   async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      if (session.user && token.role) {
        session.user.role= token.role  as "ADMIN" |"INSTRUCTOR" | "STUDENT"
      }
      if (session.user && token.role) {
        session.user.plan= token.plan  as "FREE" | "PREMIUM"
      }
      
      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})