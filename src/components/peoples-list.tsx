import {People} from '@/types/people';

import PeoplesListItem from "@/components/peoples-list-item";

interface Props {
  peoples: People[];
}

const PeoplesList = ({peoples}: Props): JSX.Element => {
  return (
    <>
      {peoples.map((x) =>
        <PeoplesListItem key={x.id} id={x.id} name={x.name}/>
      )}
    </>
  );
};

export default PeoplesList;
