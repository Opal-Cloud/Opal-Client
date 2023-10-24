"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import styles from './css/page.module.css';
import loadingStyles from './css/loading.module.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

let ws;

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    ws = new WebSocket('ws://localhost:4000');

    ws.addEventListener('open', () => {
      console.log('Connected to the WebSocket');
    });

    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.success === false) {
        toast.error(data.message, toastOptions);
      } else if (data.email) {
        toast.success(data.message, toastOptions);
        Cookies.set('user_id', data);
        setIsAuthenticated(true);
      }
    });

    setTimeout(() => {
      const userId = Cookies.get('user_id');
      if (userId) {
        // setIsAuthenticated(true);
      }
      setIsLoading(false);
    }, 500);

    return () => {
      ws.close();
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ Type: "LOGIN", password, email }));
    }
  };

  return (
    <>
      {isLoading ? (
        <div className={loadingStyles.loadingScreen}>
          <span className={loadingStyles.loadingText}>Opal Client</span>
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </div>
      ) : (
        isAuthenticated ? (
          <div>
            Dashboard
          </div>
        ) : (
          <main className={styles.main}>
            <div>
              <form onSubmit={handleLogin}>
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Login</button>
              </form>
            </div>
          </main>
        )
      )}
      <ToastContainer />
    </>
  );
}
