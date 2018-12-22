class ServerManager {

  //serverHostname = 'http://localhost:8080'
  //serverHostname = 'https://dmi3aleks_server.serveo.net'
  serverHostname = 'http://ec2-52-69-225-97.ap-northeast-1.compute.amazonaws.com:8080/RESTServer-1.0-SNAPSHOT'

  getServerHostname() {
      return this.serverHostname;
  }
}

export default ServerManager;
