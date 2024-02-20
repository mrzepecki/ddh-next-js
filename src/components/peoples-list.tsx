import { Box, Button,Typography } from '@mui/material';

import { People } from '@/types/people';

interface Props {
  peoples: People[];
}

const PeoplesList = ({ peoples }: Props): JSX.Element => {
  return (
    <>
      {peoples.map((x) => (
        <Box key={x.name} sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography  variant="subtitle1">
            {x.name}
          </Typography>
          {x.id && <Button variant="text" href={"/peoples/" + x.id}>See details</Button>}
        </Box>
      ))}
    </>
  );
};

export default PeoplesList;
