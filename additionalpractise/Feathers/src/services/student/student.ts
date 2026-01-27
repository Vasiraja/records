// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  studentDataValidator,
  studentPatchValidator,
  studentQueryValidator,
  studentResolver,
  studentExternalResolver,
  studentDataResolver,
  studentPatchResolver,
  studentQueryResolver
} from './student.schema'

import type { Application } from '../../declarations'
import { StudentService, getOptions } from './student.class'
import { studentPath, studentMethods } from './student.shared'

export * from './student.class'
export * from './student.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const student = (app: Application) => {
  // Register our service on the Feathers application
  app.use(studentPath, new StudentService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: studentMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(studentPath).hooks({
    around: {
      all: [
     
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(studentQueryValidator), schemaHooks.resolveQuery(studentQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(studentDataValidator), schemaHooks.resolveData(studentDataResolver)],
      patch: [schemaHooks.validateData(studentPatchValidator), schemaHooks.resolveData(studentPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [studentPath]: StudentService
  }
}
