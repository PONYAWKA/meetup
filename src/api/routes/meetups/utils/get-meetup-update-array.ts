import { Meetup } from "src/api/types/meetup";

export const getMeetupUpdateArray = ({
  description,
  place,
  tags,
  theme,
  time,
}: Partial<Meetup>) => [theme, description, tags, time, place];
