import { Response } from "express";
import { Meetup } from "src/api/types/meetup";
import { parseMeetupGetUrl } from "src/api/utils/parse-meetup-get-url";
import { DB } from "src/data-base/db";
import { createMeetup } from "src/data-base/sqls/meetup/create";
import { getMeetup } from "src/data-base/sqls/meetup/get";
import { getAllMeetup } from "src/data-base/sqls/meetup/get-all";
class MeetupService {
  async all() {
    return await DB.query<Meetup>(getAllMeetup);
  }

  async create(
    { locals }: Response,
    theme: string,
    description: string,
    tags: string[],
    place: string
  ) {
    const person_name = locals.user.name;
    const VALUES = [theme, description, tags, new Date(), place, person_name];

    const meetup = DB.query<Meetup>(createMeetup, VALUES);

    return meetup;
  }
  async get(url: string) {
    const { filters, sortField } = parseMeetupGetUrl(url);
    const meetups = await DB.query<Meetup>(getMeetup(sortField), filters);
    return meetups.rows;
  }
}

export const meetupService = new MeetupService();
