import React, { useState, useEffect, useRef } from 'react';

import './Visualiser.scss';


const AudioVisualizer = ({ audioFeatures }) => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);

  const sourceRef = useRef(null);
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    const initializeAudioContext = async () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.AudioContext)();
      }

      try {
        const audioUrl = audioFeatures.preview_url;
        audioRef.current.src = audioUrl;
        await audioRef.current.play();
        setIsPlaying(true);

        sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
        analyserRef.current = audioContextRef.current.createAnalyser();
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);

        drawVisualizer();
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    };

    if (audioFeatures) {
      initializeAudioContext();
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [audioFeatures]);

  const drawVisualizer = () => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const draw = () => {
      requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = 'rgb(24, 24, 24)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 255, 0)';

      canvasCtx.beginPath();

      const sliceWidth = WIDTH * 1.0 / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * HEIGHT / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    };

    draw();
  };

  const stopAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width="640" height="480" />
      {audioFeatures && (
        <div>
          <h3>Audio Features</h3>
          <ul>
            <li>Danceability: {audioFeatures.danceability}</li>
            <li>Energy: {audioFeatures.energy}</li>
            <li>Tempo: {audioFeatures.tempo}</li>
            <li>Valence: {audioFeatures.valence}</li>
            <li>Loudness: {audioFeatures.loudness}</li>
            <li>Acousticness: {audioFeatures.acousticness}</li>
            <li>Instrumentalness: {audioFeatures.instrumentalness}</li>
          </ul>
          <button onClick={stopAudio}>Stop</button>
        </div>
      )}
    </div>
  );
};

export default AudioVisualizer;