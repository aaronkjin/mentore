import { ChangeEvent, FormEvent } from "react";
import styles from "../styles/Home.module.css";

interface SearchFormProps {
  query: string;
  onQueryChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSearchSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const SearchForm = ({
  query,
  onQueryChange,
  onSearchSubmit,
}: SearchFormProps) => (
  <form onSubmit={onSearchSubmit} className="mt-5 flex flex-row items-center">
    <textarea
      value={query}
      onChange={onQueryChange}
      className={styles.searchInput}
      placeholder="Let's find your perfect mentor!"
      rows={1}
      style={{ height: "auto" }}
    />
    <button type="submit" className={styles.searchButton}>
      Search
    </button>
  </form>
);

export default SearchForm;
