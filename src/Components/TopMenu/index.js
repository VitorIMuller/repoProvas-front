import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function TopMenu(option, handleChange) {



    return (
        <ToggleButtonGroup
            color="secondary"
            value={option}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton fullWidth={true} value="disciplina">DISCIPLINA</ToggleButton>
            <ToggleButton value="disciplina">PESSOA INSTRUTORA</ToggleButton>
            <ToggleButton value="adicionar">ADICIONAR</ToggleButton>
        </ToggleButtonGroup>
    );

}

export default TopMenu