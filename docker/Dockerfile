FROM node:16-alpine3.16

# Copy livekit-backend
COPY . /opt/livekit-backend

# Install livekit-backend dependencies
RUN npm --prefix /opt/livekit-backend install

WORKDIR /opt/livekit-backend

ENTRYPOINT [ "node", "index.js" ]