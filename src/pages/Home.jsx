import CardList from "../components/CardList";
import FilterMenu from "../components/FilterMenu";
import SearchBar from "../components/SearchBar";

function Home() {
  return (
    <>
      <SearchBar />
      <FilterMenu />
      <CardList />
    </>
  );
}
export default Home;
