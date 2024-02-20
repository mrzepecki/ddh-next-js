import React, {useState} from "react";

import { Box, CircularProgress, Divider, Pagination, Stack } from '@mui/material';

import usePeoples from '@/hooks/usePeoples';

import PeoplesList from './peoples-list';

const Peoples = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1)
  const {peoples, status} = usePeoples(currentPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Stack alignItems="center" justifyContent="center" my={4}>
      {status === 'success' && peoples ? (
        <Stack gap={2}>
          <PeoplesList peoples={peoples.list} />
          <Divider />
          <Pagination count={peoples.totalPage} page={currentPage} onChange={handleChange}/>
        </Stack>
      ) : (
        <Box p={4}>
          <CircularProgress />
        </Box>
      )}
    </Stack>
  );
};

export default Peoples;
