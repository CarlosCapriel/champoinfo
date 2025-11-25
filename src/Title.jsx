function Title() {
  const name = "Carlos";
  if (name) {
    return <h1>Hello, {name}!</h1>;
  }
  return <h1>Hola mundo</h1>;
}

export default Title;
