import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ required
import SubmitForm from "./assets/pages/SubmitForm"; // ✅ renamed
import TaskTable from "./assets/pages/Tasktable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SubmitForm />} />
        <Route path="https://submit-your-task.onrender.com/submit/data/summerinternship/" element={<TaskTable />}></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
