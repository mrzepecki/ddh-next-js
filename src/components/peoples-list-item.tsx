import {Box, Button, Typography} from '@mui/material';

import {People} from '@/types/people';

const PeoplesListItem = ({id, name}: People): JSX.Element => {
  return (
    <Box key={name} sx={{display: 'flex', justifyContent: 'space-between'}}>
      <Typography variant="subtitle1">
        {name}
      </Typography>
      {id && <Button variant="text" href={"/peoples/" + id}>See details</Button>}
    </Box>
  );
};

export default PeoplesListItem;
