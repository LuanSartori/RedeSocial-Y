import express from 'express';


// define uma rota padrão
const router = express.Router();
router.get("/", async function (req, res) {
    res.json("BOM DIAA!");
});


export default router;
