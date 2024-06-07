import React from 'react';

const ServerResponse = ({ response }) => (
  <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow-inner">
    <h2 className="text-lg font-medium text-gray-800">서버 응답:</h2>
    <pre className="text-left text-sm text-gray-700 whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
  </div>
);

export default ServerResponse;
