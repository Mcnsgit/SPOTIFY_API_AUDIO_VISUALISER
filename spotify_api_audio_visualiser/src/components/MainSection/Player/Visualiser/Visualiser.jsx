import React, { useState, useEffect, useRef, useCallback } from 'react';
import Sync from './sync';
import Sketch from './sketch';

export default function Visualizer({ volumeSmoothing = 100, hidpi = true }) {
  const [sync, setSync] = useState(new Sync({ volumeSmoothing }));
  const sketchRef = useRef(null);

  const paint = useCallback(() => {
    // Add the painting logic here
  }, []);

  useEffect(() => {
    const newSketch = new Sketch({
      main: paint,
      hidpi,
    });
    sketchRef.current = newSketch;

    sync.watch('active', (val) => {
      if (val === true) {
        sketchRef.current.start();
      } else {
        sketchRef.current.stop();
      }
    });

    return () => {
      if (sketchRef.current) {
        sketchRef.current.stop();
      }
    };
  }, [sync, hidpi, paint]);

  return <div id="visualizer-container" />;
}
