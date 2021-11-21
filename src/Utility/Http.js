class Http {
  static async fetch(url) {
    return fetch(url).then((res) => res.json());
  }
}

export default Http;
