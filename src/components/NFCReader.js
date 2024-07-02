import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/NFCReader.module.css';

const NFCReader = () => {
  const [message, setMessage] = useState('Approchez votre carte NFC...');
  const router = useRouter();

  const readNfc = async () => {
    // Simulated NFC reading logic
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Données NFC simulées');
      }, 1000);
    });
  };

  const handleRead = async () => {
    try {
      const data = await readNfc();
      setMessage(`Data lue : ${data}`);

      // Envoie des données au serveur
      const response = await fetch('/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: data,
          owner: 'John Doe', // Remplacez par la logique pour obtenir le nom du propriétaire
        }),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        setMessage('Erreur lors de la sauvegarde des données');
      }
    } catch (error) {
      setMessage(`Erreur : ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Lecteur NFC</h1>
        <p className={styles.message}>{message}</p>
        <button className={styles.button} onClick={handleRead}>Lire NFC</button>
      </div>
    </div>
  );
};

export default NFCReader;
