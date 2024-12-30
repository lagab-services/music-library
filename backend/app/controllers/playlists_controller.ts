import PlatformSerice from "#services/platform_service";
import type {HttpContext} from "@adonisjs/core/http";

export default class PlaylistsController {
  public async redirectToAuth({params, response}: HttpContext) {
    const service = PlatformSerice.getService(params.platformName);
    const authUrl = service.getAuthUrl();
    response.redirect(authUrl);
  }

  public async handleAuthCallback({params, request}: HttpContext) {
    const service = PlatformSerice.getService(params.platformName);
    const code = request.input('code');
    const {accessToken} = await service.getAccessToken(code);

    // Sauvegardez le token dans la DB pour l'utilisateur connecté
    return {platform: params.platformName, accessToken};
  }

  public async getAccessToken({params, request, response}: HttpContext) {
    const service = PlatformSerice.getService(params.platformName);
    const code = request.qs().code;
    const {accessToken} = await service.getAccessToken(code);
    return accessToken;
  }

  public async getPlaylists({params, response}: HttpContext) {
    const service = PlatformSerice.getService(params.platformName);
    console.log(service.getAuthUrl())
    const accessToken = 'BQAvgyeJh7F9KXUgMwhMOwMFAGyjPQgBnMbBA0zMhPGuNjnTTEyzJOhb3SMLeb5-n8qGgY1X43xSxFjUXLQZ43oJAGZ4uKG-8CO9bhl2tnwFVTPASVCwCdq6DSfvQZzdTs299yoNhQhcNvBe8e612PYJHhldSpgbPo0NzpTHFYqnWrBbIdm5uu1t92DfNiPoqMiVoTTHtUlT8Dnah5xR0dq313w';
    const playlists = await service.getPlaylists(accessToken);
    return response.json(playlists);
  }
}
