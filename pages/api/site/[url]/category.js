import { loadDB } from "../../../../public/js/db";

export default async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Content-Type", "application/json");

    const db = await loadDB();
    const { query: { url } } = req;
    const doc = await db.collection("Site").doc(url);
    const data = { categoryList: [], category: [] };

    if (req.method === "GET") {
        const ref = await doc.get();
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
            res.status(200).send(resData);
        };
        getSub();

    } else {

        // res.json({ status: 405, msg: "" });
    }
};
