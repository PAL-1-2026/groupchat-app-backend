# ===============================
# 1️⃣ Base
# ===============================
FROM oven/bun:1.3.1 AS base
WORKDIR /app

# ===============================
# 2️⃣ Install deps
# ===============================
FROM base AS deps
COPY package.json bun.lockb* ./
RUN bun install

# ===============================
# 3️⃣ Builder
# ===============================
FROM deps AS builder

# Dummy DB only for prisma generate
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

COPY . .
RUN bun --bun run prisma generate

# ===============================
# 4️⃣ Runner
# ===============================
FROM oven/bun:1.3.1 AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy entire built app
COPY --from=builder /app ./

EXPOSE 8080

CMD ["bun", "server.ts"]