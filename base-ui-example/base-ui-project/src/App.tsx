import { Button } from "@base-ui/react/button";

function App() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        style={{
          padding: "10px 20px",
          backgroundColor: "#007FFF",
          color: "white",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Hello Base UI
      </Button>
    </div>
  );
}

export default App;
