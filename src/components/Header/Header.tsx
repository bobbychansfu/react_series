import logo from "@assets/react.svg";
import { Form, Row, Col } from "react-bootstrap";

function Header({
  title,
  setQuery,
}: {
  title: string;
  setQuery: (query: string) => void;
}) {
  return (
    <header>
      <h1>
        {" "}
        {title} <img src={logo} alt="logo" className="logo" />{" "}
      </h1>
      <Form.Group as={Row} controlId="searchQuery">
        <Col sm="12" md="6" className="mx-auto">
          <Form.Control
            size="lg"
            type="text"
            placeholder="Search people..."
            className="mb-3"
            onChange={(e) => setQuery(e.target.value)}
          />
        </Col>
      </Form.Group>
    </header>
  );
}

export default Header;
