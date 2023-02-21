import pool from "../../db";
import { GetLikesReq, ILikesController, LikesRes, UpdateLikesReq } from "./model";

export class LikesController implements ILikesController {
  async getLikesByPersonId(req: GetLikesReq, res: LikesRes) {
    const personId = req.params.id;
    const likes = await pool.query("select * from likes where user_id = $1", [personId]);
    res.status(200).json({ likes: likes.rows[0].likes_list });
  }

  async updateLikesById(req: UpdateLikesReq, res: LikesRes) {
    const userId = req.params.id;
    const newLikesList = req.body.likes;
    const likes = await pool.query(
      "update likes set likes_list = $1 where user_id = $2 RETURNING *",
      [newLikesList, userId],
    );
    res.status(200).json({ likes: likes.rows[0].likes_list });
  }
}
