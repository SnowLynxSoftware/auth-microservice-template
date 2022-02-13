FROM morpheuszer0/node:14.19.0-slim

ENV PORT=9110

WORKDIR /opt/apps/auth-service
COPY . .

RUN npm ci

# Remove the tests before we compile so we don't compile them also.
RUN rm -rf __tests__

RUN npm run build

# Remove these folders to further save image space
RUN rm -rf src \
    .idea \
    .git \
    coverage \
    .env \
    .env.example \
    .gitignore \
    Dockerfile \
    jest.config.js \
    LICENSE \
    README.md \
    tsconfig.json \
    tsconfig.tsbuildinfo

# Bundle app source
EXPOSE $PORT
