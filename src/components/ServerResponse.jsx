import React from 'react';

/**
 * ServerResponse 컴포넌트는 서버 응답을 표시하는 역할을 합니다.
 * @param {Object} props - 컴포넌트에 전달되는 props 객체
 * @param {Object} props.response - 서버 응답 객체
 * @returns {JSX.Element} 서버 응답을 표시하는 컴포넌트
 */
// ServerResponse 컴포넌트는 서버 응답을 표시하는 역할을 합니다.
// response prop을 받아와서 JSON 형식으로 보여줍니다.
const ServerResponse = ({ response }) => (
  <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow-inner">
    <h2 className="text-lg font-medium text-gray-800">서버 응답:</h2>
    <pre className="text-left text-sm text-gray-700 whitespace-pre-wrap break-all sm:text-base sm:text-base text-sm">
      {JSON.stringify(response, null, 2)}
    </pre>
  </div>
);

export default ServerResponse;
