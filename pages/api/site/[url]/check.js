/**
 *  사이트 중복확인 (GET)
 *  /api/site/[url]/check
 */

import { loadDB } from "../../../../public/js/db";
import moment from "moment";

export default async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Content-Type", "application/json");

    const db = await loadDB();
    const { query: { url } } = req;
    switch (req.method) {
        //  사이트 중복 확인
        case "GET":
            if (!url) return res.status(400).json({urlChecked: false})

            const doc = await db.collection("Site").doc(url);
            const ref = await doc.get();

            if(!ref.data()) {
                return res.status(200).json({urlChecked: true});
            }

            return res.status(200).json({urlChecked: false});

    }
};
