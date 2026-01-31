import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

const FaceExpressionDetector = () => {
  const videoRef = useRef(null);
  const [expression, setExpression] = useState("Not detected");

  useEffect(() => {
    startVideo();
    loadModels();
  }, []);

  const startVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  const loadModels = async () => {
    const MODEL_URL = "/models";
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);
    console.log("Models loaded");
  };

  // 👇 Detect expression when button is clicked
  const detectExpression = async () => {
    if (!videoRef.current) return;

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
      console.log("Detected Expression:", maxExpression);
      console.log("All Probabilities:", expressions);
    } else {
      console.log("No face detected");
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted width="400" />
      <br />
      <button onClick={detectExpression}>
        Detect Expression
      </button>
      <h2>Expression: {expression}</h2>
    </div>
  );
};

export default FaceExpressionDetector;
