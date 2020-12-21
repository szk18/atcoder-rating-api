import * as functions from "firebase-functions";
import axios from "axios";

import * as admin from 'firebase-admin';
admin.initializeApp();

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
      const color = getRatingColor(NewRating);

      response.status(200).send({ message: "success", rating: `${NewRating}`, color });
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

export const getRatingColor = (ratingNum: number): Color => {
  if (ratingNum > 0 && ratingNum <= 400) return "gray";
  else if (ratingNum > 400 && ratingNum <= 800) return "brown";
  else if (ratingNum > 800 && ratingNum <= 1200) return "green";
  else if (ratingNum > 1200 && ratingNum <= 1600) return "lightBlue";
  else if (ratingNum > 1600 && ratingNum <= 2000) return "blue";
  else if (ratingNum > 2000 && ratingNum <= 2400) return "yellow";
  else if (ratingNum > 2400 && ratingNum <= 2800) return "orange";
  else if (ratingNum > 2800) return "red";
  else throw new RangeError();
};

type Color =
  | "gray"
  | "brown"
  | "green"
  | "lightBlue"
  | "blue"
  | "yellow"
  | "orange"
  | "red";