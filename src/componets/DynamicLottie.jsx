import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'react-lottie';

const DynamicLottie = ({ animationData, widthRatio = 0.5, heightRatio = 0.3 }) => {
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
    const lottieRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call to set the dimensions

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleLoad = () => {
            if (lottieRef.current) {
                const svgElement = lottieRef.current.querySelector('svg');
                if (svgElement) {
                    const svgWidth = svgElement.getAttribute('width');
                    const svgHeight = svgElement.getAttribute('height');
                    if (svgWidth && svgHeight) {
                        setOriginalDimensions({ width: parseFloat(svgWidth), height: parseFloat(svgHeight) });
                    }
                }
            }
        };

        handleLoad();
    }, [animationData]);

    const getDynamicLottieSize = () => {
        const { width: originalWidth, height: originalHeight } = originalDimensions;
        const aspectRatio = originalWidth / originalHeight;

        if (dimensions.width <= 640) {
            const width = dimensions.width;
            const height = width / aspectRatio;

            if (height > dimensions.height) {
                const adjustedHeight = dimensions.height;
                const adjustedWidth = adjustedHeight * aspectRatio;
                return { width: adjustedWidth, height: adjustedHeight };
            }

            return { width, height };
        }

        let width = dimensions.width * widthRatio;
        let height = width / aspectRatio;

        if (height > dimensions.height * heightRatio) {
            height = dimensions.height * heightRatio;
            width = height * aspectRatio;
        }

        return { width, height };
    };

    const lottieSize = getDynamicLottieSize();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div ref={lottieRef}>
            <Lottie 
                options={defaultOptions}
                height={lottieSize.height}
                width={lottieSize.width}
            />
        </div>
    );
};

export default DynamicLottie;
