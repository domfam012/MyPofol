import { loadDB } from "../../../public/js/db";
import moment from "moment";

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Content-Type", "application/json");

  const db = await loadDB();
  const {
    query: { url }
  } = req;
  const data = { categoryList: [], category: [] };

  let site = {
    url: "",
    created: "",
    name: "",
    email: "",
    phone: "",
    logo: { saveName: "", path: "" },
    thumbnail: { saveName: "", path: "" },
    intro: "",
    template: 1,
    categoryList: []
  };

  let category = {
    type: 1,
    created: "",
    img: { saveName: "", path: "" },
    view: {
      intro: "",
      created: "",
      originName: "",
      img: { saveName: "", path: "" }
    },
    viewList: []
  };

  let resData, ref, doc;
  switch (req.method) {
    //  사이트 & 카테고리 전체 조회
    case "GET":
      doc = await db.collection("Site").doc(url);
      ref = await doc.get();
      data.categoryList = ref.data().categoryList;

      const getSub = async () => {
        const subCollection = await db.collection(`Site/${url}/category`);
        const subRef = await subCollection.get();
        subRef.forEach(subDoc => {
          data.category.push({ ...subDoc.data() });
        });
        const resData = JSON.stringify({
          status: 200,
          msg: "success",
          data: data
        });
        return res.status(200).send(resData);
      };
      getSub();

    case "POST":
      doc = await db.collection("Site").doc(url);

      // ...site ...category 통째로 받아서 확인후 직접 집어넣기

      site = {
        url: url,
        created: moment()
          .locale("ko")
          .format(),
        name: req.body.site.name || "",
        email: req.body.site.email || "",
        phone: req.body.site.phone || "",
        logo: {
          saveName: req.body.site.logo.saveName || "",
          path: req.body.site.logo.path || ""
        },
        thumbnail: {
          saveName: req.body.site.thumbnail.saveName || "",
          path: req.body.site.thumbnail.saveName || ""
        },
        intro: req.body.site.intro || "",
        template: req.body.site.template || 1,
        categoryList: req.body.site.categoryList || []
      };

      await doc.set(site);

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

    case "PATCH":
      doc = await db.collection("Site").doc(url);

      // Update
      // logo, thumbnail..?
      site = {
        name: req.body.site.name,
        email: req.body.site.email,
        phone: req.body.site.phone,
        logo: {
          saveName: req.body.site.logo.saveName,
          path: req.body.site.logo.path
        },
        thumbnail: {
          saveName: req.body.site.thumbnail.saveName,
          path: req.body.site.thumbnail.path
        },
        intro: req.body.site.intro,
        template: req.body.site.template,
        categoryList: req.body.categoryList
      };

      await doc.update(site);

      return res.status(200).end();

    case "DELETE":
      doc = await db.collection("Site").doc(url);

      const querySnapshot = await doc
        .collection("category")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(subDoc => {
            subDoc.ref.delete();
          });
        });

      await doc.delete();

      resData = JSON.stringify({
        status: 200,
        msg: "success"
      });

      return res.status(200).json(resData);
  }
};
