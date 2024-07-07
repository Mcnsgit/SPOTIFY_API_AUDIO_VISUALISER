import React, { useRef, useEffect } from 'react';
import useAudioAnalysis from '../../../../hooks/useAudioAnalysis.jsx';
import './Visualiser.scss';

const Visualizer = ({ audioUrl, getAudioFeatures }) => {
  const canvasRef = useRef(null);
  const { audioFeatures, isPlaying, getAudioData, stopAudio, analyser, error } = useAudioAnalysis(audioUrl, getAudioFeatures);

  useEffect(() => {
    if (!canvasRef.current || !analyser) return;

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const draw = () => {
      requestAnimationFrame(draw);

      const dataArray = getAudioData();
      const bufferLength = dataArray.length;

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
  }, [analyser, getAudioData]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="visualizer">
      <canvas ref={canvasRef} width="640" height="480" />
      {audioFeatures && (
        <div className="audio-features">
          <h3>Audio Features</h3>
          <ul>
            {Object.entries(audioFeatures).map(([key, value]) => (
              <li key={key}>{key}: {value}</li>
            ))}
          </ul>
          {isPlaying && <button onClick={stopAudio}>Stop</button>}
        </div>
      )}
    </div>
  );
};

export default Visualizer;