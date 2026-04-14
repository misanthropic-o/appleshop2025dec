import { useState } from "react";
import "./MemorySelection.css";
import { useTheme } from "../contexts/ThemeContext";

function MemorySelection(props) {
  const { isDark } = useTheme();
  const [selectedMemory, setSelectedMemory] = useState(null);

  const handleMemoryClick = (memory) => {
    setSelectedMemory(memory);
    if (props.onMemorySelect) {
      props.onMemorySelect(memory);
    }
  };

  return (
    <>
      <div className={isDark ? "memory-selectio-dark" : "memory-selectio"}>
        <button
          className={isDark ? "memory-seleciton-button-dark" : "memory-seleciton-button"}
          id={props.MemorySelectionID1}
          onClick={() => handleMemoryClick(props.MemorySelectionContent1)}
          style={{
            backgroundColor: selectedMemory === props.MemorySelectionContent1 ? "#0071e3" : undefined,
            color: selectedMemory === props.MemorySelectionContent1 ? "white" : undefined,
          }}
        >
          {props.MemorySelectionContent1}
        </button>
        <button
          className={isDark ? "memory-seleciton-button-dark" : "memory-seleciton-button"}
          id={props.MemorySelectionID2}
          onClick={() => handleMemoryClick(props.MemorySelectionContent2)}
          style={{
            backgroundColor: selectedMemory === props.MemorySelectionContent2 ? "#0071e3" : undefined,
            color: selectedMemory === props.MemorySelectionContent2 ? "white" : undefined,
          }}
        >
          {props.MemorySelectionContent2}
        </button>
        <button
          className={isDark ? "memory-seleciton-button-dark" : "memory-seleciton-button"}
          id={props.MemorySelectionID3}
          onClick={() => handleMemoryClick(props.MemorySelectionContent3)}
          style={{
            backgroundColor: selectedMemory === props.MemorySelectionContent3 ? "#0071e3" : undefined,
            color: selectedMemory === props.MemorySelectionContent3 ? "white" : undefined,
          }}
        >
          {props.MemorySelectionContent3}
        </button>
      </div>
    </>
  );
}

export default MemorySelection;
