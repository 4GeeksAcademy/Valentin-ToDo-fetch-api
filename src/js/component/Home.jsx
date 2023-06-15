import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasksList, setTasksList] = useState([]);

  const createUser = async () => {
    const response = await fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/valentinfr",
      {
        method: "POST",
        body: JSON.stringify([]),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const getTasksList = async () => {
    try {
      const response = await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/valentinfr"
      );
      const data = await response.json();
      setTasksList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateTasksList = async () => {
    try {
      const response = await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/valentinfr",
        {
          method: "PUT",
          body: JSON.stringify(tasksList),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(response.ok); // will be true if the response is successfull
      console.log(response.status); // the status code = 200 or code = 400 etc.
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    createUser();
  }, []);
  useEffect(() => {
    getTasksList();
  }, []);
  useEffect(() => {
    UpdateTasksList();
  }, [tasksList]);

  const insertTasks = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      setTasksList([...tasksList, { label: inputValue, done: false }]);
      setInputValue("");
    }
  };

  const deleteTasks = (id) => {
    setTasksList(tasksList.filter((task, index) => index !== id));
  };

  return (
    <div className="text-center">
      <h1>To Do List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={insertTasks} // Appel de la fonction insertTasks lors de l'événement onKeyUp
      />
      <ul>
        {tasksList.length === 0 ? (
          <li>No tasks, lucky!</li>
        ) : (
          tasksList.map((tarea, id) => (
            <li key={id}>
              {tarea.label}{" "}
              <button type="button" onClick={() => deleteTasks(id)}>
                X
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Home;
