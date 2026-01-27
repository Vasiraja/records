import { stocks } from './stock/stock'
import { techproducts } from './tech/tech'
import { student } from './student/student'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(stocks)
  app.configure(techproducts)
  app.configure(student)
  // All services will be registered here
}
