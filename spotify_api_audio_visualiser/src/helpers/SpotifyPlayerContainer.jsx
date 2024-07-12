class SpotifyPlayerContainer extends Component {
  constructor(props) {
    super(props)
    new ScriptCache([
      {
        name:"https://sdk.sdk.scdn.co/spotify-player.js",
        callback: this.spotifySDKCallback
      }
    ])
  }
}