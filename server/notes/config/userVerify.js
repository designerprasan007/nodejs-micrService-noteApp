const jwt = require("jsonwebtoken");
const jwtToken = "IMCODEBUG";
const axios = require("axios");

const amqp = require("amqplib");
var channel, connection;

// importing redis from the redis
const redis = require("redis");
// Redis port
const REDIS_PORT = 6379;

// creating the connection to the redis
const client = redis.createClient({ socket: { port: REDIS_PORT } });

connect();
async function connect() {
  try {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("rabbit");
  } catch (err) {
    console.log(err);
  }
}

exports.getUserData = async (req, res, next) => {
  // getting JWT token from the headers, the token is appended to headers in the name of noteService
  let token = req.headers.noteservice;
  // if token is empty sending the response of 401 un Auth
  if (!token) return res.status(401).json({ success: false, err: "Forbidden" });
  try {
    // creating connection to the redis
    await client.connect();
    // verifying the jwt token and fetching the assigned data to the token
    const decoded = jwt.verify(token, jwtToken);
    // if assigned data is not empty getting the data of user
    if (decoded) {
      // getting the cached data from the redis, if data found returning it back to the cacheData variable
      let cacheData = await client.get(decoded.id, (err, data) => {
        if (err) return res.status(500).json({ success: false, err: err });
        if (data !== null) {
          return data;
        }
      });
      /*
        if data if fetching from the redis cache, adding it to the req.user and calling the controller function with next()
        if cacheData is empty then making a request to the user server and adding it to the cache
        after every redis call, making it disconnect so when we call again it should connect newly
      */
      if (cacheData) {
        req.user = JSON.parse(cacheData)._id;
        console.log("cached data,============================");
        await client.disconnect();
        next();
      } else {
        console.log("getting new response ....");
        const isUser = await axios.get(
          `http://localhost:5001/users/oneUser/${decoded.id}`
        );
        if (!isUser)
          return res.status(401).json({ success: false, err: "Forbidden" });
        await client.setEx(decoded.id, 3600, JSON.stringify(isUser.data.user));
        await channel.sendToQueue(
          "rabbit",
          Buffer.from(JSON.stringify(isUser.data.user))
        );
        req.user = decoded.id;
        await client.disconnect();
        next();
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, err });
  }
};
