import { useNavigate, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import type { Person, FullPerson } from "@models";
import { useState, useEffect } from "react";
import { Modal, Row, Col, Placeholder } from "react-bootstrap";

function PersonModal() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { peopleList } = useOutletContext<{ peopleList: Person[] }>();
  const person = peopleList.find((p) => p.id === Number(id));

  const [loading, setLoading] = useState(true);
  const [fullPerson, setFullPerson] = useState<FullPerson | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchUser() {
      try {
        setLoading(true);
        setFullPerson(null);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await fetch(
          `https://randomuser.me/api/?seed=${person?.seed}`,
        );
        const data = await response.json();
        if (cancelled) return;
        setFullPerson({
          ...person!,
          name: `${data.results[0].name.first} ${data.results[0].name.last}`,
          email: data.results[0].email,
          phone: data.results[0].phone,
          country: data.results[0].location.country,
          age: data.results[0].dob.age,
        });
      } catch (error) {
        console.error("Error fetching: " + error);
      } finally {
        if (cancelled) setLoading(false);
      }
    }
    fetchUser();

    return () => {
      cancelled = true;
    };
  }, [person]);

  const handleClose = () => {
    navigate("/people");
  };

  return (
    <Modal show={true} onHide={handleClose} centered>
      {loading ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title as="div" style={{ width: "100%" }}>
              <Placeholder animation="glow">
                <Placeholder as="h4" xs={6} />
              </Placeholder>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={12} md={4}>
                <Placeholder as="div" animation="glow">
                  <Placeholder
                    as="img"
                    style={{ height: "128px", width: "128px" }}
                  ></Placeholder>
                </Placeholder>
              </Col>
              <Col sm={12} md={8}>
                <Placeholder as="p" animation="glow">
                  <Placeholder as="span" xs={3} />{" "}
                  <Placeholder as="span" xs={4} />
                  <br />
                  <Placeholder as="span" xs={3} />{" "}
                  <Placeholder as="span" xs={3} />
                  <br />
                  <Placeholder as="span" xs={2} />{" "}
                  <Placeholder as="span" xs={1} />
                  <br />
                  <Placeholder as="span" xs={4} />{" "}
                  <Placeholder as="span" xs={3} />
                </Placeholder>
              </Col>
            </Row>
          </Modal.Body>
        </>
      ) : fullPerson ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{fullPerson?.name || "Person Details"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={12} md={4}>
                <img src={fullPerson.profilePic} alt={fullPerson.name} />
              </Col>
              <Col sm={12} md={8}>
                <p>
                  <strong>Email:</strong> {fullPerson.email}
                  <br />
                  <strong>Phone:</strong> {fullPerson.phone}
                  <br />
                  <strong>Age:</strong> {fullPerson.age}
                  <br />
                  <strong>Country:</strong> {fullPerson.country}
                </p>
              </Col>
            </Row>
          </Modal.Body>
        </>
      ) : (
        <p> PERSON NOT FOUND </p>
      )}
    </Modal>
  );
}

export default PersonModal;
