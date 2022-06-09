const jwt = require("jsonwebtoken");
const jwtToken = "IMCODEBUG";
const axios = require("axios");

const redis = require("redis");
const REDIS_PORT = 6379;

const client = redis.createClient({ socket: { port: REDIS_PORT } });

exports.getUserData = async (req, res, next) => {
  let token = req.headers.noteservice;
  if (!token) return res.status(401).json({ success: false, err: "Forbidden" });
  try {
    await client.connect();
    const decoded = jwt.verify(token, jwtToken);
    if (decoded) {
      let cacheData = await client.get(decoded.id, (err, data) => {
        if (err) return res.status(500).json({ success: false, err: err });
        if (data !== null) {
          return data;
        }
      });
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
