import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useAuth from '../../Hooks/useAuth';
import { Box } from '@mui/material';
import * as api from "../../Services/api"



function TopMenu({ option, handleChange, searchValue, handleSearch }) {



    const { user } = useAuth()
    const [list, setList] = useState([{ name: "Carregando..." }])
    const [optionList, setOptionList] = useState({
        discipline: [],
        teacher: []
    })
    const [isDisable, setIsDisable] = useState(false)
    const [labels, setLabels] = useState({
        searchBar: "",
        subtitle: ""
    })


    async function fetchData() {
        const disciplines = await api.getAllDisciplines(user)
        const teachers = await api.getAllTeachers(user)

        setOptionList({
            discipline: disciplines,
            teacher: teachers
        })
    }



    useEffect(() => {
        if (option === "disciplina") {
            setList(optionList.discipline)
            setIsDisable(false)
            setLabels({
                subtitle: "Repositório por disciplina",
                searchBar: "Pesquisar por disciplina"
            })


        }
        if (option === "instrutor") {
            setList(optionList.teacher)
            setIsDisable(false)
            setLabels({
                subtitle: "Repositório por pessoa instrutora",
                searchBar: "Pesquisar por pessoa instrutora"
            })

        }
        if (option === "adicionar") {
            setIsDisable(true)
            setLabels({
                subtitle: "Adicionar prova ao repositório",
                searchBar: "Pesquisa desabilitada nessa aba"
            })

        }
    }, [option, optionList]);

    useEffect(() => {
        fetchData()
    });



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
                    id="search-autocomplete"
                    disabled={isDisable}
                    freeSolo
                    options={list.map((el) => el.name)}
                    autoComplete={true}
                    onInputChange={(e, value) => handleSearch(value)}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label={labels.searchBar}
                            variant="filled"
                            InputLabelProps={{
                                color: "secondary"
                            }}
                            value={searchValue}

                        />

                    }
                />
            </Box>
            <ToggleButtonGroup
                color="secondary"
                value={option}
                exclusive
                onChange={handleChange}
                fullWidth={true}
            >
                <ToggleButton value="disciplina">DISCIPLINA</ToggleButton>
                <ToggleButton value="instrutor">PESSOA INSTRUTORA</ToggleButton>
                <ToggleButton value="adicionar">ADICIONAR</ToggleButton>
            </ToggleButtonGroup>
        </>
    );

}

export default TopMenu