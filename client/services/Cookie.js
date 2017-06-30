export default class Cookie {

  static get(key) {
    const cookieSplitPairs = Cookie.toList();
    const tokenPair = cookieSplitPairs.find(pair => pair.key === key);
    return (tokenPair ? tokenPair.value : null);
  }

  static set(key, value) {
    if (Cookie.get(key)) {
      Cookie.revoke(key);
    }

    document.cookie = `${key}=${value};`;
  }

  static toList() {
    let cookiePairs = document.cookie.split(';');
    cookiePairs = cookiePairs.filter(pair => [' ', ''].indexOf(pair) === -1);
    return cookiePairs.map(pair => {
      const splitPair = pair.split('=');
      return { key: splitPair[0].trim(), value: splitPair[1].trim() };
    });
  }

  static revoke(key) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }

  static revokeAll() {
    Cookie.toList().forEach(pair => Cookie.revoke(pair.key));
  }

  static isEmpty() {
    return document.cookie === '';
  }
}
