import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Hammer from "hammerjs";

function App() {
  const [count, setCount] = useState(0);
  const [orgSize, setOrgSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [size, setSize] = useState<{
    width: number;
    height: number;
  } | null>(orgSize);
  const [text, setText] = useState("");

  const onLoad = () => {
    const img = document.getElementById("pinchable");
    if (!img) return;
    setText(
      "pinch: " +
        JSON.stringify({
          width: img.offsetWidth,
          height: img.offsetHeight,
        })
    );
    setOrgSize({ width: img.offsetWidth, height: img.offsetHeight });
    setSize({ width: img.offsetWidth, height: img.offsetHeight });

    const hammertime = new Hammer.Manager(img);
    const pinch = new Hammer.Pinch();
    hammertime.add([pinch]);

    hammertime.on("pinch", (ev) => {
      const imgWidth = img.offsetWidth;
      const imgHeight = img.offsetHeight;
      const scale = ev.scale;
      const scaledWidth =
        orgSize!.width >= imgWidth * scale
          ? orgSize!.width
          : orgSize!.width * 2 < imgWidth * scale
          ? imgWidth * scale
          : orgSize!.width * 2;
      const scaledHeight =
        orgSize!.height >= imgHeight * scale
          ? orgSize!.height
          : orgSize!.height * 2 < imgHeight * scale
          ? imgHeight * scale
          : orgSize!.height * 2;

      console.log(`width: ${imgWidth}`);
      console.log(`height: ${imgHeight}`);
      console.log(`current width: ${scaledWidth}`);
      console.log(`current height: ${scaledHeight}`);
      setText(
        "pinch: " +
          JSON.stringify({
            imgWidth,
            imgHeight,
            scaledWidth,
            scaledHeight,
          })
      );
      setSize({
        width: scaledWidth,
        height: scaledHeight,
      });
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
          <img src={logo} className="App-logo" alt="logo" onLoad={onLoad} />
        </div>
        <p>{JSON.stringify(size)}</p>
        <p>{text}</p>
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
