import "./App.css";
import logo from "./assets/react.svg";
import { useState, useEffect, useRef } from "react";

type Person = {
  id: number;
  name: string;
  age: number;
  fav: boolean;
  profilePic?: string;
};

function Header({ title }: { title: string }) {
  return (
    <h1>
      {" "}
      {title} <img src={logo} alt="logo" className="logo" />{" "}
    </h1>
  );
}

function Footer({ techList }: { techList: string[] }) {
  return (
    <>
      <p>Copyright Bobby Chan {new Date().getFullYear()}</p>
      <div className="tech-used">
        <ul className="tech-list">
          {techList.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

function PersonCard({
  person,
  toggleFav,
}: {
  person: Person;
  toggleFav: (id: number) => void;
}) {
  return (
    <>
      Name: {person.name} <br />
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
      <hr />
    </>
  );
}

function useFetchRandomUser(trigger: number) {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const nextIdRef = useRef(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (trigger === 0) return;

    async function fetchRandomUser() {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();
        const seed = data.info.seed;
        const name = data.results[0].name.first;
        const profilePic = data.results[0].picture.large;
        const age = data.results[0].dob.age;

        setPeopleList((prev) => [
          ...prev,
          {
            id: nextIdRef.current++,
            name,
            profilePic,
            seed,
            age,
            fav: false,
          },
        ]);
      } catch (error) {
        console.log(`${error}`);
      } finally {
        setLoading(false);
      }
    }
    fetchRandomUser();
  }, [trigger]);
  return { peopleList, loading, setPeopleList };
}

function Main() {
  /*const people: Person[] = [
    { id: 1, name: "Alice", age: 30, fav: false },
    { id: 2, name: "Bobby", age: 44, fav: false },
    { id: 3, name: "Carol", age: 35, fav: false },
    { id: 4, name: "David", age: 55, fav: false },
    { id: 5, name: "Eldon", age: 65, fav: false },
  ];*/
  const [numPeople, setNumPeople] = useState(0);
  const { peopleList, loading, setPeopleList } = useFetchRandomUser(numPeople);
  /*const [peopleList, setPeopleList] = useState(people);
  const nextIdRef = useRef(people.length);
  
  useEffect(() => {
    if (numPeople > people.length) {
      setNumPeople(people.length);
      nextIdRef.current++;
      console.log(`next ID: ${nextIdRef.current}`);
    }
  }, [numPeople]);
*/
  const toggleFav = (id: number) => {
    setPeopleList((prev) =>
      prev.map((person) =>
        person.id === id ? { ...person, fav: !person.fav } : person,
      ),
    );
  };
  const loadingPerson: Person = {
    name: "Loading...",
    age: -1,
    fav: false,
    id: -1,
  };
  return (
    <>
      <div className="people-list">
        {peopleList.slice(0, numPeople).map((person) => (
          <PersonCard key={person.id} person={person} toggleFav={toggleFav} />
        ))}
        {loading && <PersonCard person={loadingPerson} toggleFav={toggleFav} />}
      </div>
      <p>{numPeople}</p>
      <button onClick={() => setNumPeople((prev) => prev + 1)}>
        Load Random Person
      </button>
    </>
  );
}

function App() {
  const title = "Random People App";
  const techList = ["React", "TypeScript", "Vite"];
  return (
    <>
      <Header title={title} />
      <Main />
      <Footer techList={techList} />
    </>
  );
}

export default App;
