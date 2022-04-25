import Container from '@mui/material/Container';
import TopMenu from '../../Components/TopMenu';
import { useState, useEffect } from 'react';
import { DisciplineList } from "../../Components/List/DisciplineList/DisciplineList"
import { TeacherList } from '../../Components/List/TeacherList/TeacherList';

import { Typography } from '@mui/material';
import * as services from "../../Services/services"
import useAuth from '../../Hooks/useAuth';
import CircularProgress from '@mui/material/CircularProgress';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


export default function Home() {

    const { user } = useAuth()
    const [option, setOption] = useState('disciplina');
    const [discipline, setDiscipline] = useState([])
    const [teacher, setTeacher] = useState([])
    const [loading, setLoading] = useState(false)



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

    const handleChange = (e, newOption) => {
        setOption(newOption)
    };


    return (

        <Container component="main" maxWidth="xl">
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
                    ? <DisciplineList repository={discipline} />
                    : option === 'instrutor'
                        ? <TeacherList repository={teacher} />
                        : "<></>"
                }
            </Container >
        </Container>
    );
}


