import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import LoginModal from './loginModal';
import { useHistory } from 'react-router';
 const GetModal=()=> {
    const [show, setShow] = useState(false);
    const history = useHistory();
    const handleShow  = () => setShow(true);
    return (
      <>
       <Button onClick={handleShow }>Login</Button>
       <LoginModal history={history}
        show={show}
        onHide={() => setShow(false)}
      />
      </>
    );
  }

  export default GetModal;
