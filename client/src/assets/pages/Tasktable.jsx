import React, { useEffect, useState } from "react";

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch data from backend
    const fetchTasks = async () => {
      try {
        const url = import.meta.env.VITE_BACKEND_URL;
        const response = await fetch(`${url}/daata`); // change route if needed
        const result = await response.json();
        setTasks(result.data || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">
        Submitted Tasks Overview
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-lg border border-zinc-800">
        <table className="min-w-full divide-y divide-zinc-700">
          <thead className="bg-zinc-900 text-blue-300">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Task Link
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Submission Date (MM/DD/YYYY)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-zinc-400">
                  No task data available.
                </td>
              </tr>
            ) : (
              tasks.map((task, index) => (
                <tr
                  key={index}
                  className="hover:bg-zinc-800 transition duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {task.Fullname}
                  </td>
                  <td className="px-6 py-4 text-blue-400 break-all">
                    <a
                      href={task.Task}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {task.Task}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(task.Submitdate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
