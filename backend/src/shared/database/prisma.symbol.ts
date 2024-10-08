import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { prismaClient } from '.';


container.register<PrismaClient>('PrismaClient', {
  useValue: prismaClient,
});