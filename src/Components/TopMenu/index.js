import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useAuth from '../../Hooks/useAuth';
import { Box } from '@mui/material';
import * as filter from '../../utils/filter/filter'
import * as services from "../../Services/services"
import CircularProgress from '@mui/material/CircularProgress';



function TopMenu({ option, setOption, discipline, teachers, repositoryFiltered, setRepositoryFiltered }) {



    const { user } = useAuth()
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([{ name: "...carregando opções" }])
    const [searchValue, setSearchValue] = useState("Carregando...")
    const [optionList, setOptionList] = useState({
        discipline: [],
        teacher: []
    })
    const [isDisable, setIsDisable] = useState(false)
    const [labels, setLabels] = useState({
        searchBar: "",
        subtitle: ""
    })

    const [open, setOpen] = useState(false);

    async function fetchData() {
        const disciplines = await services.fetchDisciplineData(user)
        const teachers = await services.feachTeachersData(user)

        setOptionList({
            discipline: disciplines,
            teacher: teachers
        })
    }
    const handleChange = (event, newOption) => {
        if (newOption !== null) {
            setOption(newOption)
            setSearchValue("")
        }
    };

    function handleSearchInput(input) {
        setSearchValue(input)
    }

    function sleep(delay = 0) {
        return new Promise((resolve) => {
            setTimeout(resolve, delay);
        });
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
    useEffect(() => {
        setRepositoryFiltered({
            discipline: filter.filterDiscipline(discipline, searchValue),
            teacher: filter.filterTeacher(teachers, searchValue)
        })
    }, [searchValue, teachers, discipline, option]);

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                setOptionList({
                    teacher: teachers,
                    discipline: discipline
                })
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptionList([]);
        }
    }, [open]);

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
                    id="asynchronous-demo"
                    sx={{ width: 300 }}
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    isOptionEqualToValue={(option, value) => option.title === value.title}
                    getOptionLabel={(option) => option.map((el) => el.name)}
                    options={list?.map((el) => el.name)}
                    loading={loading}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Asynchronous"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />
                {/* {/* <Autocomplete
                    sx={{ mb: 4, width: "60vw", minWidth: '300px', alignSelf: "center" }}
                    id="search-autocomplete"
                    disabled={isDisable}
                    freeSolo
                    options={list.map((el) => el.name)}
                    autoComplete={true}
                    onInputChange={(e, value) => handleSearchInput(value)}
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
                /> */}
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