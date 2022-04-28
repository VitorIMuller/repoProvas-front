import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';

import { Box } from '@mui/material';

function TopMenu(option, handleChange) {


    const [isDisable, setIsDisable] = useState(false)
    const [labels, setLabels] = useState({
        searchBar: "",
        subtitle: ""
    })



    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <Autocomplete
                    sx={{ mb: 4, width: "60vw", minWidth: '300px', alignSelf: "center" }}

                    id="free-solo-demo"
                    disabled={isDisable}
                    freeSolo
                    // options={list.map((el) => el.name)}
                    autoComplete={true}
                    // onInputChange={(e, value) => handleSearch(value)}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label={labels.searchBar}
                            variant="filled"
                            InputLabelProps={{
                                color: "secondary"
                            }}
                            fullWidth={true}
                            size="small"
                        // value={searchValue}

                        />}
                />
            </Box>
            <ToggleButtonGroup
                color="secondary"
                value={option}
                exclusive
                onChange={handleChange}
                fullWidth={true}
            >
                <ToggleButton value="disciplina"  >DISCIPLINA</ToggleButton>
                <ToggleButton value="instrutor" >PESSOA INSTRUTORA</ToggleButton>
                <ToggleButton value="adicionar">ADICIONAR</ToggleButton>
            </ToggleButtonGroup>
        </>
    );

}

export default TopMenu