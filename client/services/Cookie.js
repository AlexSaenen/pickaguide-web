export default class Cookie {

  static get(key) {
    const cookiePairs = document.cookie.split(';');
    const cookieSplitPairs = cookiePairs.map(pair => {
      const splitPair = pair.split('=');
      return { key: splitPair[0], value: splitPair[1] };
    });

    const tokenPair = cookieSplitPairs.find(pair => pair.key === key);
    return (tokenPair ? tokenPair.value : null);
  }

  static override(cookieEntries) {
    document.cookie = cookieEntries
      .map(entry => `${entry.key}=${entry.value}`)
      .join(';');
  }

  static revoke() {
    document.cookie = '';
  }
}
