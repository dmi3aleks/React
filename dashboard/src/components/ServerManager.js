class ServerManager {

  //serverHostname = 'http://localhost:8080'
  serverHostname = 'http://ec2-52-69-225-97.ap-northeast-1.compute.amazonaws.com:8080/RESTServer-1.0-SNAPSHOT'

  getServerHostname() {
      return this.serverHostname;
  }
}

export default ServerManager;
