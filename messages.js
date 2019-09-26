import { html, render } from './node_modules/lit-html/lit-html.js'

export function renderMessages() {
  return html`
      <div class="chat-message">
        <textarea name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3"></textarea>                     
        <button @click=${sendMessage}>Send</button>
      </div>

      <div id="chat-history" class="chat-history">
        <ul>
          ${chat.messages.map(message => {
          const messageclass = message.data.startsWith(Pikari.user+" ") ? "my-message" : "other-message"
          return html`
          <li>
            <div class="message ${messageclass}">
              <div class="message-data">${message.data}</div>
              <pre>${message.text}</pre>
            </div>
          </li>`
          })}
        </ul>  
      </div>

      <div class="chat-header">
        <div class="chat-num-messages">${chat.messages.length + " messages"}</div>
      </div>
      
  `
}

export function receiveMessage(sender, msg) {
  if (sender !== Pikari.user) chat.notify("New message from " + sender)
  if (msg.length > 100000) msg = msg.substring(0, 100000)
  if (chat.messages.length > 1000) chat.messages.pop()
  chat.messages.unshift({"text": msg, "data": sender + " " + chat.formatTime(new Date())})
  render(renderMessages(), e("chat"))
  e("chat-history").scrollTop = 0
}

function sendMessage() {
  const msg = e("message-to-send").value
  if (msg.length > 100000) msg = msg.substring(0, 100000)
  Pikari.sendMessage(msg)
  e("message-to-send").value = ""
}