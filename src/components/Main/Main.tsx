import { useState } from "react";
import useFetchRandomUser from "@hooks/useFetchRandomUser";
import type { Person } from "@models";
import PersonCard from "./PersonCard/PersonCard";
import { Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function Main({ query }: { query: string }) {
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

  const filteredPeopleList = peopleList.filter((person) =>
    person.name.toLowerCase().includes(query.toLowerCase()),
  );

  const loadingPerson: Person = {
    name: "Loading...",
    age: -1,
    fav: false,
    id: -1,
    seed: "",
  };
  return (
    <>
      <Container>
        <Row>
          {filteredPeopleList.slice(0, numPeople).map((person) => (
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

      <Outlet context={{ peopleList: filteredPeopleList }} />
    </>
  );
}

export default Main;
