// Dans votre code d'authentification Discord
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Exemple : supposons que l'admin ait le rôle 'admin' sur Discord
const discordId = 'ID_DISCORD_UTILISATEUR';
const isAdmin = checkIfUserIsAdmin(discordId);

const user = await prisma.user.create({
  data: {
    discordId: discordId,
    role: isAdmin ? 'admin' : 'invité',
    // Autres informations à enregistrer
  },
});

// Assurez-vous de fermer la connexion Prisma lorsque vous avez terminé
await prisma.$disconnect();
