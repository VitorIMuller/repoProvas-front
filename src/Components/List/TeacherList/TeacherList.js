
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { CategoryItem } from '../CategoryItem/CategoryItem';
import { TeacherItem } from '../TeacherItem/TeacherItem';
import { TestItemTeacher } from '../TestItemTeacher/TestItemTeacher';

export function TeacherList({ repository }) {
  return (
    <List
      sx={{ width: '100%', maxWidth: "none", bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {repository.map((teacher, id) =>
        <TeacherItem
          key={`teacher_${id}`}
          name={teacher.teacherName}
        >
          {teacher.categories.map((category, id) =>
            <CategoryItem key={`category_teacher_${id}`} name={category.categoryName}>
              {category.tests.map((test, id) =>
                <TestItemTeacher
                  key={`test_teacher_${id}`}
                  name={test.testName}
                  url={test.testPdfUrl}
                  discipline={test.testDisciplineName}
                  id={test.testId}
                  views={test.testViews}
                />
              )}
            </CategoryItem>)
          }
        </TeacherItem>)
      }
      <Divider></Divider>
    </List>
  )

}
