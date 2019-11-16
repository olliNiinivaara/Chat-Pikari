import { html, render } from './node_modules/lit-html/lit-html.js'

export function renderLogin() {
  return html`
  <p style="color: cadetblue; font-size: x-large">Pikari - Chat</p>
  <input id="name" type="text" placeholder="Username">
  <input id="password" type="password" @keyup=${doLogin} placeholder="Password">
  <button @click=${doLogin}>Login</button>
  `
}

export function renderWait() {
  e("login").style.display = "block"
  e("container").style.display = "none"  
  return html`
  <p style="color: cadetblue; font-size: x-large">Pikari - Chat</p>
  <p style="color: cadetblue;">waiting for someone to join...</p>
  `
}

const doLogin = {
  handleEvent(event) {
    if (event.type == "keyup" && event.keyCode != 13) return 
    if (!e("name").value) return
    Pikari.addChangeListener(function () { // triggered only once - at start
      if (Pikari.users.size == 1) return render(renderWait(), e("login"))
      const i = Math.floor(Math.random() * (Pikari.users.size - 1)) // this user is at last key (leave out - cannot be server)
      const server = Array.from(Pikari.users.keys())[i]
      Pikari.sendMessage(" <🏆> gimmesiziis!!", server)
    })
    Pikari.start(e("name").value, e("password").value) 
  }  
}