"use client";

import { useState, useRef, ChangeEvent, FormEvent } from "react";

import styles from "../styles/Home.module.css";

import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import SignInFooter from "../components/SignInFooter";

export default function Home() {
  const [query, setQuery] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");

    const fetchData = async () => {
      const endpoint = "http://54.218.124.218:5000/query";
      const payload = {
        message: query,
      };

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
        console.log("Response data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
      <Header />
      <h1 className={styles.title}>Unlock Potential Together</h1>
      <SearchForm
        query={query}
        onQueryChange={handleTextChange}
        onSearchSubmit={handleSearch}
      />
      <SignInFooter />
    </div>
  );
}
