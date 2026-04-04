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

export default Footer;
