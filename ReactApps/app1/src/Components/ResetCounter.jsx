import { useState } from "react";

function ResetCounter() {
  const [hitCount, setHitCount] = useState(0);

  return (
    <div>
      <h2>Hit Count: {hitCount}</h2>

      <button onClick={() => setHitCount(hitCount + 1)}>
        Hit Me
      </button>

      <button onClick={() => setHitCount(0)}>
        Reset Count
      </button>
    </div>
  );
}

export default ResetCounter;