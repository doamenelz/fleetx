import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { Employee } from "@/models";
import { faker } from "@faker-js/faker";
export interface Announcement {
  id: string;
  title: string;
  description: string;
  postDate: string;
  category: string;
  hero?: string;
  isRead: boolean;
  content?: string;
}
faker.seed(123);
export const sampleAnnouncements = (number: number) => {
  let posts: Announcement[] = [];

  while (posts.length < number) {
    let post: Announcement = {
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      postDate: formatDate(
        new Date(
          faker.date.past({ years: 5, refDate: new Date().toDateString() })
        ),
        DATE_OPTIONS.dMY
      ),
      category: faker.person.jobArea(),
      hero: faker.image.url(),
      isRead: false,
    };

    posts.push(post);
  }

  return posts;
};
