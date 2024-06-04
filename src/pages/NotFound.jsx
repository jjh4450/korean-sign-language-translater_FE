import { Link } from 'react-router-dom';
import DynamicLottie from '../componets/DynamicLottie';
import animationData from '../assets/notfound404.json';

function NotFound() {

    return (
        <section className="text-gray-600 body-font">
            <DynamicLottie 
                animationData={animationData}
                widthRatio={0.3}
                heightRatio={0.4}
            />
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-center mx-auto">
                    <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900 text-center sm:text-left">존재하지 않는 페이지 입니다! (404)</h1>
                    <Link to="/">
                        <button className="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0">홈으로 돌아가기</button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default NotFound;
