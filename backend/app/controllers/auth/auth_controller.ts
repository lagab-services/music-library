import type {HttpContext} from '@adonisjs/core/http'
import User from "#models/user";
import {loginValidator, registerValidator} from "#validators/auth";
import AuthService from '#services/auth/auth_service';
import {inject} from '@adonisjs/core';
import {promisify} from 'node:util';
import {randomBytes} from 'node:crypto';
import mail from '@adonisjs/mail/services/main';
import {DateTime} from 'luxon';
import env from '#start/env';

@inject()
export default class AuthController {
  constructor(protected authService: AuthService) {
  }

  async login({request, response}: HttpContext) {
    const {email, password} = await request.validateUsing(loginValidator)

    const {token, user} = await this.authService.login(email, password)

    return response.ok({
      token: token,
      ...user.serialize(),
    })
  }

  async logout({auth, response}: HttpContext) {
    const user = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken.identifier
    if (!token) {
      return response.badRequest({message: 'Token not found'})
    }
    await User.accessTokens.delete(user, token)
    return response.ok({message: 'Logged out'})
  }

  async register({request, response}: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const user = await this.authService.register(payload)

    return response.created(user)
  }

  public async googleAuth({request, response}: HttpContext) {
    const {email, name} = request.only(['email', 'name'])

    let user = await User.findBy('email', email)

    if (!user) {
      user = new User()
      user.email = email
      user.fullName = name
      await this.authService.registerWithAuth(user)
    }
    const token = await User.accessTokens.create(user, ['*'], {
      expiresIn: env.get('JWT_EXPIRY'),
    })

    return response.json({user, token})
  }

  public async forgotPassword({request, response}: HttpContext) {
    const email = request.input('email')
    const user = await User.findBy('email', email)

    if (!user) {
      return response.badRequest({error: 'User not found'})
    }

    // Generate token
    const token = (await promisify(randomBytes)(32)).toString('hex')

    user.resetPasswordToken = token
    user.resetPasswordTokenExpires = DateTime.now().plus({hours: 1}) // 1 hour of validity
    await user.save()

    // Envoyer un email avec le lien de réinitialisation
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`
    await mail.use().send((message) => {
      message
        .to(user.email)
        .subject('Password Reset')
        .htmlView('emails/reset_password', {resetLink, name: user.fullName})
    })

    return response.ok({message: 'Reset link sent to your email.'})
  }

  public async resetPassword({request, response}: HttpContext) {
    const {password, token} = request.all()

    // Find user with valid token
    const user = await User.query()
      .where('resetPasswordToken', token)
      .where('resetPasswordTokenExpires', '>', DateTime.now().toString())
      .first()

    if (!user) {
      return response.badRequest({error: 'Token is invalid or has expired'})
    }

    //Update password of user
    user.password = password
    user.resetPasswordToken = null
    user.resetPasswordTokenExpires = null

    await user.save()

    return response.ok({message: 'Password successfully reset.'})
  }


}
