import React, {useState, useEffect} from 'react';

const InfoTable = [
  {id: 1, parentID: 0, balance: "$3,655.34", name: "Yolanda Chavez", email: "yolandachavez@isoplex.com", isActive: true},
  {id: 2, parentID: 0, balance: "$1,247.87", name: "Navarro Levy", email: "navarrolevy@isoplex.com", isActive: true },
  {id: 3, parentID: 2, balance: "$2,559.85", name: "Wooten Hartman", email: "wootenhartman@isoplex.com", isActive: true },
  {id: 4, parentID: 3, balance: "$3,474.20", name: "Mack Hess", email: "mackhess@isoplex.com", isActive: false },
  {id: 5, parentID: 0, balance: "$2,231.49", name: "Jocelyn Burch", email: "jocelynburch@isoplex.com", isActive: false },
  {id: 6, parentID: 5, balance: "$3,955.44", name: "Prince Daniel", email: "princedaniel@isoplex.com", isActive: false },
  {id: 7, parentID: 5, balance: "$1,994.83", name: "Newton Medina", email: "newtonmedina@isoplex.com", isActive: false },
  {id: 8, parentID: 0, balance: "$1,311.17", name: "Arnold Steele", email: "arnoldsteele@isoplex.com", isActive: true },
  {id: 9, parentID: 0, balance: "$2,313.46", name: "Kitty Glover", email: "kittyglover@isoplex.com", isActive: false },
  {id: 10, parentID: 9, balance: "$3,314.14", name: "Pruitt Spencer", email: "pruittspencer@isoplex.com", isActive: false },
  {id: 11, parentID: 0, balance: "$1,778.44", name: "Stefanie Quinn", email: "stefaniequinn@isoplex.com", isActive: false },
  {id: 12, parentID: 0, balance: "$1,141.37", name: "Fox Mcpherson", email: "foxmcpherson@isoplex.com", isActive: true },
  {id: 13, parentID: 0, balance: "$2,662.03", name: "Rodriquez Young", email: "rodriquezyoung@isoplex.com", isActive: false },
  {id: 14, parentID: 0, balance: "$2,573.84", name: "Love Byers", email: "lovebyers@isoplex.com", isActive: false },
  {id: 15, parentID: 14, balance: "$1,254.07", name: "Banks Short", email: "banksshort@isoplex.com", isActive: false },
  {id: 16, parentID: 14, balance: "$3,820.34", name: "Guthrie Brown", email: "guthriebrown@isoplex.com", isActive: true },
  {id: 17, parentID: 16, balance: "$2,884.74", name: "Kirsten Mcmahon", email: "kirstenmcmahon@isoplex.com", isActive: true },
  {id: 18, parentID: 1, balance: "$1,694.76", name: "Mcbride Sykes", email: "mcbridesykes@isoplex.com", isActive: false },
  {id: 19, parentID: 1, balance: "$3,644.56", name: "Juanita Camacho", email: "juanitacamacho@isoplex.com", isActive: true },
  {id: 20, parentID: 17, balance: "$1,179.25", name: "Carlene Little", email: "carlenelittle@isoplex.com", isActive: false },
  {id: 21, parentID: 0, balance: "$3,506.90", name: "Caitlin Bernard", email: "caitlinbernard@isoplex.com", isActive: true },
  {id: 22, parentID: 21, balance: "$2,924.31", name: "Vargas Lowe", email: "vargaslowe@isoplex.com", isActive: false },
  {id: 23, parentID: 22, balance: "$1,211.95", name: "Mae Santiago", email: "maesantiago@isoplex.com", isActive: false },
  {id: 24, parentID: 22, balance: "$2,959.37", name: "Gallagher Burnett", email: "gallagherburnett@isoplex.com", isActive: true },
  {id: 25, parentID: 0, balance: "$1,880.20", name: "Reyna Mayo", email: "reynamayo@isoplex.com", isActive: false },
  {id: 26, parentID: 0, balance: "$1,639.69", name: "Hardy Townsend", email: "hardytownsend@isoplex.com", isActive: false },
  {id: 27, parentID: 0, balance: "$3,211.26", name: "Cohen Best", email: "cohenbest@isoplex.com", isActive: false },
  {id: 28, parentID: 27, balance: "$2,270.94", name: "Sherrie Berger", email: "sherrieberger@isoplex.com", isActive: true },
  {id: 29, parentID: 27, balance: "$2,049.45", name: "Gentry Robbins", email: "gentryrobbins@isoplex.com", isActive: false },
  {id: 30, parentID: 0, balance: "$1,177.86", name: "Etta Sampson", email: "ettasampson@isoplex.com", isActive: true },
]




