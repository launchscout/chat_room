defmodule ChatRoomWeb.PageController do
  use ChatRoomWeb, :controller

  def home(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    render(conn, :home, layout: false)
  end

  def chat_room(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    render(conn, :chat_room, layout: false)
  end

end
