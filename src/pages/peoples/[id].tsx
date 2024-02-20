import {useRouter} from "next/router";

import Layout from '@/components/layout';
import PeoplesSingle from "@/components/peoples-single";


export default function PeopleId() {
  const router = useRouter()
  const personId = router.query.id

  return (
    <Layout>
      <PeoplesSingle id={personId}/>
    </Layout>
  );
}
