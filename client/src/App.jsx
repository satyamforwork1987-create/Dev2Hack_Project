import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("http://localhost:5000/api/upload", formData);
    setResponse(res.data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Traano CSV Upload</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-6 py-2 rounded"
      >
        Upload
      </button>

      {response && (
        <pre className="mt-6 bg-white p-4 w-[600px] overflow-auto">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;