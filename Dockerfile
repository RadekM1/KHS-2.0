FROM node:18-alpine AS base
WORKDIR /app

RUN apk add --no-cache libc6-compat

FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules

COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs \
&& adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000 \
    HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
