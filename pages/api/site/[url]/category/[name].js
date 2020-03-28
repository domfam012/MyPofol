import { loadDB } from "../../../../../public/js/db";
import moment from "moment";

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Content-Type", "application/json");

  const db = await loadDB();
  const {
    query: { url, name }
  } = req;

  const collection = db.collection(`Site/${url}/category`);

  let doc;
  let resData;
  let data = {};
  let type, img, view, viewList;


  switch (req.method) {
    //  카테고리 조회
    case "GET":
      doc = await collection.doc(name);
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




    // 카테고리 등록
    case "POST":
      // 받아온 값 타입 && null 체크
      type = req.body.type || 1;
      img = req.body.img || { saveName: "", path: "" };
      view = {};
      viewList = [];
      /**
       * view = {
       *   saveName1: {},
       *   saveName2: {},
       *   ...
       * }
       */

      data = {
        type,
        viewList,
        img,
        view,
        created: moment()
          .locale("ko")
          .format()
      };


      await collection
        .doc(name)
        .set(data)
        .then()
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });

      return res.status(200).end();




    case "PATCH":
      doc = await collection.doc(name);

      // Update
      type = req.body.type;
      view = req.body.view;
      viewList = req.body.viewList;

      data = {
        type,
        viewList,
        view
      };

      if(req.body.img) {
        data.img = req.body.img;
      }

      await doc.update(data);

      return res.status(200).end();




    // 카테고리 삭제
    case "DELETE":
      doc = await collection.doc(name);
      doc.delete();

      resData = JSON.stringify({
        status: 200,
        msg: "success"
      });

      return res.status(200).json(resData);
  }
};
