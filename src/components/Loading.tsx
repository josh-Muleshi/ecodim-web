import Lottie from "lottie-react";
import loadingAnimation from "../assets/ic_loading.json";

const Loading = () => {

    return (
        <div className="min-h-screen flex flex-col">
    
            <div className="flex-grow p-6 max-w-8xl">
                <Lottie animationData={loadingAnimation} loop={true} className="w-full h-48 mx-auto" />
            </div>
                
        </div>
    )
  
};

export default Loading;