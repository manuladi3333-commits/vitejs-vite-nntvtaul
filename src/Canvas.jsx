import { useEffect, useRef } from "react";
import * as fabric from "fabric";

export default function Canvas() {
  const canvasElRef = useRef(null);
    const fabricCanvasRef = useRef(null);

      useEffect(() => {
          const fabricCanvas = new fabric.Canvas(canvasElRef.current, {
                width: 350,
                      height: 500,
                            backgroundColor: "#ffffff",
                                });
                                    fabricCanvasRef.current = fabricCanvas;

                                        return () => {
                                              fabricCanvas.dispose();
                                                  };
                                                    }, []);

                                                      return (
                                                          <div style={{ padding: 24, fontFamily: "system-ui" }}>
                                                                <h2>Canvas</h2>
                                                                      <canvas ref={canvasElRef} />
                                                                          </div>
                                                                            );
                                                                            }