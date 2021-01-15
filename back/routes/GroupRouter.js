import express from "express";
import {
  deleteGroup,
  getByIdGroup,
  getAllGroups,
  updateGroup,
  createGroup,
  getUserGroups,
} from "../logic/GroupLogic.js";

const router = express.Router();

router.route("/groups").post(async (req, res) => {
  res.json(await createGroup(req.body, res));
});

router.route("/groups").get(async (req, res) => {
  res.json(await getAllGroups(res));
});

router.route("/groups/user/:id").get(async (req, res) => {
  res.json(await getUserGroups(req.params.id, res));
});

router.route("/groups/:id").get(async (req, res) => {
  res.json(await getByIdGroup(req.params.id, res));
});

router.route("/groups/:id").put(async (req, res) => {
  res.json(await updateGroup(req.params.id, req.body));
});

router.route("/groups/:id").delete(async (req, res) => {
  res.json(await deleteGroup(req.params.id, res));
});

export default router;
