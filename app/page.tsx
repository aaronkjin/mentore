"use client";

import { useState, FormEvent, useRef, ChangeEvent } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [query, setQuery] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle the search logic or redirection
    console.log("User searched for:", query);
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>Mentore</header>
      <h1 className={styles.title}>Unlock Potential Together</h1>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <textarea
          value={query}
          onChange={handleTextChange}
          className={styles.searchInput}
          placeholder="Let's find your perfect mentor!"
          rows={1}
          style={{ height: "auto" }}
          ref={textAreaRef}
        />

        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      <footer className={styles.signInFooter}>
        <button className={styles.signInButton}>Sign In / Sign Up</button>
      </footer>
    </div>
  );
}
