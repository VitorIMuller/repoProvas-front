import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function TopMenu(option, handleChange) {



    return (
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
    );

}

export default TopMenu