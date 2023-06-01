

import './App.css'
import TableNavigation from './components/TableNavigation'
import 'bootstrap/dist/css/bootstrap.min.css';
import TableButtons from './components/TableButtons';
import DataTable from './components/DataTable';
import DnDFlow from './workflows/DnDFlow';
import Workflow1 from './components1/Workflow/Workflow1';

function App() {

  return (
    <>
    <TableNavigation/>
    {/* <TableButtons/>
     {/* <DataTable/> */}
    {/* <DnDFlow/> */}
    <Workflow1/>
    </>
  )
}

export default App
