import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/NFCReader.module.css';

const NFCReader = () => {
  const [message, setMessage] = useState('Veuillez approcher votre carte NFC...');
  const [redLightOn, setRedLightOn] = useState(false);
  const [greenLightOn, setGreenLightOn] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // État pour détecter si l'appareil est mobile
  const router = useRouter();

  useEffect(() => {
    // Fonction pour détecter si l'appareil est un smartphone
    const detectMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };

    detectMobile(); // Appel initial pour détecter l'appareil

    // Ajouter un écouteur d'événement pour détecter les changements d'orientation (facultatif)
    window.addEventListener('orientationchange', detectMobile);

    return () => {
      // Nettoyage de l'écouteur d'événement lors du démontage du composant
      window.removeEventListener('orientationchange', detectMobile);
    };
  }, []);

  const readNfc = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() < 0.5; // Simulation d'une lecture aléatoire réussie ou échouée
        if (success) {
          resolve('123-456-789'); // Simuler un UID de carte NFC réussie
        } else {
          reject(new Error('Échec de la lecture NFC')); // Simuler une erreur de lecture NFC
        }
      }, 1000);
    });
  };

  const handleRead = async () => {
    try {
      const data = await readNfc();
      setMessage(`Vérification de l'UID : ${data}`);
  
      // Envoie des données au serveur (simulé)
      const response = await fetch('/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: data,
          owner: 'Jane Doe', // Remplacer par la logique pour obtenir le nom du propriétaire
        }),
      });
  
      if (response.ok) {
        // Réussite : redirection vers le dashboard
        setGreenLightOn(true); // Allumer la lumière verte
        setRedLightOn(false); // Éteindre la lumière rouge
  
        // Redirection vers le dashboard après 1 seconde (simulé pour démonstration)
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        // Erreur lors de l'enregistrement des données
        setMessage('Error de la sauvegarde des données...');
        setRedLightOn(true); // Allumer la lumière rouge
        setGreenLightOn(false); // Éteindre la lumière verte
      }
    } catch (error) {
      // Erreur lors de la lecture NFC
      setMessage(`Erreur : ${error.message}`);
      setRedLightOn(true); // Allumer la lumière rouge
      setGreenLightOn(false); // Éteindre la lumière verte
    }
  };

  const handleBypass = () => {
    setMessage('UID : 123-456-789 - Bienvenue John!'); // Simuler l'UID de la carte

    // Allumer la lumière verte (simulé)
    setGreenLightOn(true);
    setRedLightOn(false);

    // Redirection vers le dashboard après 1 seconde (simulé pour démonstration)
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className={`${styles.container} ${isMobile ? styles.mobileContainer : ''}`}>
      <div className={styles.card}>
        <div className={styles.lights}>
          <div className={`${styles.redLight} ${redLightOn ? styles.RedlightOn : ''}`}></div>
          <div className={`${styles.greenLight} ${greenLightOn ? styles.GreenlightOn : ''}`}></div>
        </div>
        <div className={styles.rectangle}></div>
        <h1 className={styles.heading}>Lecteur NFC</h1>
        <p className={styles.message}>{message}</p>
        <button className={styles.button} onClick={handleRead}>Lire NFC</button>
        <button className={`${styles.button} ${styles.bypassButton}`} onClick={handleBypass}>Bypass</button>
      </div>
    </div>
  );
};

export default NFCReader;
