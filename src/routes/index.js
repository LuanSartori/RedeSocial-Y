import express from 'express';


const router = express.Router();
router.get("/", function (req, res) {
    res.json("BOM DIAA!");
    // res.redirect("/");
});


export default router;