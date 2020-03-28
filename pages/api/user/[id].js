import { loadDB } from "../../../public/js/db";
import moment from "moment";

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Content-Type", "application/json");

  const db = await loadDB();
  const {
    query: { id }
  } = req;

  console.log(id)

  let doc;
  let resData;
  let data;
  switch (req.method) {
    //  사용자 조회
    case "GET":
      doc = await db.collection("User").doc(id);
      const ref = await doc.get();
      data = [];

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

    // 사용자 계정 등록
    case "POST":


      // 받아온 값 타입 && null 체크
      const name = req.body.name || "";
      const email = req.body.email || "";
      const phone = req.body.phone || "";
      const socialName = req.body.socialName || "";
      const siteList = req.body.siteList || [];
      const img = req.body.img || { saveName: "", path: "" };

      data = {
        name,
        email,
        phone,
        socialName,
        siteList,
        img,
        created: moment()
          .locale("ko")
          .format()
      };

      const collection = db.collection("User");
      await collection
          .doc(id)
        .set(data)
        .then()
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });

      return res.status(200).end();

    // 사용자 계정 삭제
    case "DELETE":
      doc = await db.collection("User").doc(id);
      doc.delete();

      resData = JSON.stringify({
        status: 200,
        msg: "success"
      });

      return res.status(200).json(resData);
  }
};
