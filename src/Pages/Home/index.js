import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import { DisciplineList } from "../../Components/List/DisciplineList/DisciplineList"
import { TeacherList } from '../../Components/List/TeacherList/TeacherList';

import { Typography } from '@mui/material';
import * as services from "../../Services/services"
import useAuth from '../../Hooks/useAuth';
import CircularProgress from '@mui/material/CircularProgress';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AddTest from '../../Components/AddTest';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { Box } from '@mui/material';

import * as filter from '../../utils/filter/filter'


export default function Home() {

    const { user } = useAuth()
    const [option, setOption] = useState('disciplina');
    const [discipline, setDiscipline] = useState([])
    const [teacher, setTeacher] = useState([])
    const [loading, setLoading] = useState(false)
    const [isDisable, setIsDisable] = useState(false)
    const [labels, setLabels] = useState({
        searchBar: "",
        subtitle: ""
    })
    const [list, setList] = useState([{ name: "...carregando opções" }])
    const [searchValue, setSearchValue] = useState("")
    const [repositoryFiltered, setRepositoryFiltered] = useState({
        discipline: [],
        teacher: []
    })



    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function getItens() {
        setLoading(true)
        await sleep(5000);
        try {
            const disciplines = await services.fetchDisciplineData(user)
            const teachers = await services.feachTeachersData(user)
            setDiscipline(disciplines)
            setTeacher(teachers)
            setLoading(false)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getItens()
    }, []);

    useEffect(() => {
        if (option === "disciplina") {
            setList(discipline)
            setIsDisable(false)
            setLabels({
                subtitle: "Repositório por disciplina",
                searchBar: "Pesquisar por disciplina"
            })

        }
        if (option === "instrutor") {
            setList(teacher)
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
    }, [option, teacher, discipline])

    const handleChange = (e, newOption) => {
        setOption(newOption)
    };

    function handleSearchInput(input) {
        setSearchValue(input)
    }

    useEffect(() => {
        setRepositoryFiltered({
            discipline: filter.filterDiscipline(discipline, searchValue),
            teacher: filter.filterTeacher(teacher, searchValue)
        })
    }, [searchValue, teacher, discipline, option]);

    return (

        <Container component="main" maxWidth="xl">
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
                    options={list?.map((el) => el.name)}
                    autoComplete={true}
                    onInputChange={(e, value) => handleSearchInput(value)}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label={labels?.searchBar}
                            variant="filled"
                            InputLabelProps={{
                                color: "secondary"
                            }}
                            fullWidth={true}
                            size="small"
                            value={searchValue}

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

            <Container component="main" maxWidth="xl" sx={{
                marginTop: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>{
                    loading && <>
                        <CircularProgress color='secondary' />
                        <Typography
                            color='secondary'
                            sx={{ mt: 2 }}
                            component="h1"
                            variant="button"
                        >Carregando</Typography>
                    </>
                }
                {option === 'disciplina'
                    ? <DisciplineList repository={repositoryFiltered.discipline} />
                    : option === 'instrutor'
                        ? <TeacherList repository={repositoryFiltered.teacher} />
                        : option === 'adicionar' &&
                        <AddTest />
                }
            </Container >
        </Container>
    );
}


