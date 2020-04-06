/**
 *  사용자 사이트 (GET)
 *  /api/user/[id]/site
 */

import { loadDB } from "../../../../public/js/db";

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Content-Type", "application/json");

  const {
    query: { id }
  } = req;

  const db = await loadDB();
  const doc = await db.collection("User").doc(id);

  let resData;

  switch (req.method) {
    case "GET":
      const ref = await doc.get();
      resData = { site: [] };

      // 사용자 사이트 목록
      const siteList = ref.data().siteList;

      // 사이트 collection 에서 해당 사이트들 조회
      const getSub = async () => {
        // console.log(siteList)
        for (let site of siteList) {
          const subDoc = await db.collection("Site").doc(site);
          const subRef = await subDoc.get();
          // console.log(subRef.data())
          if (subRef._document !== null) {
            resData.site.push(subRef.data());
          } else {
            return res.status(500).send("user's sites not found");
          }
        }
        resData.status = 200;
        resData.msg = "success";

        // 정상 조회 응답
        return res.status(200).send(resData);
      };
      getSub();

      break;
    default:
      // GET 이외의 요청
      resData = JSON.stringify({
        status: 405,
        msg: "not allowed method"
      });
      return res.status(405).send(resData);
  }
};
