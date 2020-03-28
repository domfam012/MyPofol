import { loadDB } from "../../../public/js/db";

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Content-Type", "application/json");

  const db = await loadDB();
  const collection = await db.collection("Template");

  if (req.method === "GET") {

    const ref = await collection.get();
    const data = [];

    ref.forEach(doc => {
      data.push({ id: doc.id, ...doc.data() });

      const getSub = async () => {
        const subCollection = await db.collection(`Template/${doc.id}/img`);
        const subRef = await subCollection.orderBy("created", "desc").get();
        subRef.forEach(subDoc => {
          data[data.length-1] = { ...data[data.length-1], img: { ...subDoc.data() } };
        });
        const resData = JSON.stringify({
          status: 200,
          msg: "success",
          data: data
        });
        res.status(200).send(resData);
      };
      getSub();

    });

  } else {

    // res.json({ status: 405, msg: "" });
  }
};
