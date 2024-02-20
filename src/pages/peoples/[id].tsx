import Layout from '@/components/layout';
import {useRouter} from "next/router";


export default function PeopleId() {
  const router = useRouter()
  const personId = router.query.id

  return (
    <Layout>
      {personId}
    </Layout>
  );
}
