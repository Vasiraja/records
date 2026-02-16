// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Employees, EmployeesData, EmployeesPatch, EmployeesQuery, EmployeesService } from './emp.class'

export type { Employees, EmployeesData, EmployeesPatch, EmployeesQuery }

export type EmployeesClientService = Pick<
  EmployeesService<Params<EmployeesQuery>>,
  (typeof employeesMethods)[number]
>

export const employeesPath = 'emp'

export const employeesMethods: Array<keyof EmployeesService> = ['find', 'get', 'create', 'patch', 'remove']

export const employeesClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(employeesPath, connection.service(employeesPath), {
    methods: employeesMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [employeesPath]: EmployeesClientService
  }
}
 