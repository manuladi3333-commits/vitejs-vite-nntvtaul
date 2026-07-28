// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DevTest from "./devTest";

const page = { padding: 24, fontFamily: "system-ui" };

function Home() {
  return (
      <div style={page}>
            <h1>Lumina Romance</h1>
                  <ul>
                          <li><Link to="/vault">Vault</Link></li>
                                  <li><Link to="/canvas">Canvas</Link></li>
                                          <li><Link to="/flipbook">Flipbook</Link></li>
                                                  {/* TEMPORARY — remove with devTest.jsx */}
                                                          <li><Link to="/devtest">DevTest</Link></li>
                                                                </ul>
                                                                    </div>
                                                                      );
                                                                      }

                                                                      function Vault() {
                                                                        return <h1 style={page}>Vault</h1>;
                                                                        }

                                                                        function Canvas() {
                                                                          return <h1 style={page}>Canvas</h1>;
                                                                          }

                                                                          function Flipbook() {
                                                                            return <h1 style={page}>Flipbook</h1>;
                                                                            }

                                                                            function NotFound() {
                                                                              return (
                                                                                  <div style={page}>
                                                                                        <h1>Page Not Found</h1>
                                                                                              <Link to="/">Back to Home</Link>
                                                                                                  </div>
                                                                                                    );
                                                                                                    }

                                                                                                    export default function App() {
                                                                                                      return (
                                                                                                          <BrowserRouter>
                                                                                                                <Routes>
                                                                                                                        <Route path="/" element={<Home />} />
                                                                                                                                <Route path="/vault" element={<Vault />} />
                                                                                                                                        <Route path="/canvas" element={<Canvas />} />
                                                                                                                                                <Route path="/flipbook" element={<Flipbook />} />
                                                                                                                                                        {/* TEMPORARY — remove this route with devTest.jsx */}
                                                                                                                                                                <Route path="/devtest" element={<DevTest />} />
                                                                                                                                                                        <Route path="*" element={<NotFound />} />
                                                                                                                                                                              </Routes>
                                                                                                                                                                                  </BrowserRouter>
                                                                                                                                                                                    );
                                                                                                                                                                                    }