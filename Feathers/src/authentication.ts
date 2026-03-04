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
    const user = (result as any).userdet

    if (user?._id) {
      const now = new Date();
 
       await this.app!.service('userdet').patch(
        user._id,
        { lastAction: now.toISOString() },
        { provider: undefined }
      )
 
       await this.app!.service('logs').create({
        userId: user._id,
        loginAt: now.toISOString(),
        ipAddress:params.ip,
        userAgent: params.headers?.['user-agent']
      })
    }

    return result
  }
}

export const authentication = (app: Application) => {
  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new MyLocalStrategy())

  app.use('authentication', authentication)
}