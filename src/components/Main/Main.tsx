import { useState } from "react";
import useFetchRandomUser from "@hooks/useFetchRandomUser";
import type { Person } from "@models/PersonType";
import PersonCard from "./PersonCard/PersonCard";
import { Container, Row } from "react-bootstrap";

function Main() {
  const [numPeople, setNumPeople] = useState(0);
  const { peopleList, loading, setPeopleList } = useFetchRandomUser(numPeople);

  const toggleFav = (id: number) => {
    setPeopleList((prev) =>
      prev.map((person) =>
        person.id === id ? { ...person, fav: !person.fav } : person,
      ),
    );
  };

  function handleDelete(personToDelete: Person) {
    setPeopleList((prev) =>
      prev.filter((person) => person.id !== personToDelete.id),
    );
  }

  const loadingPerson: Person = {
    name: "Loading...",
    age: -1,
    fav: false,
    id: -1,
  };
  return (
    <>
      <Container>
        <Row>
          {peopleList.slice(0, numPeople).map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              toggleFav={toggleFav}
              handleDelete={handleDelete}
            />
          ))}

          {loading && (
            <PersonCard
              person={loadingPerson}
              toggleFav={toggleFav}
              handleDelete={handleDelete}
            />
          )}
        </Row>
      </Container>
      {/* <p style={{ color: "blue", fontSize: "2em" }}>{numPeople}</p> */}
      <button
        onClick={() => setNumPeople((prev) => prev + 1)}
        className="btn btn-primary"
      >
        Load Random Person
      </button>
    </>
  );
}

export default Main;
