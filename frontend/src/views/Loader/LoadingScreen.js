import React, { useRef } from "react";
import Lottie from "lottie-react";
import foodAnim1 from "../../assets/animations/foodAnimation.json";

const LoadingScreen = () => {
    const foodAnimRef = useRef(null);

    return (
        <div className="flex items-center justify-center bg-white z-50">
            <div className="h-full w-full max-w-[400px] max-h-[400px] my-28">
                <Lottie
                    lottieRef={foodAnimRef}
                    animationData={foodAnim1}
                    onComplete={() => {
                        foodAnimRef.current?.stop();
                    }}
                    loop={true}
                />
            </div>
        </div>
    );
};

export default LoadingScreen;