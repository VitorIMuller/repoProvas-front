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
import TopMenu from '../../Components/TopMenu';


export default function Home() {

    const { user } = useAuth()
    const [option, setOption] = useState('disciplina');
    const [discipline, setDiscipline] = useState([])
    const [teacher, setTeacher] = useState([])
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)

    const [repositoryFiltered, setRepositoryFiltered] = useState({
        discipline: [],
        teacher: []
    })



    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function getItens() {
        setLoading(true)
        await sleep(300);
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






    return (

        <Container component="main" maxWidth="xl">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <TopMenu
                    option={option}
                    setOption={setOption}
                    discipline={discipline}
                    teachers={teacher}
                    repositoryFiltered={repositoryFiltered}
                    setRepositoryFiltered={setRepositoryFiltered}
                />
            </Box>
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
                        <AddTest reloadState={reload} setReload={setReload} />
                }
            </Container >
        </Container>
    );
}


