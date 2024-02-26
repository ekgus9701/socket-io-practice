const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must type name"],
    unique: true,
  },
  token: {
    type: String,
  },
  online: {
    //user가 온라인상태인지 확인
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
