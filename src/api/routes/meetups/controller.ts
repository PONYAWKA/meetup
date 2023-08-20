import { Request, Response } from "express";
import { APIRequest } from "src/api/types/request";
import { getUrl } from "src/api/utils/get-url";

import { PostCreateMeetup } from "./interfaces/post-create";
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
}

export const meetupController = new MeetupController();
