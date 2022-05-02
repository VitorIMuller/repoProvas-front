
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { TermItem } from '../TermItem/TermItem';
import { DisciplineItem } from '../DisciplineItem/DisciplineItem';
import { CategoryItem } from '../CategoryItem/CategoryItem';
import { TestItem } from '../TestItem/TestItem';

export function DisciplineList({ repository }) {
  console.log(repository)
  return (
    <List
      sx={{ width: '100%', maxWidth: "none", bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {repository.map((el, id) =>
        <TermItem
          key={`term_${id}`}
          name={el.termNumber}
        >
          {el.disciplines.map((el, id) =>
            <DisciplineItem
              key={`discipline_${id}`}
              name={el.disciplineName}
            >
              {el.categories.map((el, id) =>
                <CategoryItem
                  key={`category_${id}`}
                  name={el.categoryName}
                >
                  {el.tests.map((el, id) =>
                    <TestItem
                      key={`test_${id}`}
                      name={el.testName}
                      url={el.testPDFUrl}
                      teacher={el.teacherName}
                      id={el.testId}
                      views={el.testViews}
                    />)}
                </CategoryItem>)
              }
            </DisciplineItem>)}
        </TermItem>)
      }
      <Divider></Divider>
    </List>
  )

}