const DataTable = () => {
  const [data, setData] = useState([]); 
  const [filteredData, setFilteredData] = useState([]); 
  const [sortBy, setSortBy] = useState(null); 
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [showActiveOnly, setShowActiveOnly] = useState(false); 
  const [expandedRows, setExpandedRows] = useState(new Set()); 


  useEffect(() => {
    setData(InfoTable);
    setFilteredData(InfoTable);
  }, []);

  const toggleActiveFilter = () => {
    setShowActiveOnly(!showActiveOnly);
  };

  useEffect(() => {
    const filtered = showActiveOnly ? data.filter(item => item.isActive) : data;
    setFilteredData(filtered);
  }, [showActiveOnly, data]);

  const handleSort = (columnName) => {
    const newSortOrder = sortBy === columnName ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
    const sortedData = [...filteredData].sort((a, b) => {
      let aValue = a[columnName];
      let bValue = b[columnName];
      if (columnName === 'balance') {
        aValue = parseFloat(aValue.replace(/[$,]/g, ''));
        bValue = parseFloat(bValue.replace(/[$,]/g, ''));
      } else {
        aValue = aValue.toString().toLowerCase();
        bValue = bValue.toString().toLowerCase();
      }
      if (aValue < bValue) return newSortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return newSortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredData(sortedData);
    setSortBy(columnName);
    setSortOrder(newSortOrder);
  };

  const toggleExpand = (id) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const renderRows = (parentId = 0, level = 0) => {
    return filteredData
      .filter(item => item.parentID === parentId) 
      .map(item => {
        const hasChildren = filteredData.some(child => child.parentID === item.id); 
        return (
          <React.Fragment key={item.id}>
            <tr
              className={`${level % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}
              style={{ paddingLeft: `${level * 20}px`, backgroundColor: level > 0 ? '#f0f4f8' : '', borderLeft: level > 0 ? '4px solid #d1d5db' : '' }}
            >
              <td className="p-3">
                {hasChildren && (
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="mr-2 text-blue-600 hover:text-blue-800 text-sm p-1"
                  >
                    {expandedRows.has(item.id) ? '▼' : '▶'}
                  </button>
                )}
                <span className={`font-medium ${level > 0 ? 'text-gray-600' : 'text-black'}`}>
                  {item.name}
                </span>
              </td>
              <td className="p-3 text-right">{item.balance}</td>
              <td className="p-3">{item.email}</td>
              <td className={`p-3 text-center ${item.isActive ? 'text-green-600' : 'text-red-600'}`}>
                {item.isActive ? 'Active' : 'Inactive'}
              </td>
              <td className="p-3 text-center">{item.id}</td>
              <td className="p-3 text-center">{item.parentID}</td>
            </tr>
            {expandedRows.has(item.id) && renderRows(item.id, level + 1)}
          </React.Fragment>
        );
      });
  };

  return (
    <div className="p-6 max-w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        SPA веб-приложение на языке JS с использованием фреймворка React
      </h1>

      <button
        onClick={toggleActiveFilter}
        className="mb-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {showActiveOnly ? 'Show All' : 'Show Active Only'}
      </button>

      <div className="overflow-x-auto shadow-md rounded-lg border border-black">
        <table className="min-w-full text-base">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th
                className="p-3 cursor-pointer hover:bg-blue-700"
                onClick={() => handleSort('balance')}
              >
                Balance {sortBy === 'balance' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th
                className="p-3 cursor-pointer hover:bg-blue-700"
                onClick={() => handleSort('email')}
              >
                Email {sortBy === 'email' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">ID</th>
              <th className="p-3 text-center">Parent ID</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;