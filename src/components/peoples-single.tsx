import React from "react";

import {Box, CircularProgress, Divider, Stack, Typography} from '@mui/material';

import {usePeoplesSingle} from "@/hooks/usePeoples";

interface Props {
  id: string | string[] | undefined
}

const Peoples = ({id}: Props): JSX.Element => {
  const {peoples, status} = usePeoplesSingle(id);

  return (
    <Stack alignItems="center" justifyContent="center" my={4}>
      {status === 'pending' && (
        <Box p={4}>
          <CircularProgress/>
        </Box>
      )}

      {status === 'error' && (
        <Typography variant="subtitle1">
          Person not find!
        </Typography>
      )}

      {peoples && (
        <Stack gap={2}>
          {peoples.name}
          <Divider/>
        </Stack>
      )}
    </Stack>
  );

};

export default Peoples;
