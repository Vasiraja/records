// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import { feathers } from '@feathersjs/feathers'
import configuration from '@feathersjs/configuration'
import { koa, rest, bodyParser, errorHandler, parseAuthentication, cors, serveStatic } from '@feathersjs/koa'
import socketio from '@feathersjs/socketio'
import { configureSockets } from './socket-listen'
import { channels } from './channels';
import { configurationValidator } from './configuration'
import type { Application } from './declarations'
import { logError } from './hooks/log-error'
import { mongodb } from './mongodb'

import { authentication } from './authentication'
import { services } from './services/index'

import * as dotenv from 'dotenv';
import { messagesPath } from './services/messages/messages.shared'
dotenv.config();
const app: Application = koa(feathers())
// app.set('trust proxy', true as any)
// Load our app configuration (see config/ folder)
app.configure(configuration(configurationValidator))
// Set up Koa middleware
app.use(cors())
app.use(serveStatic(app.get('public')))
app.use(errorHandler())
app.use(parseAuthentication())
app.use(bodyParser())
// Configure services and transports
app.configure(rest())
app.configure(socketio({
  cors: {
    origin: "http://localhost:4200",
    credentials: true
  }
}))
configureSockets(app)

app.configure(mongodb)
app.configure(services)

app.configure(channels)
app.service(messagesPath).publish((data: any, context: any) => {

  // 👇 replace 'created' check here
  if (context.event !== 'created') return [];

  console.log("🔥 publish triggered");

  const senderId = data.senderId.toString();
  const receiverId = data.receiverId.toString();

  console.log("Connections:",
    app.channel(`msg/${senderId}`).connections.length,
    app.channel(`msg/${receiverId}`).connections.length
  );

  return [
    app.channel(`msg/${senderId}`),
    app.channel(`msg/${receiverId}`)
  ];
});

app.configure(authentication)

// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
})
// Register application setup and teardown hooks here
app.hooks({
  setup: [],
  teardown: []
})

export { app }
