import React from "react";
import FaceExpressionDetector from "./components/FacialExpression";
function App() {
    const[count,setCount]=React.useState(0);
    return (<>
        <FaceExpressionDetector/>
        </>
    );
}
export default App;