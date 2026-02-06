// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import { feathers, ServiceMethods } from '@feathersjs/feathers'
import express, {
  rest,
  json,
  urlencoded,
  cors,
  serveStatic,
  notFound,
  errorHandler
} from '@feathersjs/express'
import configuration from '@feathersjs/configuration'
import socketio from '@feathersjs/socketio'

import type { Application } from './declarations'
import { configurationValidator } from './configuration'
import { logger } from './logger'
import { logError } from './hooks/log-error'
import { mongodb } from './mongodb'
import { services } from './services/index'
import { channels } from './channels'

export const app: Application = express(feathers())

 app.configure(configuration(configurationValidator))
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
// Host the public folder
app.use('/', serveStatic(app.get('public')))

 app.configure(rest())
app.configure(
  socketio({
    cors: {
      origin: app.get('origins')
    }
  })
)
app.configure(mongodb)
app.configure(services)
app.configure(channels)

// Configure a middleware for 404s and the error handler
app.use(notFound())
app.use(errorHandler({ logger }))

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

// app.use('hello', {
//   async find() {
//     return { message: 'First Feathers' }
//   }
// })
 

app.use('hello', {
  async find() {
    return { message: 'First Feathers' }
  }
} as any)

const helloService: Partial<ServiceMethods<any>> = {
  async find() {
    return { message: 'First Feathers' }
  }
}

app.use('/fix', helloService as any);

 


  