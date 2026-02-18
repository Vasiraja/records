// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  userdetDataValidator,
  userdetPatchValidator,
  userdetQueryValidator,
  userdetResolver,
  userdetExternalResolver,
  userdetDataResolver,
  userdetPatchResolver,
  userdetQueryResolver
} from './userdet.schema'
// import userdetHook from './userdet.hook'

import type { Application } from '../../declarations'
import { UserdetService, getOptions } from './userdet.class'
import { userdetPath, userdetMethods } from './userdet.shared'

export * from './userdet.class'
export * from './userdet.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const userdet = (app: Application) => {

  // Register our service on the Feathers application
  app.use(userdetPath, new UserdetService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: userdetMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(userdetPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(userdetExternalResolver), schemaHooks.resolveResult(userdetResolver)],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },
    before: {
      all: [schemaHooks.validateQuery(userdetQueryValidator), schemaHooks.resolveQuery(userdetQueryResolver),


      async (context) => {

        console.log("Service", context.service);
        console.log("Method", context.method);
        console.log("App", context.app);
        console.log("Type", context.type);
        console.log("Status Code", context.statusCode);
        console.log("ID", context.id);
        console.log("Context Error", context.error);
        console.log("Result", context.result);



        return context;
      }


      ],
      find: [],
      get: [],
      create: [schemaHooks.validateData(userdetDataValidator), schemaHooks.resolveData(userdetDataResolver),
      async (context) => {
        console.log(' Incoming Data:', context.data);
        console.log('Status before setting:', context.statusCode);

        context.statusCode = 201;

        console.log('Status after setting:', context.statusCode); return context;
      }
      ],
      patch: [schemaHooks.validateData(userdetPatchValidator), schemaHooks.resolveData(userdetPatchResolver)],
      remove: []
    },
    after: {
      all: [async (context) => {
        const result = context.result as any;

        //    if (result?.age) {
        //   throw new Error('No need for age!');
        // } 

        console.log("Service", context.service);
        console.log("Method", context.method);
        console.log("App", context.app);
        console.log("Type", context.type);
        console.log("Status Code", context.statusCode);
        console.log("ID", context.id);
        console.log("Context Error", context.error);
        console.log("Result", context.result);
        console.log("Data", context.data)
        console.log("Params", context.params)



        return context;
      }]
    },
    error: {
      // all: [  async (context) => {
      // console.log(' ERROR CAUGHT');
      // console.log(context.error);
      // console.log(context.error.message);
      // return context;
      // }]
    }
  })

}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [userdetPath]: UserdetService
  }
}
