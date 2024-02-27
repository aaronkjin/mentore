"use client";

import { useState, useRef, ChangeEvent, FormEvent } from "react";

import styles from "../styles/Home.module.css";
import SearchForm from "../components/SearchForm";
import ChatDisplay from "@/components/ChatDisplay";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fetchData = async () => {
      const endpoint = "http://54.218.124.218:5000/query";
      const payload = { message: query };

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setResults(data.message);
        console.log("Response data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
      <h1 className={styles.title}>Unlock Potential Together</h1>
      <SearchForm
        query={query}
        onQueryChange={handleTextChange}
        onSearchSubmit={handleSearch}
      />

      {results && <ChatDisplay message={results} />}
    </div>
  );
}
