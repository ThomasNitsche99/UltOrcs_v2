FROM node:16

WORKDIR /app

COPY package.json package-lock.json  ./

RUN npm ci

COPY . .

RUN npx prisma db push 
RUN npx prisma migrate 
RUN npm run build && npm prune --production

ENV PORT 5050

EXPOSE 5050

CMD ["node", "build"]
