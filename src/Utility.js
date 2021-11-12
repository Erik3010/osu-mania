import { assetsBaseUrl } from "./env";
class Utility {
  static async fetchSongMap() {
    return fetch(`${assetsBaseUrl}songs/1.unforgiving/map.json`).then((res) =>
      res.json()
    );
  }
}

export default Utility;
