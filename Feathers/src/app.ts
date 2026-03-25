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
 dotenv.config();
const app: Application = koa(feathers())

app.configure(configuration(configurationValidator))

app.use(cors())
app.use(serveStatic(app.get('public')))
app.use(errorHandler())
app.use(parseAuthentication())
app.use(bodyParser())

app.configure(rest())
app.configure(socketio({
  cors: {
    origin: "http://localhost:4200",
    credentials: true
  }
}))
 
app.configure(mongodb)
app.configure(services)
app.configure(authentication) 
app.configure(channels)
configureSockets(app) 


app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
})
app.hooks({
  setup: [],
  teardown: []
})

export { app }
