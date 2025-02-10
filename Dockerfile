# Stage 1: Build the Next.js app
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./
# Install dependencies (use npm or yarn as per your project setup)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Run the built application in production
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy required files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]
