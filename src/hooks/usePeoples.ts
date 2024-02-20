import { QueryStatus, useQuery } from '@tanstack/react-query';

import { List } from '@/types/list';
import {People, PeopleAPI} from '@/types/people';

import { PeopleService } from '@/services/people';

interface State {
  status: QueryStatus;
  peoples: List<People> | undefined;
}

interface StateSingle {
  status: QueryStatus,
  peoples: PeopleAPI | undefined
}

interface StateSearch {
  status: QueryStatus,
  options: PeopleAPI[] | undefined
}

const PEOPLES_KEY = 'people';
const SINGLE_PEOPLES_KEY = 'single_people';
const SEARCH_PEOPLES_KEY = 'search_people';

export const usePeoples = (page: number): State => {
  const peopleService = new PeopleService();

  const { data, status } = useQuery({
    queryKey: [PEOPLES_KEY, page],
    queryFn: () => peopleService.getPage(page),
  });

  return {
    status: status,
    peoples: data,
  };
};

export const usePeoplesSingle = (id: string | string[] | undefined): StateSingle => {
  const peopleService = new PeopleService();

  const { data, status } = useQuery({
    queryKey: [SINGLE_PEOPLES_KEY, id],
    queryFn: () => peopleService.getPeople(id),
  });

  return {
    status: status,
    peoples: data,
  };
};

export const useSearchPeoples = (input: string): StateSearch => {
  const peopleService = new PeopleService()

  const {data, status} = useQuery({
    queryKey: [SEARCH_PEOPLES_KEY, input],
    queryFn: () => peopleService.searchPeople(input),
  });

  return {
    status: status,
    options: data,
  };
};
