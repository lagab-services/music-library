import {SpotifySerice} from "#services/spotify_service";
import {PlatformServiceInterface} from "#interfaces/playlist/platform.interface";

export default class PlatformSerice {


  public static getService(platform: string): PlatformServiceInterface {
    switch (platform) {
      case 'spotify':
        return new SpotifySerice();
      default:
        throw new Error(`Platform ${platform} is not supported`);
    }
  }

}
