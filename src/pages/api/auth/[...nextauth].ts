import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth/next'
import DiscordProvider from 'next-auth/providers/discord'

const db = new PrismaClient

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {  
    async session({session}){
      return session
    },

   async signIn({profile}){
      console.log(profile);

      db.utilisateur.upsert({

        where: {
            discordId: profile.id,
            nama: profile.username,
            mail: profile.email,
            
        },
        create: {
          discordId: profile.id,
          nama: profile.username,
          mail: profile.email,
          role: "",
          
        },
        update: {
          discordId: profile.id,
          nama: profile.username,
          mail: profile.email,
          
        }
    }).then(() => {
        console.log("done");

        
        
    }).catch((err) => {
        console.error("Erreur", err)
        
    });

    return true;



    }
  }})
