import "./App.css";

const title = "Random People App";
const techList = ["React", "TypeScript", "Vite"];
type Person = {
  id: number;
  name: string;
  age: number;
};
const people = [
  { id: 1, name: "Alice", age: 30 },
  { id: 2, name: "Bobby", age: 44 },
  { id: 3, name: "Carol", age: 35 },
];

function Header({ title }: { title: string }) {
  return <h1> {title} </h1>;
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

function Main({ peopleList }: { peopleList: Person[] }) {
  return (
    <>
      <ul className="people-list">
        {peopleList.map((person) => (
          <li key={person.id}>
            {person.name} - {person.age} years old
          </li>
        ))}
      </ul>
      <hr />
    </>
  );
}

function App() {
  return (
    <>
      <Header title={title} />
      <Main peopleList={people} />
      <Footer techList={techList} />
    </>
  );
}

export default App;
