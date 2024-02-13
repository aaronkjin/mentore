"use client";

import { useState, FormEvent } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [query, setQuery] = useState("");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle the search logic or redirection here
    console.log("User searched for:", query);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mentore</h1>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
          placeholder="Let's find your perfect mentor!"
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
    </div>
  );
}
