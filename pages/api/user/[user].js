import request from "request-promise";

export default async (req, res) => {
  const {
    query: { user },
  } = req;

  let userRes = await request({
    url: `https://api.twitch.tv/kraken/users?login=${user}`,
    headers: {
      Accept: "application/vnd.twitchtv.v5+json",
      "Client-ID": process.env.CLIENTID,
    },
  });
  // userRes = JSON.parse(userRes);
  // console.log(userRes.users);
  res.end(userRes);
};
