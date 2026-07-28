// src/Canvas.jsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as fabric from "fabric";

const page = { padding: 24, fontFamily: "system-ui" };

export default function Canvas() {
  const canvasElRef = useRef(null);
    const fabricCanvasRef = useRef(null);
      const wrapperRef = useRef(null);
        const [status, setStatus] = useState("Initializing…");

          useEffect(() => {
              let disposed = false;
                  let canvas = null;

                      // Width from the container, height from a fixed portrait ratio.
                          const width = wrapperRef.current?.clientWidth || 320;
                              const height = Math.round(width * 1.4);

                                  try {
                                        canvas = new fabric.Canvas(canvasElRef.current, {
                                                width,
                                                        height,
                                                                backgroundColor: "#ffffff",
                                                                        isDrawingMode: true,          // makes the canvas verifiable: you can draw on it
                                                                                enableRetinaScaling: true,    // sharp on high-DPR phones
                                                                                      });

                                                                                            canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
                                                                                                  canvas.freeDrawingBrush.width = 4;
                                                                                                        canvas.freeDrawingBrush.color = "#111111";

                                                                                                              fabricCanvasRef.current = canvas;
                                                                                                                    setStatus(`Ready — ${width}×${height}. Draw with your finger.`);
                                                                                                                        } catch (err) {
                                                                                                                              setStatus(`Canvas failed: ${err.name} — ${err.message}`);
                                                                                                                                  }

                                                                                                                                      return () => {
                                                                                                                                            disposed = true;
                                                                                                                                                  fabricCanvasRef.current = null;
                                                                                                                                                        // dispose() is async in Fabric v6 — await it so a StrictMode
                                                                                                                                                              // remount cannot re-initialize the element mid-teardown.
                                                                                                                                                                    Promise.resolve(canvas?.dispose()).catch(() => {});
                                                                                                                                                                        };
                                                                                                                                                                          }, []);

                                                                                                                                                                            function clearCanvas() {
                                                                                                                                                                                const c = fabricCanvasRef.current;
                                                                                                                                                                                    if (!c) return;
                                                                                                                                                                                        c.clear();
                                                                                                                                                                                            c.backgroundColor = "#ffffff";
                                                                                                                                                                                                c.renderAll();
                                                                                                                                                                                                    setStatus("Cleared.");
                                                                                                                                                                                                      }

                                                                                                                                                                                                        return (
                                                                                                                                                                                                            <div style={page} ref={wrapperRef}>
                                                                                                                                                                                                                  <h2>Canvas</h2>
                                                                                                                                                                                                                        <button onClick={clearCanvas} style={{ padding: "12px 16px", marginBottom: 12 }}>
                                                                                                                                                                                                                                Clear
                                                                                                                                                                                                                                      </button>
                                                                                                                                                                                                                                            <div style={{ border: "1px solid #ccc", display: "inline-block", touchAction: "none" }}>
                                                                                                                                                                                                                                                    <canvas ref={canvasElRef} />
                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>{status}</pre>
                                                                                                                                                                                                                                                                      <Link to="/">Back to Home</Link>
                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                            }