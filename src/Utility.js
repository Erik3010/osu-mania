class Utility {
  static async fetchSongMap() {
    return fetch("../assets/songs/1.unforgiving/map.json").then((res) =>
      res.json()
    );
  }
}

export default Utility;
