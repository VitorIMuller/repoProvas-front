export function filterDiscipline(repository, discipline) {
    return repository.map((el) => { return { ...el, disciplines: el["disciplines"].filter((el) => el.disciplineName.includes(discipline)) } }).filter((el) => el.disciplines.length !== 0)
}

export function filterTeacher(repository, teacher) {
    return repository.filter((el) => el.teacherName.includes(teacher))
}