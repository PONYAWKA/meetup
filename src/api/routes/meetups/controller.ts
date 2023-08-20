import { Request, Response } from "express";
import { ApiError } from "src/api/foundation/error/apiError";
import { APIRequest } from "src/api/types/request";
import { getUrl } from "src/api/utils/get-url";

import { PostCreateMeetup } from "./interfaces/post-create";
import { PutUpdateMeetup } from "./interfaces/put-update-meetup";
import { meetupService } from "./service";

class MeetupController {
  async getAll(_req: Request, res: Response) {
    const meetups = await meetupService.all();
    return res.json(meetups.rows);
  }
  async create({ body }: APIRequest<PostCreateMeetup>, res: Response) {
    const { description, place, tags, theme } = body;
    const meetup = await meetupService.create(
      res,
      theme,
      description,
      tags,
      place
    );
    return res.json(meetup.rows[0]);
  }
  async get(req: Request, res: Response) {
    const { originalUrl } = req;
    const meetups = await meetupService.get(getUrl(originalUrl));

    return res.json(meetups);
  }

  async update(req: APIRequest<PutUpdateMeetup>, res: Response) {
    const id = req.params.id;
    if (!id) throw ApiError.badReq("no id provided");

    const meetup = await meetupService.update(id, req.body);

    return res.json(meetup);
  }

  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    if (!id) throw ApiError.badReq("no id provided");

    return res.status(200).json();
  }
}

export const meetupController = new MeetupController();
