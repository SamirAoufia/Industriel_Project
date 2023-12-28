// server.js (ou autre fichier pour votre serveur)
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();



  try {
    await prisma.tag.update({
      where: {
        id: tagId,
      },
      data: {
        enabled: tur,
      },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating tag:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }




