import { LitElement, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { liveState, liveStateConfig, liveStateProperty } from 'phx-live-state';

@customElement('chat-room')
@liveState({
  events: {
    send: ['send_message']
  }
})
export class ChatRoomElement extends LitElement {

  @liveStateConfig('url')
  @property()
  url: string = '';

  @liveStateConfig('topic')
  @property({ converter: (value) => `chat_room:${value}`, attribute: 'room' })
  room: string = '';

  @liveStateProperty()
  @state()
  messages: Array<{ author: string, message: string }> = [];

  @query('textarea')
  messageElement: HTMLTextAreaElement;

  render() {
    return html`
    <ul>
      ${this.messages.map(({ author, message }) => html`<li>${author}: ${message}`)}
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

  sendMessage(e: SubmitEvent) {
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    e.preventDefault();
    this.messageElement.value = '';
    this.dispatchEvent(new CustomEvent('send_message', {detail: data}));
  }
}