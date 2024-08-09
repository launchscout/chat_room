# ChatRoom

This is the repo for the code for [Building an Elixir powered WordPress plugin with LiveState](https://launchscout.com/blog)

The back end is a normal Phoenix app with a LiveState channgel. Per usual:

  * Run `mix setup` to install and setup dependencies
  * Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`

Now you can visit [`localhost:4000/chat_room`](http://localhost:4000/chat_room) to see the custom `<chat-room>` element in action outside of WordPress. If you hit it from two browsers, you can chat back and forth. Exciting!

## Building the WP block plugin

The source for the WordPress block plugin is in the `chat-room-plugin` directory. To build the plugin, run `build_plugin.sh`. This should give you a `chat-room-plugin.zip` file. In WP admin, you can go to plugins and upload this zip file. After that, you should see the Chat Room block appear as an option when you are in the Editor and add a block.
