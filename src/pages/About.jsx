import React, { useEffect, useRef, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import subtitle_motion from '@assets/subtitle_motion.lottie';
import buildweb from '@assets/buildweb.lottie';
import service_motion from '@assets/service_motion.lottie';
import use_motion from '@assets/use_motion.lottie';

Chart.register(ArcElement, Tooltip, Legend, Title);

function About() {
  const titleRefs = useRef([]);
  const chartRefs = useRef([]);
  const [legalChartKey, setLegalChartKey] = useState(0);
  const [workplaceChartKey, setWorkplaceChartKey] = useState(0);

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
          } else {
            entry.target.classList.remove('fade-in-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const chartObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            if (entry.target.dataset.chart === 'legal') {
              setLegalChartKey(prevKey => prevKey + 1);
            } else if (entry.target.dataset.chart === 'workplace') {
              setWorkplaceChartKey(prevKey => prevKey + 1);
            }
          } else {
            entry.target.classList.remove('fade-in-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    titleRefs.current.forEach(ref => {
      if (ref) titleObserver.observe(ref);
    });

    chartRefs.current.forEach(ref => {
      if (ref) chartObserver.observe(ref);
    });

    return () => {
      titleRefs.current.forEach(ref => {
        if (ref) titleObserver.unobserve(ref);
      });
      chartRefs.current.forEach(ref => {
        if (ref) chartObserver.unobserve(ref);
      });
    };
  }, []);

  const pieColors = ['#FF6384', '#36A2EB', '#FFCE56'];
  const hoverPieColors = ['#FF4500', '#1E90FF', '#FFD700'];

  const legalCommunicationData = {
    labels: ['수어', '구화', '기타'],
    datasets: [
      {
        data: [66, 22, 100-66-22],
        backgroundColor: pieColors,
        hoverBackgroundColor: hoverPieColors,
      },
    ],
  };

  const workplaceCommunicationData = {
    labels: ['수어', '구화', '기타'],
    datasets: [
      {
        data: [55, 27, 100-55-27],
        backgroundColor: pieColors,
        hoverBackgroundColor: hoverPieColors,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto lg:px-20 lg:w-4/5">
        <div className="flex flex-col text-center w-full mb-20">
          <div className="w-full md:w-1/2 mx-auto mb-8">
            <DotLottieReact
              src={subtitle_motion}
              autoplay
              loop
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <h1 ref={el => titleRefs.current[0] = el} className="fade-in mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            자막이면 전부 아닌가요?
          </h1>
          <p className="mx-auto text-gray-500 lg:w-2/3 mb-8">
            그렇지 않습니다. 법무 관련 관공서에서 원하는 의사소통 방법, 직장에서 사용하길 원하는 의사소통 방법에 대해 조사한 자료에 따르면 각각 66%와 55%의 사람들이 수어를 원한다고 합니다.
          </p>
        </div>

        <div className="flex flex-wrap mb-20">
          <div className="lg:w-1/2 w-full flex flex-col justify-center items-center text-center mb-8 lg:mb-0">
            <h2 className="text-2xl font-bold mb-4">법무 관련 관공서 의사소통 방법</h2>
            <div ref={el => chartRefs.current[0] = el} data-chart="legal">
              <Pie 
                key={`legal-${legalChartKey}`} 
                data={legalCommunicationData} 
                options={{ 
                  ...chartOptions, 
                  plugins: { 
                    ...chartOptions.plugins, 
                    title: { display: false } 
                  } 
                }} 
              />
            </div>
          </div>
          <div className="lg:w-1/2 w-full flex flex-col justify-center items-center text-center mb-8 lg:mb-0">
            <h2 className="text-2xl font-bold mb-4">직장 내 의사소통 방법</h2>
            <div ref={el => chartRefs.current[1] = el} data-chart="workplace">
              <Pie 
                key={`workplace-${workplaceChartKey}`} 
                data={workplaceCommunicationData} 
                options={{ 
                  ...chartOptions, 
                  plugins: { 
                    ...chartOptions.plugins, 
                    title: { display: false } 
                  } 
                }} 
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap mb-20">
          <div className="lg:w-1/2 w-full flex flex-col justify-center mb-8 lg:mb-0">
            <DotLottieReact
              src={service_motion}
              autoplay
              loop
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div className="lg:w-1/2 w-full flex flex-col justify-center px-4 lg:px-8">
            <h1 ref={el => titleRefs.current[1] = el} className="fade-in text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              이런 서비스는 이미 있지 않나요?
            </h1>
            <p className="text-gray-500 mt-4">
              불행히도 많이 미비한 편입니다. 다양한 기존 사례를 조사한 결과, 지문자를 기반으로 하는 서비스가 주로 제공되었습니다. 하지만 지문자는 수어의 특징을 표기하는 것이 아닌 단어를 표기하는 방법입니다. 그렇기 때문에 수어를 이해하는 데 어려움이 있습니다. 또한, 음성 인식을 통한 실시간 번역 서비스를 제공하는 시스템은 없었습니다. 그래서 기존 번역기처럼 음성을 입력받아 번역하는 서비스를 구현하게 되었습니다.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap mb-20">
          <div className="lg:w-1/2 w-full flex flex-col justify-center px-4 lg:px-8 mb-8 lg:mb-0">
            <h1 ref={el => titleRefs.current[2] = el} className="fade-in text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              지문자?
            </h1>
            <p className="text-gray-500 mt-4">
              지문자란 수어를 표기하는 방법 중 하나입니다. 지문자는 각 수어의 특징을 표기하는 것이 아닌 단어를 표기하는 방법으로, 수어의 의미를 단어로 표기하는 것입니다. 예를 들어, '가나다'를 'ㄱ ㅏ ㄴ ㅏ ㄷ ㅏ'로 표기하는 것과 같습니다. 이는 매우 비효율적이며, 수어의 특징을 표기하지 않기 때문에 수어를 이해하는 데 어려움이 있습니다. O-LANGE는 이러한 지문자를 사용하지 않고, 형태소를 기반으로 하는 수어 표기법을 시범적으로 구현했습니다. 비록 미비한 부분이 많지만, 이러한 시도가 더 많이 이루어지길 바랍니다.
            </p>
          </div>
          <div className="lg:w-1/2 w-full flex flex-col justify-center">
            <img src={"/ji_munja.webp"} alt='지문자' className="mx-auto" style={{ maxWidth: '80%', height: 'auto' }} />
          </div>
        </div>

        <div className="flex flex-wrap mb-20">
          <div className="lg:w-1/2 w-full flex flex-col justify-center px-4 lg:px-8 mb-8 lg:mb-0">
            <h1 ref={el => titleRefs.current[3] = el} className="fade-in text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              어떻게 사용하나요?
            </h1>
            <p className="text-gray-500 mt-4">
              O-LANGE는 두 가지 방법으로 사용할 수 있습니다. 첫 번째는 음성을 입력받아 번역하는 방법입니다. 이 방법은 음성을 입력받아 번역된 수어를 보여줍니다. 두 번째는 텍스트를 입력받아 번역하는 방법입니다. 이 방법은 텍스트를 입력받아 번역된 수어를 보여줍니다. 두 가지 방법 모두 서로 다른 방식으로 사용할 수 있습니다.
            </p>
          </div>
          <div className="lg:w-1/2 w-full flex flex-col justify-center">
            <DotLottieReact
              src={use_motion}
              autoplay
              loop
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>        

        <div className="flex flex-wrap mb-20">
          <div className="lg:w-1/2 w-full flex flex-col justify-center mb-8 lg:mb-0">
            <DotLottieReact
              src={buildweb}
              autoplay
              loop
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div className="lg:w-1/2 w-full flex flex-col justify-center px-4 lg:px-8">
            <h1 ref={el => titleRefs.current[4] = el} className="fade-in text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              어떻게 구현되었나요?
            </h1>
            <p className="text-gray-500 mt-4">
            O-LANGE는 2021년 제 6회 전국 고등학교 동아리 소프트웨어(SW) 경진대회에 출품한 작품을 기반으로 제작되었습니다. 당시에는 파이썬 애플리케이션을 이용해 PySide 기반으로 제작되었으며, 조회 방식도 비효율적으로 구현되어 이용과 접근성에 한계가 있었습니다. 이를 개선하기 위해 웹 기반으로 구현하였습니다. 처음에는 간단히 정적 웹사이트로 구현하였으나, 접근성을 개선하기 위해 동적인 웹사이트 구현이 필요했습니다. 그래서 React와 Tailwind CSS를 사용하여 사이트를 구성하게 되었습니다. 이전에는 파이썬 애플리케이션을 이용해 구현했던 음성 인식 기능을 웹에서도 구현하기 위해 webkitSpeechRecognition을 사용하여 음성 인식을 구현했습니다. 백엔드의 경우, 많은 의존성이 필요했기 때문에 FastAPI 기반의 웹소켓을 사용하여 구현했습니다. 이를 통해 웹에서 음성을 입력받아 번역된 수어를 보여줄 수 있게 되었습니다. 이 모든 소스 코드는 footer에 있는 제 깃허브에서 확인하실 수 있습니다. 2021년에 저와 함께 이 훌륭한 프로젝트를 진행해 3년 뒤 온전한 서비스로 구현할 초석을 다져준 최재경, 위재현, 박상현, 정윤호 학생에게 감사의 말씀을 드립니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
