import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import LoginModal from './loginModal';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
 const GetModal=()=> {
    const [show, setShow] = useState(false);
    const history = useHistory();
    const handleShow  = () => setShow(true);
    const isLogin = useSelector((state) => state.login.accessToken);
    return (
      <>
       {isLogin == "" ? <Button onClick={handleShow }>Login</Button> : <Button onClick={handleShow }>Logout</Button>}
       <LoginModal history={history}
        show={show}
        onHide={() => setShow(false)}
      />
      </>
    );
  }

  export default GetModal;
