import User from '#models/user';
import env from '#start/env';
import {RegisterRequest} from '#interfaces/auth/register.interface';

export default class AuthService {
  async register(payload: RegisterRequest) {
    //await ActivationService.sendActivationEmail(user, env.get('BASE_URL'))
    return await User.create(payload)
  }
  async registerWithAuth(user: User) {
    //await ActivationService.sendActivationEmail(user, env.get('BASE_URL'))
    return await User.create(user)
  }

  async login(email: string, password: string) {
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user, ['*'], {
      expiresIn: env.get('JWT_EXPIRY'),
    })

    return { token, user }
  }
}

