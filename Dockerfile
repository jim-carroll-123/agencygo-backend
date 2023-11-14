# Stage 1: Build Dependencies
FROM --platform=linux/amd64 node:slim as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install Node.js dependencies
RUN npm ci

# Copy the rest of your application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Runtime Image
FROM --platform=linux/amd64 node:slim

# Set working directory
WORKDIR /app

# Copy only the built application and the runtime dependencies
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules/
COPY --from=builder /app/package*.json /app
RUN rm -rf /app/dist/scraper/temp && mkdir -p /app/dist/scraper/temp
RUN rm -rf /app/dist/scraper/uploads && mkdir -p /app/dist/scraper/uploads

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV DBCONN_STR=mongodb+srv://dev:E8bhHjIr5xmvPgRT@agencygodevcluster.q83fyoe.mongodb.net/build_od_532
ENV SECRET_KEY=secretKey
ENV LOG_FORMAT=dev
ENV LOG_DIR=../logs
ENV ORIGIN=*
ENV CREDENTIALS=true
ENV AWS_ACCESS_KEY_ID=AKIAVMBOR2DK5VLGS4HH
ENV AWS_SECRET_ACCESS_KEY=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
ENV BUCKET_PUBLIC=agencygo-public
ENV BUCKET_PRIVATE=agencygo-private
ENV AWS_REGION=us-east-2
ENV PROXY_API_KEY=fjnexovjf6grzc3rjgkvmswucslkrpapf6gqjevi
ENV PROXY_URL=https://proxy.webshare.io/api/v2/proxy/list/
ENV SENDGRID_API_KEY=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
ENV SENDER=admin@agencygo.ai
ENV URL=http://116.202.210.102:1212
ENV TWILIO_ACCOUNT_SID=ACe47ebf69a56ca0f08eff780d5aea290f
ENV TWILIO_API_KEY=SK0e27be68d7f13597ca02f6ed2af5fea0
ENV TWILIO_CHAT_SERVICE_SID=ISa065bca11a834edf9f6c683982733d3c
ENV TWILIO_NOTIFICATION_SERVICE_SID=IS8a1d23d9584f41c18639bb58c9f7e1cf
ENV TWILIO_SYNC_SERVICE_SID=ISb03e5014e4064cd59e1af17e53a7ca50
ENV TWILIO_PHONE_NUMBER=+18447315468
ENV TWILIO_SECRET_KEY=ZoPS4WKYi1dLPNxStrJLY6qZnOIYMRDl
ENV TWILIO_AUTH_TOKEN=47a84dff387e9317fceb5a38ebbd7b71
ENV PUPPETEER_SKIP_DOWNLOAD true
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV DBUS_SESSION_BUS_ADDRESS=autolaunch

RUN apt-get update && apt-get install -y gnupg wget
RUN wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -y google-chrome-stable --no-install-recommends
RUN rm -rf /var/lib/apt/lists/*

# Expose port
EXPOSE 3000

# Command to start your application
CMD ["npm", "start"]
