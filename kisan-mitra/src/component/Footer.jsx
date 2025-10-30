import React from 'react';

const DataList = ({ title, data, fallback }) => {
  return (
    <div className="my-6 border-yellow-500 rounded-3xl p-4 shadow-2xl bg-yellow-100">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <ul className="list-disc list-inside text-sm">
        {data.length > 0 ? (
          data.map((item, index) => (
            <li key={index} className="text-lg">
              {item}
            </li>
          ))
        ) : (
          <p className="text-gray-500">{fallback}</p>
        )}
      </ul>
    </div>
  );
};

export default DataList;