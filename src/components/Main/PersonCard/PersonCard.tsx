import type { Person } from "@models";
import styles from "./PersonCard.module.css";
import { Card, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

function PersonCard({
  person,
  toggleFav,
  handleDelete,
}: {
  person: Person;
  toggleFav: (id: number) => void;
  handleDelete: (person: Person) => void;
}) {
  return (
    <>
      <Col sm={12} md={4} lg={3} className="mb-4">
        {person.id === -1 ? (
          <div>
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            <Card>
              <Link
                to={`/people/${person.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card.Img variant="top" src={person.profilePic} />
              </Link>
              <Card.Body>
                <Card.Title>{person.name}</Card.Title>
              </Card.Body>
              <Card.Footer>
                <span
                  className="heart"
                  onClick={() => {
                    toggleFav(person.id);
                  }}
                >
                  {person.fav ? "\u{2764}\u{FE0F}" : "\u{1F90D}"}
                </span>
              </Card.Footer>
              <i
                className={`bi bi-x-circle-fill ${styles.deleteIcon}`}
                onClick={() => handleDelete(person)}
              />
            </Card>
          </>
        )}
      </Col>
      {/* <span className={styles.logo}> HELLO </span> */}
      {/* Name: {person.name} <br />
      Age: {person.age} <br />
      <img src={person.profilePic} alt="profile" /> <br />
      <span
        className="heart"
        onClick={() => {
          toggleFav(person.id);
        }}
      >
        {person.fav ? "\u{2764}\u{FE0F}" : "\u{1F90D}"}
      </span>
      <hr /> */}
    </>
  );
}

export default PersonCard;
