import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Figure from 'react-bootstrap/Figure'
import { FiSearch } from "react-icons/fi";
import { MdAddCircleOutline } from "react-icons/md";
import { RiNotification2Line } from "react-icons/ri";
import { ImStatsBars } from "react-icons/im";


const TableNavigation = () => {
  const styles = {
   
    backgroundColor: 'orange',
   
  };
  return (
    <>
      <Navbar style={styles} variant="dark">
        <Container>
          <Nav className="me-auto">
          <Nav.Link to="/">
            <Figure.Image
        width={25}
        height={25}
        alt=""
        src="./images/pngwing.png"
      /></Nav.Link>
            <Nav.Link href="#SERACHES">SERACHES</Nav.Link>
            <Nav.Link href="#COMPANIES">COMPANIES</Nav.Link>
            <Nav.Link href="#CONTACTS">CONTACTS</Nav.Link>
          </Nav>
          
          <Nav className="ms-auto ">
            <Nav.Link href="#icon">
              <FiSearch />
            </Nav.Link>

            <Nav.Link href="#icon">
            <MdAddCircleOutline />
            </Nav.Link>

            <Nav.Link href="#icon">
            <RiNotification2Line />
            </Nav.Link>

            <Nav.Link href="#icon">
            <ImStatsBars />
            </Nav.Link>
          </Nav>

        </Container>
      </Navbar>
    </>
  );
};

export default TableNavigation;
