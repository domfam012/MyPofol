import { loadDB } from "../../../public/js/db";

export default async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Content-Type", "application/json");

    const db = await loadDB();
    const { query: { id } } = req;
    const doc = await db.collection("User").doc(id);
    const data = [];

    let resData;
    switch(req.method) {
        case "GET":
            const ref = await doc.get();
            data.push({ ...ref.data() });

            resData = JSON.stringify({
                status: 200,
                msg: "success",
                data: data
            });
            res.status(200).send(resData);

            break;

        case "POST":

            break;

        case "DELETE":
            doc.delete();

            resData = JSON.stringify({
                status: 200,
                msg: "success"
            });
            res.status(200).json(resData);

            break;
    }

};
