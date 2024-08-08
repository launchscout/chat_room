import { LitElement, html } from "lit";
import { connectElement } from 'phx-live-state';


export class ChatRoomElement extends LitElement {

  static properties = {
    url: {},
    room: {},
    messages: {
      type: Array,
      attribute: false
    }
  }

  connectedCallback() {
    super.connectedCallback();
    connectElement(this, {
      url: this.getAttribute('url'),
      topic: `chat_room:${this.getAttribute('room')}`,
      properties: ['messages'],
      events: {
        send: ['send_message']
      }
    })
  }
  
  get messageElement()  {
    return this.shadowRoot.querySelector('textarea[name="message"]');
  }

  render() {
    return html`
    <ul>
      ${this.messages?.map(({ author, message }) => html`<li>${author}: ${message}`)}
    </ul>
    <form @submit=${this.sendMessage}>
      <div>
        <label>Author</label>
        <input name="author" />
      </div>
      <div>
        <label>Message</label>
        <textarea name="message"></textarea>
      </div>
      <button>Send!</button>
    </form>
    `;
  }

  sendMessage(e) {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    e.preventDefault();
    this.messageElement.value = '';
    this.dispatchEvent(new CustomEvent('send_message', {detail: data}));
  }
}

window.customElements.define('chat-room', ChatRoomElement);