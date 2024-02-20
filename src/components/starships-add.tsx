import React from "react";

import {Stack, Typography} from '@mui/material';

import StarshipsAddForm from "@/components/starships-add-form";

const StarshipsAdd = (): JSX.Element => {

  return (
    <Stack alignItems="center" justifyContent="center" my={4}>
      <Typography variant="subtitle1" sx={{mb: 3}}>
        Add Starship
      </Typography>
      <StarshipsAddForm />
    </Stack>
  )
};

export default StarshipsAdd;
