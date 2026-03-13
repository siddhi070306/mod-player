import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

const FaceExpressionDetector = () => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [expression, setExpression] = useState("Waiting...");
  const [isScanning, setIsScanning] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    startVideo();
    loadModels();
  }, []);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  const loadModels = async () => {
    const MODEL_URL = "/models";
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      console.log("Models loaded");
      setModelsLoaded(true);
    } catch (error) {
       console.error("Error loading models, make sure your /models folder exists locally", error);
    }
  };

  const fetchSongByMood = async (mood) => {
    try {
        const baseUrl = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/your_id";
        const sanitizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        
        const songUrl = `${sanitizedBaseUrl}/${mood}.mp3`;
        
        setCurrentSong({ 
            title: `${mood.charAt(0).toUpperCase() + mood.slice(1)} Mix`, 
            artist: "",
            audio: songUrl 
        });
    } catch (err) {
        console.error("Failed to set song:", err);
    }
  };

  const detectExpression = async () => {
    if (!videoRef.current || !modelsLoaded) return;

    setIsScanning(true);
    setExpression("Scanning...");

    setTimeout(async () => {
      const detection = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceExpressions();

      if (detection) {
        const expressions = detection.expressions;
        const maxExpression = Object.keys(expressions).reduce(
          (a, b) => (expressions[a] > expressions[b] ? a : b)
        );

        setExpression(maxExpression);
        await fetchSongByMood(maxExpression);
        
      } else {
        setExpression("Not detected");
        setCurrentSong(null);
      }
      setIsScanning(false);
    }, 1000);
  };

  return (
    <div style={{ background: '#09090b', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: '"Inter", sans-serif', color: '#f4f4f5' }}>
      <div style={{ background: '#18181b', border: '1px solid #27272a', padding: '40px', borderRadius: '16px', textAlign: 'center', width: '100%', maxWidth: '420px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '1.5rem', fontWeight: '600', letterSpacing: '-0.025em', color: '#e4e4e7' }}>Mood Radio</h2>
        
        <div style={{ marginBottom: '24px', borderRadius: '12px', overflow: 'hidden', background: '#000', position: 'relative', aspectRatio: '4/3' }}>
          <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: isScanning ? 0.5 : 1, transition: 'opacity 0.3s' }} />
        </div>

        <button
          onClick={detectExpression}
          disabled={!modelsLoaded || isScanning}
          style={{ width: '100%', padding: '14px', border: 'none', borderRadius: '12px', background: (modelsLoaded && !isScanning) ? '#ffffff' : '#3f3f46', color: (modelsLoaded && !isScanning) ? '#000000' : '#a1a1aa', fontSize: '1rem', cursor: (modelsLoaded && !isScanning) ? 'pointer' : 'not-allowed', fontWeight: '600', transition: 'all 0.2s ease', letterSpacing: '-0.01em' }}
        >
          {isScanning ? "Analyzing..." : (modelsLoaded ? "Scan & Play" : "Initializing Model...")}
        </button>

        <div style={{ marginTop: '24px', fontSize: '0.875rem', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '500' }}>
            STATUS: <span style={{ color: expression !== "Not detected" && expression !== "Waiting..." && expression !== "Scanning..." ? '#10b981' : '#e4e4e7', fontWeight: '600' }}>{expression}</span>
        </div>

        {currentSong && currentSong.audio && (
          <div style={{ marginTop: '32px', padding: '24px', background: '#09090b', borderRadius: '12px', border: '1px solid #27272a' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '4px', letterSpacing: '-0.025em', color: '#ffffff' }}>{currentSong.title}</div>
            <div style={{ fontSize: '0.875rem', color: '#a1a1aa', marginBottom: '20px' }}>{currentSong.artist}</div>
            
            <audio ref={audioRef} src={currentSong.audio} controls autoPlay style={{ width: '100%', height: '36px', outline: 'none' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceExpressionDetector;
