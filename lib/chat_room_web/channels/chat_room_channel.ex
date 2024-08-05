defmodule ChatRoomWeb.ChatRoomChannel do
  @moduledoc false

  use LiveState.Channel, web_module: ChatRoomWeb
  alias Phoenix.PubSub

  @impl true
  def init("chat_room:" <> room, _params, _socket) do
    PubSub.subscribe(ChatRoom.PubSub, "chat_messages:#{room}")
    {:ok, %{messages: [], room: room}}
  end

  @impl true
  def handle_event("send_message", message, %{room: room} = state) do
    PubSub.broadcast!(ChatRoom.PubSub, "chat_messages:#{room}", message)
    {:noreply, state}
  end

  def handle_message(message, %{messages: messages} = state) do
    {:noreply, state |> Map.put(:messages, [message | messages])}
  end

end
