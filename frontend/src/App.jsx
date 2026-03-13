import React from "react";
import { IKContext } from "imagekitio-react";
import FaceExpressionDetector from "./components/FacialExpression"; // Use our fully integrated component

const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT || "YOUR_IMAGEKIT_URL_ENDPOINT";
const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY || "YOUR_IMAGEKIT_PUBLIC_KEY";

const authenticator = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/imagekit/auth");
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }
        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

function App() {
    return (
        <IKContext
            urlEndpoint={urlEndpoint}
            publicKey={publicKey}
            authenticator={authenticator}
        >
            <FaceExpressionDetector />
        </IKContext>
    );
}

export default App;