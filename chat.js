import { html, render } from './node_modules/lit-html/lit-html.js'
import { renderLogin, renderWait } from './login.js'
import { renderMessages, receiveMessage } from './messages.js'

export class Chat {
  constructor() {
    this.messages = []
    this.notificationpermission = "?"
    window.e = function(id) { return document.getElementById(id) }

    Pikari.setStopListener(function() { 
      if(e("login").offsetParent == null) return
      alert("Wrong password!")
      location.reload()
      return true
    })

    Pikari.addUserListener((user, login) => this.handleUser(user, login))

    const self = this

    Pikari.addMessageListener(function(sender, msg) {
      if (msg === " <🏆> gimmesiziis!!") self.giveMessages(sender)
      else if (msg.startsWith(" <🏆> getmesiziis!!")) self.getMessages(msg)
      else receiveMessage(sender, msg)
    })

    render(renderLogin(), e("login"))
  }

  handleUser(user, login) {
    if (login) chat.notify(user + " joined"); else chat.notify(user + " left")    
    if (Pikari.users.size == 1) render(renderWait(), e("login")); else chat.renderPeoplelist()    
  }

  renderPeoplelist() {
    const h = html`
    <ul class="list">
    ${Array.from(Pikari.users.keys()).map((user) => html`<li>${user+" "+chat.formatTime(Pikari.users.get(user))}</li>`)}
    </ul>
    `
    render(h, e("people-list"))
  }
    
  render() {
    this.renderPeoplelist()
    render(renderMessages(), e("chat"))
  }

  giveMessages(client) {
    Pikari.sendMessage(" <🏆> getmesiziis!!"+JSON.stringify(this.messages), client)
    if (Pikari.users.size == 2) {
      e("login").style.display = "none"
      e("container").style.display = "flex"
      this.render()
    }
  }

  getMessages(msg) {
    this.messages = JSON.parse(msg.substring(19))
    e("login").style.display = "none"
    e("container").style.display = "flex"
    this.render()
  }

  notify(message) {
    if (chat.notificationpermission === "?") Notification.requestPermission().then(function(result){chat.notificationpermission = result})
    if (chat.notificationpermission === "denied") return
    const n = new Notification(message)
    setTimeout(n.close.bind(n), 4000)
  }

  formatTime(t) {
    const hr = t.getHours()
    let min = t.getMinutes()
    if (min < 10) min = "0" + min
    return hr+":"+min
  }
}