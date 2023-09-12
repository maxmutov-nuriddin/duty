import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { v4 } from "uuid";

import DebtCard from "../components/card/DebtCard";

const DebtsPage = () => {
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [debts, setDebts] = useState([
    { id: "0", name: "qwert", debt: 1110, phone: "2313123" },
    { id: "1", name: "qwerty", debt: 10000, phone: "13213123" },
  ]);
  const [debt, setDebt] = useState({ name: "", debt: "", phone: "" });
  const [selected, setSelected] = useState(null);

  const handleClose = () => {
    setShow(false);
    setValidated(false);
  };
  const handleShow = () => setShow(true);

  const submit = (e) => {
    const form = e.currentTarget;
    setValidated(true);
    e.preventDefault();
    if (form.checkValidity()) {
      if (selected === null) {
        setDebts([...debts, { ...debt, debt: +debt.debt, id: v4() }]);
        console.log(debt);
      } else {
        let newDebts = debts.map((el) => {
          if (el.id === selected) {
            return debt;
          }
          return el;
        });
        setDebts(newDebts);
      }
      handleClose();
    }
  };

  const handleDebt = (e) => {
    setDebt({ ...debt, [e.target.id]: e.target.value });
  };

  const editDebt = (id) => {
    handleShow();
    setSelected(id);
    let debt = debts.find((el) => el.id === id);
    setDebt(debt);
  };

  const DebtDelete = (id) => {
    let newDebts = debts.filter((el) => el.id !== id);
    console.log(newDebts);
    setDebts(newDebts);
  }

  const openDebtModal = () => {
    handleShow();
    setSelected(null);
    setDebt({ name: "", debt: "", phone: "" });
  };

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="mt-3 text-center title">All DebtsPage</h1>
        <button className="btn btn-success" onClick={openDebtModal}>
          Add
        </button>
      </div>
      {debts.map((debt) => (
        <DebtCard editDebt={editDebt} DebtDelete={DebtDelete} key={debt.id} {...debt} />
      ))}
      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={submit}>
          <Modal.Header closeButton>
            <Modal.Title>Debt data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={handleDebt}
                value={debt.name}
                required
                type="text"
                placeholder="Full name"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please fill!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                onChange={handleDebt}
                value={debt.phone}
                required
                type="text"
                placeholder="999400807"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please fill!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="debt">
              <Form.Label>Debt $</Form.Label>
              <Form.Control
                onChange={handleDebt}
                value={+debt.debt}
                required
                type="number"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please fill!
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {selected === null ? "Add" : "Save"} debt
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </section>
  );
};

export default DebtsPage;
