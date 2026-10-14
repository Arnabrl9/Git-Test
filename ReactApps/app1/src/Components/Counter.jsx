import { useState } from "react";

function Counter() {
  const [hitCount, setHitCount] = useState(0);

  const handleHit = () => {
    setHitCount(hitCount + 1);
  };

  return (
    <div>
      <h2>Counter Component</h2>
      <h3>Hit Count: {hitCount}</h3>

      <button onClick={handleHit}>
        Hit Me
      </button>
    </div>
  );
}

export default Counter;