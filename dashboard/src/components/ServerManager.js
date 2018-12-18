class ServerManager {

  serverHostname = 'http://localhost:8080'
  //serverHostname = 'https://dmi3aleks_server.serveo.net'

  getServerHostname() {
      return this.serverHostname;
  }
}

export default ServerManager;
