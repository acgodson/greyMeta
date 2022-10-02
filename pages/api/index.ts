//const urlToFetch = "localhost:3000";

export default async function handler(req, res) {
  //   let data = await fetch(`${urlToFetch}`);
  //   let json = await data.json();
  res.send({ Data: "Welcome to greyMeta" });
}
