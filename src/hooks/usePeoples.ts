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

const PEOPLES_KEY = 'people';

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
    queryKey: [PEOPLES_KEY, id],
    queryFn: () => peopleService.getPeople(id),
  });

  return {
    status: status,
    peoples: data,
  };
};
