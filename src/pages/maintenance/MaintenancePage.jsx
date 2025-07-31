import UnderConstructionImage from '../../assets/images/UnderConstruction.png';
import './MaintenancePage.css';
import {Grid} from '@mui/material'
function MaintenancePage() {
  return (
    <div className="App">
      <header className="App-header">
        <Grid container>
          <Grid item>
          <img src={UnderConstructionImage} className="App-logo" alt="logo" />       
          </Grid>  
        </Grid>        
      </header>
    </div>
  );
}

export default MaintenancePage;
