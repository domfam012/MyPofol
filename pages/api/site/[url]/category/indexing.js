/**
 *  카테고리 - 순서 변경 (PATCH)
 *  /api/site/[url]/category/indexing
 */

import { loadDB } from "../../../../../public/js/db";

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "PATCH");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Content-Type", "application/json");

  const {
    query: { url }
  } = req;

  let resData;
  switch (req.method) {
    // category 순서 변경
    case "PATCH":
      // load firestore database
      const db = await loadDB();
      const doc = await db.collection("Site").doc(url);

      // Update
      const categoryList = req.body.categoryList;

      let newData = {
        categoryList: categoryList
      };

      await doc.update(newData);

      return res.status(200).end();
  }
};
