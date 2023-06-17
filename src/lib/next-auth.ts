import GoogleProvider from 'next-auth/providers/google'
import { nanoid } from 'nanoid'
import { env } from '@/env.mjs'
import { db } from "./db"
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { type DefaultSession, type AuthOptions, DefaultUser, getServerSession } from "next-auth"

interface UserType extends DefaultUser {
  id: string;
  username?: string | null;
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    id: string;
    username?: string | null;
    user: UserType;
  }

  interface User extends DefaultUser, UserType { }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string | null;
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt'
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
  ],
  pages: {
    'signIn': '/sign-in'
  },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = token.username;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        }
      });
      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      if (!dbUser.username) {
        await db.user.update({
          where: {
            id: dbUser.id
          },
          data: {
            username: nanoid(10)
          }
        })
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username
      }
    },
    redirect() {
      return '/'
    }
  }
}

export const getServerAuthSession = () => {
  return getServerSession();
}