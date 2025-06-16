import { useEffect, useState } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { motion } from 'framer-motion';

const EstimatorPage = () => {
  const [items, setItems] = useState([{ id: Date.now(), description: '', quantity: '', unit: '' }]);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [estimations, setEstimations] = useState(() => {
    const saved = localStorage.getItem('estimations');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('estimations', JSON.stringify(estimations));
  }, [estimations]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), description: '', quantity: '', unit: '' }]);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleEstimate = async () => {
    const validItems = items.filter(item => item.description.trim());
    if (validItems.length === 0) return;

    setLoading(true);
    try {
      const response = await fetch('https://techbid-ai.onrender.com/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: validItems.map(i => `${i.description}, Unit: ${i.unit}`)
        })
      });

      const result = await response.json();
      if (result.data) {
        const updatedItems = items.map((item, index) => {
          const aiResult = result.data[index] || {};
          return {
            ...item,
            aiPrice: aiResult.price || '',
            assumptions: aiResult.assumptions || ''
          };
        });
        setItems(updatedItems);
        setEstimations(result.data);
      } else {
        alert('Failed to fetch estimates.');
      }
    } catch (error) {
      console.error('❌ Fetch error:', error);
      alert('Server error occurred');
    }
    setLoading(false);
  };

  const exportToExcel = async (data) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Estimates');

    worksheet.columns = [
      { header: '#', key: 'index', width: 5 },
      { header: 'Description', key: 'description', width: 30 },
      { header: 'Quantity', key: 'quantity', width: 15 },
      { header: 'Unit', key: 'unit', width: 10 },
      { header: 'AI Assumptions', key: 'aiPrice', width: 40 },
      { header: 'Unit Price (SAR)', key: 'assumptions', width: 20 },
      { header: 'Total Price (SAR)', key: 'total', width: 20 }
    ];

    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    worksheet.views = [{ state: 'frozen', ySplit: 1 }];

    data.forEach((item, i) => {
      const row = worksheet.addRow({
        index: i + 1,
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        aiPrice: item.aiPrice || '',
        assumptions: item.assumptions || ''
      });

      row.getCell('total').value = {
        formula: `=F${i + 2}*C${i + 2}`,
        result: null
      };

      row.eachCell((cell) => {
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
          wrapText: true
        };
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    saveAs(blob, 'Estimates.xlsx');
  };

  const handleExcelUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      const formatted = json.map((row, index) => ({
        id: Date.now() + index,
        description: row.Description || '',
        quantity: row.Quantity || '',
        unit: row.Unit || ''
      }));

      setItems(formatted);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white p-6 flex flex-col items-center relative overflow-x-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold text-purple-200 mb-4 drop-shadow-lg text-center"
      >
        TechBid AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="text-xl text-purple-100 mb-8 text-center"
      >
        Upload or enter items below to get AI-powered estimation
      </motion.p>

      <label className="inline-block cursor-pointer mb-4 bg-black text-purple-900 rounded px-4 py-2 font-bold hover:shadow-[0_0_15px_#7e22ce] hover:bg-white/60 transition-all duration-300">
        Upload Excel File
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleExcelUpload}
          className="hidden"
        />
      </label>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl bg-black/30 text-gray-300 rounded-xl shadow-xl p-4 overflow-auto"
      >
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-purple-700 text-white">
              <th className="p-2 border border-purple-900">#</th>
              <th className="p-2 border border-purple-900">Description</th>
              <th className="p-2 border border-purple-900">Quantity</th>
              <th className="p-2 border border-purple-900">Unit</th>
              <th className="p-2 border border-purple-900">AI Assumptions</th>
              <th className="p-2 border border-purple-900">Unit Price</th>
              <th className="p-2 border border-purple-900">Total</th>
              <th className="p-2 border border-purple-900">Remove</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {items.map((item, index) => (
              <tr key={item.id}>
                <td className="p-2 border border-purple-900 text-center">{index + 1}</td>
                <td className="p-2 border border-purple-900 min-w-[300px] w-[400px]">
                  <textarea
                    className={`w-full px-2 py-1 resize-none transition-all duration-300 overflow-hidden outline-none text-center focus:ring-0 ${focusedIndex === index ? 'h-24' : 'h-10'
                      }`}
                    placeholder="Item Description"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    onFocus={() => setFocusedIndex(index)}
                    onBlur={() => setFocusedIndex(null)}
                  />
                </td>
                <td className="p-2 border border-purple-900 w-[100px]">
                  <input
                    type="number"
                    className="w-full px-2 py-1 outline-none text-center"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  />
                </td>
                <td className="p-2 border border-purple-900">
                  <input
                    type="text"
                    className="w-full px-2 py-1 outline-none text-center"
                    placeholder="Unit"
                    value={item.unit}
                    onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                  />
                </td>
                <td className="p-2 border border-purple-900 text-sm text-gray-100">{item.aiPrice || '-'}</td>
                <td className="p-2 border border-purple-900 text-center text-purple-200 font-semibold">{item.assumptions || '-'}</td>
                <td className="p-2 border border-purple-900 text-center text-gray-300"> - </td>
                <td className="p-2 border border-purple-900 text-center hover:bg-purple-900 transition-all duration-300">
                  <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700 text-xl cursor-pointer">❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </motion.div>

      <div className="flex flex-col bg-black/30 p-2 sm:flex-row justify-between gap-4 mt-6 rounded-xl">
        <button
          onClick={addItem}
          className="flex-1 px-4 py-2 bg-blue-600/60 text-white rounded hover:bg-blue-600/90 transition-all duration-300 cursor-pointer"
        >
          + Add Row
        </button>

        <button
          onClick={handleEstimate}
          disabled={loading}
          className="flex px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-all duration-300 disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Estimating...' : 'Estimate All'}
        </button>
      </div>

      {items.some(i => i.aiPrice || i.assumptions) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 w-full max-w-4xl bg-black/30 text-gray-800 p-6 rounded-xl shadow-lg"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => exportToExcel(items)}
              className="flex-1 px-4 py-2 bg-green-600/60 text-white rounded hover:bg-green-600/90 transition-all duration-300 cursor-pointer"
            >
              Export to Excel
            </button>
            <button
              onClick={() => {
                setItems([{ id: Date.now(), description: '', quantity: '', unit: '' }]);
                setEstimations([]);
                localStorage.removeItem('estimations');
              }}
              className="flex-1 px-4 py-2 bg-red-600/60 text-white rounded hover:bg-red-600/90 transition-all duration-300 cursor-pointer"
            >
              Clear History
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EstimatorPage;
