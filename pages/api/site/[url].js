/**
 *  사이트 (GET | POST | PATCH | DELETE )
 *  /api/site/[url]
 */

import {firestore, loadDB} from "../../../public/js/db";
import moment from "moment";

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Content-Type", "application/json");

  const db = await loadDB();
  const {
    query: { url }
  } = req;

  // let site = {
  //   url: "",
  //   created: "",
  //   name: "",
  //   email: "",
  //   phone: "",
  //   logo: { saveName: "", path: "" },
  //   thumbnail: { saveName: "", path: "" },
  //   intro: "",
  //   template: 1,
  //   categoryList: []
  // };
  // let category = {
  //   type: 1,
  //   created: "",
  //   img: { saveName: "", path: "" },
  //   view: {intro: "", created: "", originName: "", img: { saveName: "", path: "" }},
  //   viewList: []
  // };

  const data = {};
  data[url] = {};

  let site, category;
  let resData, ref, doc;

  let user;
  const userCol = await db.collection("User");
  let userDoc;

  switch (req.method) {
    //  사이트 & 카테고리 전체 조회
    case "GET":
      doc = await db.collection("Site").doc(url);
      ref = await doc.get();

      if (!ref.data()) {
        return res.status(404).end();
      }
      data[url] = ref.data();

      const getSub = async () => {
        const subCollection = await db.collection(`Site/${url}/category`);
        const subRef = await subCollection.get();
        data[url].category = {};
        subRef.forEach(subDoc => {
          data[url].category[subDoc.id] = { id:subDoc.id, ...subDoc.data() };
        });
        const resData = JSON.stringify({
          status: 200,
          msg: "success",
          data: data
        });
        return res.status(200).send(resData);
      };
      getSub();
      break;

    // 사이트 등록
    case "POST":
      doc = await db.collection("Site").doc(url);

      user = req.body.userId;
      userDoc = userCol.doc(user);

      // 데이터 체크
      // ...site ...category 통째로 받아서 확인후 직접 집어넣기
      const current = moment()
        .locale("ko")
        .format();

      site = {
        url: url,
        created: current,
        name: req.body.name || "",
        email: req.body.email || "",
        phone: req.body.phone || "",
        logo: {
          saveName: req.body.logo ? req.body.logo.saveName : "",
          path: req.body.logo ? req.body.logo.path : ""
        },
        thumbnail: {
          saveName: req.body.thumbnail ? req.body.thumbnail.saveName : "",
          path: req.body.thumbnail ? req.body.thumbnail.path : ""
        },
        intro: req.body.intro || "",
        template: req.body.template || 1,
        categoryList: req.body.categoryList || []
      };

      // 사이트 등록
      await doc.set(site);

      // 사이트 리스트 등록
      await userDoc.update({
        siteList: firestore.FieldValue.arrayUnion(url)
      });

      category = {
        type: 1,
        created: current,
        img: { saveName: "", path: "/img/common/default_thumbnail.png" },
        view: {
          intro: "",
          created: "",
          originName: "",
          img: { saveName: "", path: "" }
        },
        viewList: []
      };

      // 카테고리 등록
      const promises = [];
      for (let categoryName of site.categoryList) {
        promises.push(
          doc
            .collection("category")
            .doc(categoryName)
            .set(category)
        );
      }
      Promise.all(promises)
        .then(function() {
          console.log("All subcollections were added!");
          return res.status(200).end();
        })
        .catch(function(error) {
          console.log("Error adding subcollections to Firestore: " + error);
          return res.status(500).end();
        });
      break;

    // 사이트 수정
    case "PATCH":
      doc = await db.collection("Site").doc(url);

      console.log(req.body)

      // Update
      // 데이터 체크
      // ...site ...category 통째로 받아서 확인후 직접 집어넣기
      site = {
        name: req.body.site.name,
        email: req.body.site.email,
        phone: req.body.site.phone,
        // logo: {
        //   saveName: req.body.site.logo.saveName,
        //   path: req.body.site.logo.path
        // },
        // thumbnail: {
        //   saveName: req.body.site.thumbnail.saveName,
        //   path: req.body.site.thumbnail.path
        // },
        intro: req.body.site.intro,
        template: req.body.site.template,
        categoryList: req.body.categoryList
      };

      // 사이트 업데이트
      await doc.update(site);

      return res.status(200).end();
      break;

    // 사이트 삭제
    case "DELETE":
      doc = await db.collection("Site").doc(url);

      // 사이트 하위 카테고리 컬렉션 삭제
      await doc
        .collection("category")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(subDoc => {
            subDoc.ref.delete();
          });
        });

      // 사이트 삭제
      await doc.delete();

      // 사이트 리스트 삭제
      user = req.body.userId;
      userDoc = userCol.doc(user);
      await userDoc.update({
        siteList: firestore.FieldValue.arrayRemove(url)
      });

      resData = JSON.stringify({
        status: 200,
        msg: "success"
      });

      return res.status(200).json(resData);
      break;
  }
};
