/**
 *  사용자 (GET | POST | DELETE)
 *  /api/user/[id]
 */

import { loadDB } from "../../../public/js/db";
import moment from "moment";

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Content-Type", "application/json");

  const db = await loadDB();
  const { query: { id } } = req;

  let resData,
      data,
      doc = await db.collection("User").doc(id);

  switch (req.method) {

    //  사용자 조회
    case "GET":
      const ref = await doc.get();
      data = [];

      if (ref._document === null) { // 조회 결과 없음
        resData = JSON.stringify({
          status: 200,
          msg: "not found",
          data : 404
        });
        return res.status(200).send(resData);

      } else { // 정상 조회
        data.push({ ...ref.data() });

        resData = JSON.stringify({
          status: 200,
          msg: "success",
          data: data
        });
        return res.status(200).send(resData);
      }

    // 사용자 등록
    case "POST":
      // 받아온 값 타입 && null 체크
      data = {
        name: req.body.name || "",
        email: req.body.email || "",
        phone: req.body.phone || "",
        socialName: req.body.socialName || "",
        siteList: req.body.siteList || [],
        img: req.body.img || { saveName: "", path: "" },
        created: moment()
          .locale("ko")
          .format()
      };

      await doc
        .set(data)
        .then()
        .catch(function(error) {
          console.error("Error adding document: ", error);
          return res.status(500).end();
        });

      return res.status(200).end();

    // 사용자 삭제
    case "DELETE":
      doc.delete();

      resData = JSON.stringify({
        status: 200,
        msg: "success"
      });

      return res.status(200).json(resData);
  }
};
