import { Response } from "express";
import { parseMeetupGetUrl } from "src/api/routes/meetups/utils/parse-meetup-get-url";
import { Meetup } from "src/api/types/meetup";
import { DB } from "src/data-base/db";
import { createMeetup } from "src/data-base/sqls/meetup/create";
import { deleteMeetupSQL } from "src/data-base/sqls/meetup/delete";
import { getMeetup } from "src/data-base/sqls/meetup/get";
import { getAllMeetup } from "src/data-base/sqls/meetup/get-all";
import { updateMeetupSQL } from "src/data-base/sqls/meetup/put-update";

import { PutUpdateMeetup } from "./interfaces/put-update-meetup";
import { getMeetupUpdateArray } from "./utils/get-meetup-update-array";

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

  async update(id: number | string, fields: PutUpdateMeetup) {
    const updateMeetup = [...getMeetupUpdateArray(fields), id];
    const meetup = await DB.query<Meetup>(updateMeetupSQL, updateMeetup);
    return meetup.rows[0];
  }

  async delete(id: number | string) {
    await DB.query(deleteMeetupSQL, [id]);
  }
}

export const meetupService = new MeetupService();
