import Container from '@mui/material/Container';
import TopMenu from '../../Components/TopMenu';
import { useState, useEffect } from 'react';
import { DisciplineList } from "../../Components/List/DisciplineList/DisciplineList"
import { TeacherList } from '../../Components/List/TeacherList/TeacherList';
import * as services from "../../Services/services"
import useAuth from '../../Hooks/useAuth';


export default function Home() {

    const { user } = useAuth()
    const [option, setOption] = useState('disciplina');
    const [repository, setRepository] = useState({
        discipline: [],
        teacher: []
    })

    function handleChange(newOption) {
        setOption(newOption);
    };


    async function getItens() {
        try {
            const disciplines = await services.fetchDisciplineData(user)
            const teachers = await services.feachTeachersData(user)
            setRepository({
                disciplines,
                teachers
            })
        }
        catch {
            console.log(console.error)
        }
    }

    useEffect(() => {
        getItens()
    }, []);


    return (

        <Container component="main" maxWidth="xl">
            <TopMenu option={option}
                handleChange={handleChange} />
            <Container component="main" maxWidth="xl" sx={{
                marginTop: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                {option === 'disciplina'
                    ? <DisciplineList repository={repository.discipline} />
                    : option === 'instrutor'
                        ? <TeacherList repository={repository.teacher} />
                        : "<></>"
                }
            </Container >
        </Container>
    );
}


