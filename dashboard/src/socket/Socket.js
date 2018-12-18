const Config = {
  PROTOCOL: "ws:",
  HOST: "//localhost",
  PORT: ":7888"
}

const Socket = (function() {

  let instance;

  function createInstance() {
    const address = Config.PROTOCOL + Config.HOST + Config.PORT
    const socket = new WebSocket(address)
    console.log("Created a Socket instance at: " + address)
    return socket;
  }

  return {
    getInstance: function() {
      if(!instance) {
        instance = createInstance()
      }
      return instance
    }
  }


})();

export default Socket;
