import { loadDB } from "../../../public/js/db";

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Content-Type", "application/json");

  const db = await loadDB();
  const {
    query: { id }
  } = req;

  let doc;
  let resData;
  switch (req.method) {
    //  템플릿 조회
    case "GET":
      doc = await db.collection("Template").doc(id);
      const data = [];
      const ref = await doc.get();

      if (ref._document === null) {
        resData = JSON.stringify({
          status: 404,
          msg: "not found"
        });
        return res.status(404).send(resData);

      } else {
        data.push({ ...ref.data() });

        resData = JSON.stringify({
          status: 200,
          msg: "success",
          data: data
        });
        return res.status(200).send(resData);
      }
  }
};
