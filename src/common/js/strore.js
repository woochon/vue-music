export default {
  setLocal (name, content) {
    let cont = content
    if (!name) return
    if (typeof cont !== 'string') {
      cont = JSON.stringify(cont)
    }
    window.localStorage.setItem(name, cont)
  },
  getLocal (name) {
    if (!name) return null
    return window.localStorage.getItem(name)
  },
  removeLocal (name) {
    if (!name) return
    window.localStorage.removeItem(name)
  },
  addCookie (name, value, days) {
    const expires = new Date()
    expires.setTime(expires.getTime() + (days * 3600000 * 24))
    const Myexpires = (typeof days) === 'string' ? '' : `;expires=${expires.toUTCString()}`
    document.cookie = `${name}=${escape(value)}${Myexpires};path=/`
  },
  getCookie (name) {
    let arr = []
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (document.cookie.match(reg)) {
      arr = document.cookie.match(reg)
      return unescape(arr[2])
    } else {
      return null
    }
  },
  deleteCookie (name) {
    const exp = new Date()
    exp.setTime(exp.getTime() - 36000)
    const cval = this.getCookie(name)
    if (cval !== null) {
      document.cookie = `${name}=${cval};expires=${exp.toGMTString()};path=/`
    }
  }
}
