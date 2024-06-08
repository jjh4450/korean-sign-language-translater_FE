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
        data: [66, 22, 100 - 66 - 22],
        backgroundColor: pieColors,
        hoverBackgroundColor: hoverPieColors,
      },
    ],
  };

  const workplaceCommunicationData = {
    labels: ['수어', '구화', '기타'],
    datasets: [
      {
        data: [55, 27, 100 - 55 - 27],
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
            그렇지 않습니다. 수어는 한국어와는 별개의 독립된 시각 언어입니다. 한글 자막은 한국어에 기반을 두고 있어 <strong>"불이 났어요~ ㅎㅎ", "불이 났어요!!"</strong> 등과 같이 문장 끝에 다양한 말투를 표현할 수 있지만, 이는 청각 정보에 의존하는 표현 방식으로, 선천적 청각 장애인 분들은 <strong>이를 전혀 인지할 수 없습니다.</strong> 반면 수어는 시각 정보를 통해 말투와 정서를 표현할 수 있어, 청각 장애인 분들께 자연스러운 의사소통 방식이 됩니다. 법무 관련 관공서에서 원하는 의사소통 방법, 직장에서 사용하길 원하는 의사소통 방법에 대해 조사한 자료에 따르면 <strong>각각 66%와 55%의 청각 장애인 분들이 수어를 원한다</strong>고 합니다.
            (<a href="https://kosis.kr/statHtml/statHtml.do?orgId=113&tblId=DT_113_STBL_1030157&vw_cd=MT_ZTITLE&list_id=H2_20&scrId=&seqNo=&lang_mode=ko&obj_var_id=&itm_id=&conn_path=K1&path=%25EB%25AC%25B8%25ED%2599%2594%25E3%2586%258D%25EC%2597%25AC%25EA%25B0%2580%2520%253E%2520%25ED%2595%259C%25EA%25B5%25AD%25EC%2588%2598%25EC%2596%25B4%25ED%2599%259C%25EC%259A%25A9%25EC%25A1%25B0%25EC%2582%25사%25EA%25B4%2580%25EA%25B3%25B5%25EC%2584%259C%25EB%2582%2598%2520%25EA%25B8%2588%25EC%259C%25B5%2520%25EA%25B8%25B기%25EA%25B4%2580%25EC%259D%2584%2520%25EC%259D%25B4%25EC%259A%25A9%25ED%2595%25A0%2520%25EB%2595%258C%2520%25EC%25A3%25주%25EB%25A1%259C%2520%25EC%259D%25B이%25EC%259A%25A9%25ED%2595%2598%25EB%258A%2594%2520%25EC%259D%2598%25EC%2582%25사%25소%25ED%2586%25B5%25EB%25B2%2595%2520%281%252B2%252B3%25EC%2588%259C%25EC%259C%2584%29"><u>법무 관련 관공서에서 원하는 의사소통 방법</u></a>, <a href="https://kosis.kr/statHtml/statHtml.do?orgId=113&tblId=DT_113_STBL_1030178&vw_cd=MT_ZTITLE&list_id=H2_20&scrId=&seqNo=&lang_mode=ko&obj_var_id=&itm_id=&conn_path=K1&path=%25EB%25AC%25B8%25ED%2599%2594%25E3%2586%258D%25EC%2597%25여%25EA%25B0%2580%2520%253E%2520%25ED%2595%259C%25EA%25B5%25국%25EC%2588%2598%25EC%2596%25B4%25ED%2599%259C%25EC%259A%25A9%25EC%25A1%25B0%25EC%2582%25사%25직%25EC%259E%25A5%25EC%2597%2590%25서%2520%25EC%2582%25사%25EC%259A%25A9%25ED%2595%2598%25기%25EA%25B8%25B일%2520%25EC%259B%2590%25하%25EB%258A%2594%2520%25EC%259D%2598%25사%25소%25ED%2586%25B5%2520%25법"><u>직장에서 사용하길 원하는 의사소통</u></a>).
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
              기존 수어 번역 프로그램들은 <strong>지문자 번역 방식</strong>을 사용하여 청각 장애인들의 이해도를 저하시키는 한계가 있습니다. 또한 많은 프로그램들이 개발 단계에 머물러 있거나 업데이트가 중단되어 접근성과 실용성이 낮은 실정입니다. <strong>O-LANGE는 온전한 수어 형태소를 제공하여</strong>, 음성 인식을 통한 실시간 번역 서비스를 제공하는 시스템을 구현하여 <strong>이러한 문제를 해결하고자 합니다.</strong>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap mb-20">
          <div className="lg:w-1/2 w-full flex flex-col justify-center px-4 lg:px-8 mb-8 lg:mb-0">
            <h1 ref={el => titleRefs.current[2] = el} className="fade-in text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              지문자?
            </h1>
            <p className="text-gray-500 mt-4">
              <strong>지문자</strong>는 각 수어의 특징을 표기하는 것이 아닌 단어를 표기하는 방법으로, 이는 수어의 의미를 단어로 표기하는 것입니다. 예를 들어, <strong>'가나다'를 'ㄱ ㅏ ㄴ ㅏ ㄷ ㅏ'로 표기</strong>하는 것과 같습니다. 이는 매우 비효율적이며, 수어의 특징을 표기하지 않기 때문에 수어를 이해하는 데 어려움이 있습니다. O-LANGE는 이러한 지문자를 사용하지 않고, 형태소를 기반으로 하는 수어 표기법을 <strong>시범적으로 구현</strong>했습니다. 비록 미비한 부분이 많지만, 이러한 시도가 더 많이 이루어지길 바랍니다.
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
              O-LANGE는 두 가지 방법으로 사용할 수 있습니다. 첫 번째는 <strong>음성을 입력받아 번역하는 방법</strong>입니다. 이 방법은 음성을 입력받아 번역된 수어를 보여줍니다. 두 번째는 <strong>텍스트를 입력받아 번역하는 방법</strong>입니다. 이 방법은 텍스트를 입력받아 번역된 수어를 보여줍니다. 두 가지 방법 모두 서로 다른 방식으로 사용할 수 있습니다.
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
              O-LANGE는 청각 장애인 분들의 정보 접근성과 의사소통 편의성을 향상시키기 위해 실시간 음성 인식 수어 번역 프로그램을 개발하는 프로젝트입니다. 이 프로젝트는 <strong><a href="https://sldict.korean.go.kr/front/main/main.do"><u>국립국어원 한국 수어사전</u></a></strong>의 데이터를 활용하여 개발되었습니다. 처음에는 간단히 정적 웹사이트로 구현하였으나, <strong>접근성을 개선하기 위해 동적인 웹사이트 구현이 필요</strong>했습니다. 그래서 React와 Tailwind CSS를 사용하여 사이트를 구성하게 되었습니다. <strong>음성 인식 기능은 webkitSpeechRecognition을 사용</strong>하여 구현되었으며, FastAPI 기반의 <strong>웹소켓을 사용하여 백엔드를 구성</strong>했습니다. 이를 통해 웹에서 음성을 입력받아 번역된 수어를 보여줄 수 있게 되었습니다. 이 모든 소스 코드는 footer에 있는 제 깃허브에서 확인하실 수 있습니다. 2021년에 저와 함께 이 훌륭한 프로젝트를 진행해 3년 뒤 온전한 서비스로 구현할 초석을 다져준 <strong><a href="https://github.com/finimage"><u>위재현</u></a>, <a href="https://github.com/MC-130J-30"><u>박상현</u></a>, <a href="https://github.com/setak482"><u>최재경</u></a>, <a href="https://github.com/yoonhofriday"><u>정윤호</u></a> 학생에게 감사의 말씀을 드립니다.</strong> (© 2021 IF_O-LANGE)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
