"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import styles from './css/page.module.css';
import loadingStyles from './css/loading.module.css';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const userId = Cookies.get('user_id');
      if (userId) {
         // setIsAuthenticated(true);
      }
      setIsLoading(false);
    }, 5000);
  }, []);

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
              Login Page
            </div>
          </main>
        )
      )}
    </>
  );
}