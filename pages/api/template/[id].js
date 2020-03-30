/**
 *  템플릿 (GET)
 *  /api/template/[id]
 */

import { loadDB } from "../../../public/js/db";

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
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

      // 조회 결과 없음
      if (ref._document === null) {
        resData = JSON.stringify({
          status: 404,
          msg: "not found"
        });
        return res.status(404).send(resData);

      } else { // 정상 조회
        data.push({ ...ref.data() });

        resData = JSON.stringify({
          status: 200,
          msg: "success",
          data: data
        });
        return res.status(200).send(resData);
      }

    default: // GET 이외의 요청
      resData = JSON.stringify({
        status: 405,
        msg: "not allowed method"
      });
      return res.status(405).send(resData);
  }
};
