import pool from "../db";

export interface ILikesService {
  getLikesByUserId: (id: string) => Promise<number[]>;
  updateLikesByUserId: (likesList: number[], id: string) => Promise<number[]>;
  createUserLikes: (userId: string) => void;
}

export class LikesService implements ILikesService {
  async getLikesByUserId(id: string) {
    const likes = await pool.query("select * from likes where user_id = $1", [id]);
    return likes.rows[0].likes_list;
  }

  async updateLikesByUserId(likesList: number[], id: string) {
    const updatedLikes = await pool.query(
      "update likes set likes_list = $1 where user_id = $2 RETURNING *",
      [likesList, id],
    );

    return updatedLikes.rows[0].likes_list;
  }

  async createUserLikes(userId: string) {
    const likesQuery = "INSERT INTO likes (user_id, likes_list) VALUES ($1, $2)";
    const likesValues = [userId, []];
    return await pool.query(likesQuery, likesValues);
  }
}
