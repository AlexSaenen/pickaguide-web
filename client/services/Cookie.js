export default class Cookie {

  static get(key) {
    const cookieSplitPairs = Cookie.toList();
    const tokenPair = cookieSplitPairs.find(pair => pair.key === key);
    return (tokenPair ? tokenPair.value : null);
  }

  static set(key, value) {
    document.cookie = `${key}=${value}`;
  }

  static toList() {
    let cookiePairs = document.cookie.split(';');
    cookiePairs = cookiePairs.filter(pair => [' ', ''].indexOf(pair) === -1);
    return cookiePairs.map(pair => {
      const splitPair = pair.split('=');
      return { key: splitPair[0].trim(), value: splitPair[1].trim() };
    });
  }

  static revoke() {
    const cookieSplitPairs = Cookie.toList();
    const expirationCommand = `expires=${new Date(Date.now() - 1)}`;

    cookieSplitPairs.forEach((pair) => {
      document.cookie = `${pair.key}=''; ${expirationCommand}; path=/`;
    });
  }

  static isEmpty() {
    return document.cookie === '';
  }
}
