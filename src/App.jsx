import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Vault() {
  return <h2>Vault Page</h2>;
  }

  function Canvas() {
    return <h2>Canvas Page</h2>;
    }

    function Flipbook() {
      return <h2>Flipbook Page</h2>;
      }

      function NotFound() {
        return (
            <div>
                  <h2>Page Not Found</h2>
                        <Link to="/">Back to Home</Link>
                            </div>
                              );
                              }

                              function Home() {
                                return (
                                    <div>
                                          <h1>Lumina Romance</h1>
                                                <nav>
                                                        <ul style={{ display: "flex", gap: "0.5rem", listStyle: "none", padding: 0 }}>
                                                                  <li><Link to="/vault">Vault</Link></li>
                                                                            <li><Link to="/canvas">Canvas</Link></li>
                                                                                      <li><Link to="/flipbook">Flipbook</Link></li>
                                                                                              </ul>
                                                                                                    </nav>
                                                                                                        </div>
                                                                                                          );
                                                                                                          }

                                                                                                          function App() {
                                                                                                            return (
                                                                                                                <BrowserRouter>
                                                                                                                      <Routes>
                                                                                                                              <Route path="/" element={<Home />} />
                                                                                                                                      <Route path="/vault" element={<Vault />} />
                                                                                                                                              <Route path="/canvas" element={<Canvas />} />
                                                                                                                                                      <Route path="/flipbook" element={<Flipbook />} />
                                                                                                                                                              <Route path="*" element={<NotFound />} />
                                                                                                                                                                    </Routes>
                                                                                                                                                                        </BrowserRouter>
                                                                                                                                                                          );
                                                                                                                                                                        }

                                                                                                                                                                          export default App;