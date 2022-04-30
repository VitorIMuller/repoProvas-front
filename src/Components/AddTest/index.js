import { Autocomplete, Box } from "@mui/material";
import AutoComplete from "@mui/material/Autocomplete";
import TextField from '@mui/material/TextField';
import { Divider } from "@mui/material";
import * as api from "../../Services/api"
import useAuth from '../../Hooks/useAuth';
import { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { successModal } from '../../modals/sucessModal';
import { errorModal } from "../../modals/errorModal";

export default function AddTest() {

    const { user } = useAuth()


    const [optionList, setOptionList] = useState({
        discipline: [],
        teacher: [],
        category: [],
        terms: []
    })
    const [loading, setLoading] = useState(false)

    async function fetchData() {
        const categories = await api.getAllCategories(user)
        const disciplines = await api.getAllDisciplines(user)
        const teachers = await api.getAllTeachers(user)
        const terms = await api.getAllTerms(user)

        setOptionList({
            discipline: disciplines,
            teacher: teachers,
            category: categories,
            terms: terms
        })
    }

    const [createTestForm, setCreateTestForm] = useState({
        title: "",
        pdf: "",
        category: "",
        discipline: "",
        teacher: ""
    });

    async function handleSubmit(event) {
        event.preventDefault();

        const data = {
            name: createTestForm.title,
            pdfUrl: createTestForm.pdf,
            categoryId: optionList.category.find((category) => category.name === createTestForm.category).id,
            teacherDisciplineId: optionList.teacher.find((teacher) =>
                teacher.name === createTestForm.teacher).teachersDisciplines.find((teacherDiscipline) =>
                    teacherDiscipline.disciplineId === optionList.discipline.find((discipline) =>
                        discipline.name === createTestForm.discipline).id).id

        }

        try {
            setLoading(true)

            await api.createTest(user, data)
            successModal("Prova adicionada ao repositório")
            setCreateTestForm({
                title: "",
                pdf: "",
                category: "",
                discipline: "",
                teacher: ""
            });
            setLoading(false)


        } catch (error) {
            errorModal("Algo deu errado, tente novamente mais tarde")
            setLoading(false)

        }
    }


    function handleFormInput(name, value) {

        setCreateTestForm({ ...createTestForm, [name]: value })

    }

    function handleFreeFormInput(event) {
        setCreateTestForm({ ...createTestForm, [event.target.name]: event.target.value })
    }

    function disableForm(formData) {
        return formData === ""
    }
    useEffect(() => {

        setCreateTestForm({
            ...createTestForm,
            teacher: ""
        })

    }, [createTestForm.discipline]);

    useEffect(() => {
        fetchData()
    })


    return (

        <Box
            sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >

            <Box

                component="form"
                onSubmit={handleSubmit}
                sx={{
                    marginTop: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    width: "80vw"
                }}
            >

                <TextField
                    fullWidth={true}
                    variant="filled"
                    required
                    type="text"
                    id="name"
                    label="Nome da Prova"
                    name="name"
                    InputLabelProps={{
                        color: "secondary"
                    }}
                    value={createTestForm.title}
                    onChange={handleFreeFormInput}
                />
                <TextField
                    fullWidth={true}
                    variant="filled"
                    required
                    type="url"
                    id="pdf"
                    label="PDF da Prova"
                    name="pdf"
                    InputLabelProps={{
                        color: "secondary"
                    }}
                    value={createTestForm.pdf}
                    onChange={handleFreeFormInput}
                />

                <AutoComplete
                    disablePortal
                    required
                    id="combo-box-demo"
                    options={optionList.category.map((option) => option.name)}
                    sx={{ width: '100%' }}
                    onInputChange={(e, value) => handleFormInput("category", value)}
                    renderInput={(params) => <TextField {...params} label="Categoria" />}
                />
                <AutoComplete
                    disablePortal
                    required
                    id="combo-box-demo"
                    options={optionList.discipline.map((option) => option.name)}
                    sx={{ width: '100%' }}
                    onInputChange={(e, value) => handleFormInput("discipline", value)}
                    renderInput={(params) => <TextField {...params} label="Disciplina" />}
                />
                <Autocomplete
                    fullWidth={true}
                    id="teacher-input"
                    options={createTestForm.discipline
                        ? optionList.teacher.filter((el) =>
                            el.teachersDisciplines.map((el) =>
                                el.disciplineId).includes(optionList.discipline.find((el) =>
                                    el.name === createTestForm.discipline).id)).map((el) =>
                                        el.name)
                        : ["Escolha uma disciplina primeiro"]
                    }
                    autoComplete={true}
                    disabled={disableForm(createTestForm.discipline)}
                    onInputChange={(e, value) => handleFormInput("teacher", value)}
                    value={createTestForm.teacher}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Pessoa Instrutora"
                            variant="filled"
                            InputLabelProps={{
                                color: "secondary"
                            }}
                            required
                            size="small"
                        />}
                />
                <Button sx={{ mb: 5 }}
                    color="secondary"
                    type="submit"
                    fullWidth
                    variant="contained"
                >
                    <Typography
                        component="h1"
                        variant="button"
                    >
                        {loading
                            ? "Carregando"
                            : "Adicionar"
                        }
                    </Typography>
                </Button>


            </Box>
        </Box>

    )
}

