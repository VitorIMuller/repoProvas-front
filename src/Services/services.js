import * as api from "../Services/api"


export async function fetchDisciplineData(token) {

    const categories = await api.getAllCategories(token)

    const terms = await api.getAllTerms(token)

    const teachers = await api.getAllTeachers(token)


    const data = terms.map(term => {
        return {
            termId: term.id,
            termNumber: term.number,
            disciplines: term.disciplines.map((discipline) => {
                return {
                    disciplineId: discipline.id,
                    disciplineName: discipline.name,
                    categories: categories.map((category) => {
                        return {
                            categoryId: category.id,
                            categoryName: category.name,
                            tests: category.tests.map((test) => {
                                return {
                                    testId: test.id,
                                    testName: test.name,
                                    pdfUrl: test.pdfUrl,
                                    testViews: test.views,
                                    disciplineId: test.teachersDisciplines.disciplineId,
                                    teacherName: teachers.find((teacher) => teacher.id === test.teachersDisciplines.teacherId).name,
                                }
                            }).filter((test) => test.disciplineId === discipline.id)
                        }
                    })
                }
            })
        }
    }
    )

    return data
}


export async function feachTeachersData(token) {

    const categories = await api.getAllCategories(token)

    const teachers = await api.getAllTeachers(token)

    const disciplines = await api.getAllDisciplines(token)

    const data = teachers.map(teacher => {

        const tests = teacher.teachersDisciplines.map((teachersDiscipline) => {
            return categories.reduce(function (result, category) {

                const tests = category.tests.filter((test) => test.teacherDisciplineId === teachersDiscipline.id)

                if (tests.length !== 0) {
                    const newObject = {
                        categoryId: category.id,
                        categoryName: category.name,
                        tests: tests
                    }
                    result.push(newObject)
                }
                return result
            }, [])
        }).reduce((a, b) => [...a, ...b], [])

        return {
            teacherId: teacher.id,
            teacherName: teacher.name,
            categories: categories.map((category) => {
                return {
                    categoryId: category.id,
                    categoryName: category.name,
                    tests: [...tests.filter((test) =>
                        test.categoryId === category.id).map((el) =>
                            el.tests)].reduce((a, b) =>
                                [...a, ...b], []).map((el) => {
                                    return {
                                        testName: el.name,
                                        testId: el.id,
                                        testPdfUrl: el.pdfUrl,
                                        testViews: el.views,
                                        testDisciplineId: el.teachersDisciplines.disciplineId,
                                        testDisciplineName: disciplines.find((discipline) => discipline.id === el.teachersDisciplines.disciplineId).name
                                    }
                                })
                }
            })
        }
    })

    return data
}