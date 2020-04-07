/**
 *  템플릿 목록 (GET)
 *  /api/template/list
 */

import { loadDB } from "../../../public/js/db";

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Content-Type", "application/json");

  const db = await loadDB();
  const collection = await db.collection("Template");

  if (req.method === "GET") {

    const ref = await collection.orderBy("index", "asc").get();
    const data = [];

    ref.forEach(doc => { // 템플릿
      data.push({ id: doc.id, ...doc.data() });
    });

    const resData = JSON.stringify({
      data: data
    });

    return res.status(200).send(resData);

  } else { // GET 이외의 요청
    const resData = JSON.stringify({
      status: 405,
      msg: "not allowed method"
    });
    return res.status(405).send(resData);
  }
};
