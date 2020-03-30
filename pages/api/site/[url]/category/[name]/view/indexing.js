/**
 *  뷰 - 순서 변경 (PATCH)
 *  /api/site/[url]/category/[name]/view/indexing
 */

import { loadDB } from "../../../../../../../public/js/db";

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "PATCH");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Content-Type", "application/json");

  const {
    query: { url, name }
  } = req;

  let resData;
  switch (req.method) {
    // 글 업데이트
    case "PATCH":
      // load firestore database
      const db = await loadDB();
      const doc = await db.collection(`Site/${url}/category`).doc(name);

      // Update
      const viewList = req.body.viewList;

      let newData = {
        viewList: viewList
      };

      await doc.update(newData);

      return res.status(200).end();
  }
};
