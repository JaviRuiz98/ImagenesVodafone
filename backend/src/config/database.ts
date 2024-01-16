import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';

const db = new PrismaClient();


export {db, Prisma};
