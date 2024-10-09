#!/bin/sh

sleep 15

npx prisma migrate dev --name init

npm run dev