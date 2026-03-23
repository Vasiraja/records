import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication'
import { LocalStrategy } from '@feathersjs/authentication-local'
import type { Application } from './declarations'

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService
  }
}

class MyLocalStrategy extends LocalStrategy {

  async authenticate(data: any, params: any) {

    const result = await super.authenticate(data, params)
    const user = (result as any).user

    const app = this.authentication?.app
    const connection = params.connection

     if (connection && user?._id) {
      connection.user = user
      console.log('User attached to socket connection:', user._id)
    }

     if (user?._id && app) {

      const now = new Date()

      try {
        await app.service('users').patch(
          user._id,
          { lastAction: now.toISOString() },
          { provider: undefined }
        )
      } catch (err) {
        console.error('Failed to update lastAction', err)
      }

      try {
         await app.service('logs').create({
          userId: user._id,
          loginAt: now.toISOString(),
          ipAddress: params.ip,
          userAgent: params.headers?.['user-agent']
        })
      } catch (err) {
        console.error('Failed to store login log', err)
      }
    }

    return result
  }
}

export const authentication = (app: Application) => {

  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new MyLocalStrategy())

   app.use('authentication', authentication)

   app.service('authentication').hooks({})
} 