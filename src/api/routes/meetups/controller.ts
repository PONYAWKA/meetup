import { NextFunction, Request, Response } from "express";
import { PostCreateMeetupDTO } from "src/api/dto/post-create-meetup.dto";
import { PutUpdateMeetupDTO } from "src/api/dto/post-update-meetup.dto";
import { ApiError } from "src/api/foundation/error/apiError";
import { APIRequest } from "src/api/types/request";
import { getUrl } from "src/api/utils/get-url";
import { validateRequest } from "src/api/utils/validate-request";

import { PostCreateMeetup } from "./interfaces/post-create";
import { PutUpdateMeetup } from "./interfaces/put-update-meetup";
import { meetupService } from "./service";

class MeetupController {
  async create(
    { body }: APIRequest<PostCreateMeetup>,
    res: Response,
    next: NextFunction
  ) {
    const { description, place, tags, theme, date } = body;

    const validate = validateRequest(body, PostCreateMeetupDTO, next);
    if (validate) return validate;

    const meetup = await meetupService.create(
      res,
      theme,
      description,
      tags,
      place,
      date
    );
    return res.json(meetup.rows[0]);
  }
  async get(req: Request, res: Response) {
    const { originalUrl } = req;
    const meetups = await meetupService.get(getUrl(originalUrl));

    return res.json(meetups);
  }

  async update(
    req: APIRequest<PutUpdateMeetup>,
    res: Response,
    next: NextFunction
  ) {
    const id = req.params.id;
    if (!id) throw ApiError.badReq("no id provided");

    const validate = validateRequest(req.body, PutUpdateMeetupDTO, next);
    if (validate) return validate;

    const meetup = await meetupService.update(id, req.body);

    return res.json(meetup);
  }

  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    if (!id) throw ApiError.badReq("no id provided");

    await meetupService.delete(id);

    return res.status(200).json();
  }
}

export const meetupController = new MeetupController();
