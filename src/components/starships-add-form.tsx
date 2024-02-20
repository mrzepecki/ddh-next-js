import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form"

import {Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';

interface Option {
 name: string;
 url: string;
}

import Autocomplete from "@mui/material/Autocomplete";

import {useSearchPeoples} from "@/hooks/usePeoples";

import {StarshipDTO} from "@/pages/api/starship";

const StarshipsAddForm = (): JSX.Element => {
 const [inputValue, setInputValue] = useState<Option>({name: '', url: ''});
 const [submitted, setSubmitted] = useState(false);
 const {options} = useSearchPeoples(inputValue.name);

 const handleAutocompleteChange = (event: React.ChangeEvent<{}>, newInputValue: string) => {
  setInputValue((prevInputValue) => ({...prevInputValue, name: newInputValue}));
 };

 const isOptionEqualToValue = (option: Option, value: Option | null) =>
  option.name === value?.name && option.url === value?.url;

 const {
  register,
  handleSubmit,
  formState: {errors},
  reset,
  setValue
 } = useForm<StarshipDTO>()

 const onSubmit: SubmitHandler<StarshipDTO> = async (data) => {
  await fetch('/api/starship', {
   method: 'POST',
   body: JSON.stringify({
    ...data,
    pilot: {
     name: inputValue.name,
     url: inputValue.url
    }
   }),
  })

  setSubmitted(true);

  reset();
  setInputValue({name: '', url: ''})
  setValue("pilot", {name: '', url: ''});
 }

 return (
  <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', flexDirection: 'column'}}>
   <TextField
    error={!!errors.model}
    label="Model"
    {...register("model", {required: true})}
    sx={{mb: 2}}
   />

   <TextField
    error={!!errors.name}
    label="Name"
    {...register("name", {required: true})}
    sx={{mb: 2}}
   />

   <Autocomplete
    options={options || []}
    getOptionLabel={(option) => option.name}
    onChange={(event, newValue) => {
     setInputValue(newValue || {name: '', url: ''});
    }}
    inputValue={inputValue.name}
    onInputChange={handleAutocompleteChange}
    isOptionEqualToValue={isOptionEqualToValue}
    renderInput={(params) => (
     <TextField
      {...params}
      label="Search Character"
      variant="outlined"
      sx={{mb: 2}}
      error={!!errors.pilot}
      {...register("pilot", {required: true})}
     />
    )}
   />

   <FormControl sx={{width: 300}}>
    <InputLabel id="starship">Starship class</InputLabel>
    <Select
     defaultValue=""
     labelId="starship"
     {...register("starship_class", {required: true})}
     label="Starship class"
     error={!!errors.starship_class}
     sx={{mb: 2}}
    >
     <MenuItem value={'Starfighter'}>Starfighter</MenuItem>
     <MenuItem value={'Deep Space Mobile Battlestation'}>Deep Space Mobile Battlestation</MenuItem>
    </Select>
   </FormControl>

   <TextField
    error={!!errors.cost_in_credits}
    label="Cost in credits"
    inputProps={{type: 'number'}}
    {...register("cost_in_credits", {required: true, setValueAs: (value) => Number(value)})}
    sx={{mb: 2}}
   />

   <TextField
    error={!!errors.length}
    label="Length"
    {...register("length", {required: true})}
    sx={{mb: 2}}
   />

   <TextField
    error={!!errors.max_atmosphering_speed}
    label="Max atmosphering speed"
    {...register("max_atmosphering_speed", {required: true})}
    sx={{mb: 2}}
   />

   <Button type="submit" variant="contained" sx={{mt: 2}}>
    Submit
   </Button>

   {submitted && (
    <Typography sx={{mt: 2, color: "green"}}>Starship added!</Typography>
   )}
  </form>
 )
};

export default StarshipsAddForm;
