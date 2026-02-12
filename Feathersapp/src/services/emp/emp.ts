// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  employeesDataValidator,
  employeesPatchValidator,
  employeesQueryValidator,
  employeesResolver,
  employeesExternalResolver,
  employeesDataResolver,
  employeesPatchResolver,
  employeesQueryResolver
} from './emp.schema'

import type { Application } from '../../declarations'
import { EmployeesService, getOptions } from './emp.class'
import { employeesPath, employeesMethods } from './emp.shared'

export * from './emp.class'
export * from './emp.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const employees = (app: Application) => {
  // Register our service on the Feathers application
  app.use(employeesPath, new EmployeesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: employeesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(employeesPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(employeesExternalResolver),
        schemaHooks.resolveResult(employeesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(employeesQueryValidator),
        schemaHooks.resolveQuery(employeesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(employeesDataValidator),
        schemaHooks.resolveData(employeesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(employeesPatchValidator),
        schemaHooks.resolveData(employeesPatchResolver)
      ],
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
    [employeesPath]: EmployeesService
  }
}
