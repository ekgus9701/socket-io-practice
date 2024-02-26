const userController = require("../Controllers/user.controller");
const chatController = require("../Controllers/chat.controller");

module.exports = function (io) {
  //emit은 말하기
  //on은 듣기

  io.on("connection", async (socket) => {
    console.log("client is connected", socket.id);

    socket.on("login", async (userName, cb) => {
      //유저정보 저장
      try {
        const user = await userController.saveUser(userName, socket.id);
        const welcomeMessage = {
          chat: `${user.name} is joined to this room`,
          user: { id: null, name: "system" },
        };
        io.emit("message", welcomeMessage);
        cb({ ok: true, data: user });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("sendMessage", async (message, cb) => {
      try {
        //유저 찾기 socket id로
        const user = await userController.checkUser(socket.id);

        //메세지 저장
        const newMessage = await chatController.saveChat(message, user);
        io.emit("message", newMessage); //전체클라이언트에게 알려줘야함
        cb({ ok: true });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("disconnect", () => {
      console.log("user is disconnected");
    });
  });
};
