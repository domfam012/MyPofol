import { loadDB } from "../../../../public/js/db";

export default async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Content-Type", "application/json");

    const db = await loadDB();
    const collection = await db.collection("User");

    switch(req.method) {

        case "GET":
            const ref = await collection.get();
            const resData = {site: []};

            ref.forEach(doc => {
                const siteList = doc.data().siteList;
                const getSub = async () => {
                    for(let site of siteList) {
                        const subDoc = await db.collection("Site").doc(site);
                        const subRef = await subDoc.get();

                        if (subRef._document !== null) {
                            resData.site.push(subRef.data());
                        }
                    }
                };
                getSub();
            });

            resData.status = 200;
            resData.msg = "success";

            return res.status(200).send(resData);

    }

};
