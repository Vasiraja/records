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

    // Run normal authentication
    const result = await super.authenticate(data, params)
    const user = (result as any).user

    const app = this.authentication?.app
    const connection = params.connection

    // Attach user to socket connection
    if (connection && user?._id) {
      connection.user = user
      console.log('User attached to socket connection:', user._id)
    }

    // Update activity + create login log
    if (user?._id && app) {

      const now = new Date()

      try {
        // update last action
        await app.service('users').patch(
          user._id,
          { lastAction: now.toISOString() },
          { provider: undefined }
        )
      } catch (err) {
        console.error('Failed to update lastAction', err)
      }

      try {
        // create login log
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

  // Register strategies
  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new MyLocalStrategy())

  // Register service
  app.use('authentication', authentication)

  // Required in Feathers v5
  app.service('authentication').hooks({})
} 