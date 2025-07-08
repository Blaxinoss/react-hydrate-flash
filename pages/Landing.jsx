import React, { useState, useEffect } from "react";

const Landing = () => {
  const [clicked, setClicked] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("✅ Hydration complete!");
  }, []);

  return (
    <main style={{ fontFamily: "Arial, sans-serif", padding: "2rem" }}>
      <header style={{ borderBottom: "2px solid #ccc", paddingBottom: "1rem", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "3rem", color: "#333" }}>🚀 My Awesome App</h1>
        <p style={{ color: "#777" }}>This entire page is rendered on the server first.</p>
      </header>

      <section style={{ marginBottom: "2rem" }}>
        <h2>🔥 Hero Section</h2>
        <p>Welcome to the future of SSR with React!</p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>💡 Features</h2>
        <ul>
          <li>SEO Ready</li>
          <li>Fast Initial Load</li>
          <li>Full React Power After Hydration</li>
        </ul>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>⭐ Testimonials</h2>
        <blockquote>"This site is blazing fast!" - A React Enthusiast</blockquote>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>🧪 Interactivity Test</h2>
        <button
          onClick={() => setClicked(true)}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Click me!
        </button>

        {clicked && <p style={{ marginTop: "1rem" }}>🎉 You clicked the button!</p>}

        <div style={{ marginTop: "1rem" }}>
          <button onClick={() => setCounter(counter + 1)}>➕ Increment</button>
          <span style={{ marginLeft: "1rem" }}>Count: {counter}</span>
        </div>
      </section>

      <footer style={{ borderTop: "2px solid #ccc", paddingTop: "1rem", marginTop: "2rem" }}>
        <p>Copyright © 2025</p>
      </footer>
    </main>
  );
};

export default Landing;
