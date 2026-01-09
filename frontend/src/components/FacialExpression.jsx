import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

const FaceExpressionDetector = () => {
  const videoRef = useRef();
  const [expression, setExpression] = useState("Loading...");

  useEffect(() => {
    startVideo();
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      });
  };

  const loadModels = async () => {
    const MODEL_URL = "/models";
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);
    detectExpression();
  };

  const detectExpression = () => {
    setInterval(async () => {
      if (videoRef.current) {
        const detections = await faceapi
          .detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceExpressions();

        if (detections) {
          const expressions = detections.expressions;
          const maxExpression = Object.keys(expressions).reduce(
            (a, b) => expressions[a] > expressions[b] ? a : b
          );
          setExpression(maxExpression);
        }
      }
    }, 1000);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted width="400" />
      <h2>Expression: {expression}</h2>
    </div>
  );
};

export default FaceExpressionDetector;
