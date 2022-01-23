import { useEffect, useState } from "react";
// import logo from "./logo.svg";
import logo from "./logo.png";
import "./App.css";
import Hammer from "hammerjs";

function App() {
  const [count, setCount] = useState(0);
  const [size, setSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [scale, setScale] = useState(1);

  const onLoad = () => {
    const img = document.getElementById("pinchable");
    if (!img) return;
    const orgSize = { width: img.offsetWidth, height: img.offsetHeight };

    const hammertime = new Hammer.Manager(img);
    const pinch = new Hammer.Pinch();
    hammertime.add([pinch]);

    let startSize: {
      width: number;
      height: number;
    };
    hammertime.on("pinchstart", (ev) => {
      console.log("----- pinchstart -----");
      startSize = { width: img.offsetWidth, height: img.offsetHeight };
      setSize({ width: img.offsetWidth, height: img.offsetHeight });
    });
    hammertime.on("pinch", (ev) => {
      const { scale } = ev;
      const _scaledWidth = startSize.width * scale;
      const _scaledHeight = startSize.height * scale;

      const scaledWidth =
        _scaledWidth > orgSize.width * 2
          ? orgSize.width * 2
          : _scaledWidth < orgSize.width
          ? orgSize.width
          : _scaledWidth;
      const scaledHeight =
        _scaledHeight > orgSize.height * 2
          ? orgSize.height * 2
          : _scaledHeight < orgSize.height
          ? orgSize.height
          : _scaledHeight;

      console.log("startSize: " + JSON.stringify(startSize));
      setSize({
        width: Math.round(scaledWidth),
        height: Math.round(scaledHeight),
      });
    });
    hammertime.on("pinchend", (ev) => {
      console.log("----- pinchend -----");
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div
          id="pinchable"
          style={{
            background: "#fff",
            textAlign: "center",
          }}
        >
          <img
            {...(size && { ...size })}
            src={logo}
            // className="App-logo"
            alt="logo"
            onLoad={onLoad}
          />
        </div>
        <p>{"size: " + JSON.stringify(size)}</p>
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
