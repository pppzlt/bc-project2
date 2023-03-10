// import express router and the correct tables
const router = require("express").Router();
const { User, List, UserList } = require("../models");
const withAuth = require("../utils/auth");

// url /masterlist
router.get("/", withAuth, async (req, res) => {
    try {
        console.log(req.session.user_id);
        let dbAllList = await List.findAll();
        let allList = dbAllList.map((list) => list.get({ plain: true }));
        res.render("listPage", { allList });
    } catch (err) {
        res.status(500).json(err);
    }
});
//create a new list
router.post("/", withAuth, async (req, res) => {
    try {
        let result = await List.create(req.body);
        //also create the user list relationship
        let rel = await UserList.create({ user_id: req.session.user_id, list_id: result.list_id});
        res.status(200).json({ result: result, relationship: rel });
    } catch (err) {
        res.status(400).json(err);
    }
});
// delete something based off of its list id
router.delete("/:list_id", withAuth, async (req, res) => {
    try {
        let result = await List.destroy({
            where: {
                list_id: req.params.list_id,
            },
        });
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});
// get all the lists for rendering to the page
router.get("/all", withAuth, async (req, res) => {
    try {
        let findList = await List.findAll();
        res.json(findList);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
