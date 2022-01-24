import { FC, useEffect, useState } from "react";
import Hammer from "hammerjs";

export const Pinchable: FC<{
  render: (size: { width: number; height: number } | null) => JSX.Element;
}> = ({ render }) => {
  const [size, setSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const pinchable = document.getElementById("pinchable");
  useEffect(() => {
    if (!pinchable) return;
    const orgSize = {
      width: pinchable.offsetWidth,
      height: pinchable.offsetHeight,
    };

    const hammertime = new Hammer.Manager(pinchable);
    const pinch = new Hammer.Pinch();
    hammertime.add([pinch]);

    let startSize: {
      width: number;
      height: number;
    };
    hammertime.on("pinchstart", (ev) => {
      console.log("----- pinchstart -----");
      startSize = {
        width: pinchable.offsetWidth,
        height: pinchable.offsetHeight,
      };
      setSize({ width: pinchable.offsetWidth, height: pinchable.offsetHeight });
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

      setSize({
        width: Math.round(scaledWidth),
        height: Math.round(scaledHeight),
      });
    });
    hammertime.on("pinchend", (ev) => {
      console.log("----- pinchend -----");
    });
  }, [pinchable]);

  return (
    <div
      id="pinchable"
      style={{
        background: "#fff",
        textAlign: "center",
      }}
    >
      {render(size)}
    </div>
  );
};
