// Archivo temporal

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear nuevos usuarios
  await prisma.user.createMany({
    data: [
      { email: 'user1@example.com', name: 'User 1' },
      { email: 'user2@example.com', name: 'User 2' },
      { email: 'user3@example.com', name: 'User 3' },
    ],
    skipDuplicates: true,
  });

  // Crear publicaciones
  await prisma.post.createMany({
    data: [
      {
        title: 'Primer Post',
        content: 'Este es el contenido del primer post.',
        published: true,
        authorId: 1,
      },
      {
        title: 'Segundo post',
        content: 'Este es el contenido del segundo post.',
        published: true,
        authorId: 2,
      },
      {
        title: 'Tercer post',
        content: 'Este es el contenido del tercer post.',
        published: true,
        authorId: 3,
      },
    ],
  });
  console.log('Base de datos poblada con exito');
}

main()
.catch((e) => {
    console.error(e);
    process.exit(1);
})
.finally(() => {
    prisma.$disconnect();
});