import { Hook,HookContext } from "@feathersjs/feathers";


const addLoginTimestamp = (): Hook => {
  return async (context: HookContext) => {
    const { user, app } = context.params;

    if (user) {
       await app.service('userdet').patch(user.id, {
        lastLogin: new Date(),
        lastAction: 'Logged in',
        comment: 'User logged in'
      });
    }

    return context;
  };
};

export default addLoginTimestamp;