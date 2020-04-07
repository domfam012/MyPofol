/**
 *  카테고리 (GET | POST | PATCH | DELETE)
 *  /api/site/[url]/category/[name]
 */

import { loadDB, firestore } from "../../../../../public/js/db";
import moment from "moment";
import shortid from "shortid";

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Content-Type", "application/json");

  const db = await loadDB();
  const {
    query: { url, name }
  } = req;

  const collection = db.collection(`Site/${url}/category`);

  let doc = await collection.doc(name);
  let resData;
  let data = {};

  // 사이트 문서
  const siteDoc = await db.collection(`Site`).doc(url);

  switch (req.method) {
    // 카테고리 조회
    case "GET":
      const ref = await doc.get();
      data = [];

      // 조회 결과 없음
      if (ref._document === null) {
        resData = JSON.stringify({
          status: 404,
          msg: "not found"
        });
        return res.status(404).send(resData);

        // 정상 조회
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
      data = {
        name: req.body.category.name,
        type: req.body.category.type || 1,
        img: req.body.category.img || {
          saveName: name,
          path: "/img/common/default_thumbnail.png"
        },
        id: name,
        view: {},
        viewList: [],
        created: moment()
          .locale("ko")
          .format()
      };

      // 카테고리 등록
      await doc
        .set(data)
        .then()
        .catch(err => {
          console.error("Error adding document: ", err);
        });

      // 카테고리 리스트 등록
      await siteDoc.update({
        categoryList: firestore.FieldValue.arrayUnion(name)
      });

      return res.status(200).end();

    // 카테고리 수정
    case "PATCH":
      // Update
      // 데이터 체크
      data = {
        type: req.body.category.type,
        name: req.body.category.name,
        view: req.body.category.view,
        viewList: req.body.category.viewList
      };

      if (req.body.category.img) {
        data.img = req.body.category.img;
      }

      // 카테고리 수정
      await doc.update(data);

      return res.status(200).end();

    // 카테고리 삭제
    case "DELETE":
      await doc.delete();

      // console.log(name);

      await siteDoc.update({
        categoryList: firestore.FieldValue.arrayRemove(name)
      });

      resData = JSON.stringify({
        status: 200,
        msg: "success"
      });

      return res.status(200).json(resData);
  }
};
