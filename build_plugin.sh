#!/bin/sh
cd chat-room-plugin
npm i
npm run build
cd ..
zip -r chat-room-plugin.zip chat-room-plugin -x chat-room-plugin/node_modules/\*