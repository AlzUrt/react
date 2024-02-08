import React, { useState, useEffect } from 'react';
import Tweet from '../components/Tweet'; // Assurez-vous que le chemin d'accès est correct

function Index() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            console.log('Service Worker registered with scope: ', registration.scope);
          }, function(err) {
            console.log('Service Worker registration failed: ', err);
          });
        });
      }

    

      
    const [title, setTitle] = useState('');
    const [tweet, setTweet] = useState('');
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        // Optionnel : Charger les tweets existants depuis le serveur au démarrage
        fetchTweets();
    }, []);

    const fetchTweets = async () => {
        // Remplacez 'localhost:3001/tweets' par l'URL réelle de votre API
        const response = await fetch('http://localhost:8080/tweets');
        if (response.ok) {
            const data = await response.json();
            setTweets(data); // Mettez à jour l'état avec les tweets récupérés
        } 
    };

      
      const postTweet = async () => {
          if (!tweet || !title) return;
      
          const tweetData = {
              title: title,
              content: tweet,
              date: new Date().toISOString(),
          };

        const response = await fetch('http://localhost:8080/publish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tweetData),
        });
        if (response.ok) {
            const newTweet = await response.json();
            setTweets([newTweet, ...tweets]); // Ajouter le nouveau tweet à la liste
            setTitle(''); // Réinitialiser le titre
            setTweet(''); // Réinitialiser le contenu
        } 
};

    return (
    <div>
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Titre du Tweet"
                />
                <textarea
                    value={tweet}
                    onChange={(e) => setTweet(e.target.value)}
                    placeholder="Quoi de neuf ?"
                />
                <button onClick={postTweet}>Tweeter</button>
            </div>
            <div>
                {tweets.map((tweet) => (
                    <Tweet key={tweet.id} title={tweet.title} content={tweet.content} date={tweet.date} />
                ))}
            </div>
        </div>
    );
}

export default Index;
