import {APIList} from '@/types/api';
import {List} from '@/types/list';
import {People, PeopleAPI} from '@/types/people';

import {fetcher} from '@/utils/fetcher';

const PEOPLE_RESOURCE = 'people';

export class PeopleService {
  private url = process.env.NEXT_PUBLIC_API_URL;

  private getURL(page?: number, search?: string): string {
    if (!this.url) {
      throw new Error('No exist env: NEXT_PUBLIC_API_URL');
    }
    const apiURL = new URL(this.url + PEOPLE_RESOURCE);

    if (page) {
      apiURL.searchParams.append('page', page.toString());
    }

    if (search) {
      apiURL.searchParams.append('search', search.toString());
    }

    return apiURL.href;
  }

  private getPeopleIdFromUrl(url: string) {
    const peopleIdObj = url.match(/\/(\d+)\/$/)

    return peopleIdObj ? peopleIdObj[0] : null
  }

  async getPage(page: number = 1): Promise<List<People>> {
    const url = this.getURL(page);

    try {
      const response = await fetcher<APIList<PeopleAPI>>(url);

      const requiredFields: Partial<keyof PeopleAPI>[] = ['name'];

      if (!response.results) throw new Error('No data');

      requiredFields.forEach((field) => {
        if (!response.results.every((x) => x[field])) throw new Error(`No ${field} field`);
      });

      const perPage = 10
      const totalPage = Math.ceil(response.count / perPage)

      return {
        page: 1,
        perPage,
        totalPage,
        list: response.results.map((x) => ({
          id: this.getPeopleIdFromUrl(x.url),
          name: x.name
        })),
      };
    } catch (e) {
      throw new Error(`Error while fetching ${e}`);
    }
  }

  async getPeople(id: string | string[] | undefined): Promise<PeopleAPI> {
    const url = this.getURL() + '/' + id;

    try {
      const response = await fetcher<PeopleAPI>(url);

      const requiredFields: Partial<keyof PeopleAPI>[] = ['name'];

      requiredFields.forEach((field) => {
        if (!response[field]) throw new Error(`No ${field} field`);
      });

      return response;
    } catch (e) {
      throw new Error(`Error while fetching ${e}`);
    }
  }

  async searchPeople(input: string): Promise<PeopleAPI[]> {
    const url = this.getURL(undefined, input)

    try {
      const response = await fetcher<APIList<PeopleAPI>>(url)

      if (!response.results) throw new Error('No data');

      return response.results;
    } catch (e) {
      throw new Error(`Error while fetching ${e}`);
    }
  }
}
