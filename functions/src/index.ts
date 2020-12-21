import * as functions from "firebase-functions";
import axios from "axios";

export const rating = functions.https.onRequest(
  async (request, response) => {
    const { user } = request.query;

    if (user == undefined){
      response.status(400).send({ message: "set your username" });
      return;
    }

    try {
      const { data } = await axios.get<Record[]>(
        `https://atcoder.jp/users/${user}/history/json`
      );

      if (data.length === 0){
        response.status(400).send({ message: "no such user or no contest record" });
        return;
      }

      const latestRecord = data[data.length - 1];
      const { NewRating } = latestRecord;

      response.status(200).send({ message: "success", rating: `${NewRating}` });
      return;
    } catch (e) {
      response.status(503).send({ message: "server error" });
      return;
    }
  }
);

interface Record {
  IsRated: boolean;
  Place: number;
  OldRating: number;
  NewRating: number;
  Performance: number;
  InnerPerformance: number;
  ContestScreenName: string;
  ContestNameEn: string;
  EndTime: string;
}

// interface Result {
//   message: string;
//   rating?: number;
// }
