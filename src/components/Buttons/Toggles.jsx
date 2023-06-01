import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';

export default function ColorToggleButton() {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
    sx={{ m: 1}}
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      
    >
      <ToggleButton  value="list"><FormatListBulletedOutlinedIcon/></ToggleButton>
      <ToggleButton value="Widget"><SpeedOutlinedIcon/></ToggleButton>
      <ToggleButton value="Board"><SpaceDashboardOutlinedIcon/></ToggleButton>
    </ToggleButtonGroup>
  );
}