/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import {middleware} from "#start/kernel";
import AuthController from '#controllers/auth/auth_controller';

router.group(() => {
  router.group(() => {
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])
    router.post('/google', [AuthController, 'googleAuth'])
    router.post('/forgot-password', [AuthController, 'forgotPassword'])
    router.post('/reset-password', [AuthController, 'resetPassword'])
    router.post('/logout', [AuthController, 'logout']).use(middleware.auth())
  }).prefix('auth')
  router.get('/me', async ({auth, response}) => {
    try {
      const user = auth.getUserOrFail()
      return response.ok(user)
    } catch (error) {
      return response.unauthorized({error: 'User not found'})
    }
  }).use(middleware.auth())
}).prefix('/api/v1')
