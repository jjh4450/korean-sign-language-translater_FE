import { Link } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import notfound404 from '@assets/notfound404.lottie';

/**
 * NotFound 컴포넌트는 존재하지 않는 페이지를 나타내는 컴포넌트입니다.
 * 
 * @returns {JSX.Element} 존재하지 않는 페이지를 나타내는 JSX 요소
 */
function NotFound() {
    return (
        <section className="text-gray-600 body-font flex flex-col justify-center ">
            <div className='lg:w-2/5 md:w-1/2 mx-auto'>
                <DotLottieReact
                    src={notfound404}
                    loop
                    autoplay
                />
            </div>
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
