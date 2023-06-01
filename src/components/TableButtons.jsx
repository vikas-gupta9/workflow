import React from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import Pagination from "./Buttons/Pagination";
import ColumnSelect from "./Buttons/ColumnSelect"
import Filter from "./Buttons/Filter"
import Toggles from "./Buttons/Toggles"
import AddingRecord from "./Buttons/AddingRecord"
import Entries from "./Buttons/Entries"



const TableButtons = () => {
  return (
    <>
      <Navbar>
        <Container className="justify-content-start" >
          
            <Filter/>
            <ColumnSelect/>
            <Toggles/>
            </Container>

            <Container className="justify-content-end " >
            <AddingRecord/>
            <Entries/>
            <Pagination/>
    
</Container>
      </Navbar>
      
{/*            
            <Nav className="mt-3" >
            <Pagination>
              <Pagination.Item  active>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Ellipsis />
              <Pagination.Item>{13}</Pagination.Item>
              <Pagination.Item disabled>{14}</Pagination.Item>
            </Pagination>
</Nav>  */}
            



      
    </>
  );
};

export default TableButtons;
