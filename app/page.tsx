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

    const fetchData = async () => {
      const endpoint = "http://172.31.31.60:5000/query"; // Replace with your actual backend URL
      const payload = {
        message: query,
      };

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // If you have any authentication token, add it to the headers
            // 'Authorization': 'Bearer YOUR_TOKEN_HERE'
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response data:", data);
        // Handle the response data as needed
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors as needed
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
