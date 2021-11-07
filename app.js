const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

let tasks = [
  { id: 1, taskName: "sleep", isCompleted: false },
  { id: 2, taskName: "run", isCompleted: true },
  { id: 3, taskName: "swimm", isCompleted: false },
  { id: 4, taskName: "play", isCompleted: false },
];

app.get("/tasks", (req, res) => {
  res.status(200);
  res.json(tasks);
});

app.get("/name", (req, res) => {
  const { taskName } = req.query;
  const found = tasks.find((ele) => {
    return ele.taskName === taskName;
  });
  if (found) {
    res.status(200);
    res.json(found);
  } else {
    res.status(404);
    res.json("tasks not found");
  }
});

app.get("/complete", (req, res) => {
  const { isCompleted } = req.query;
  const found = tasks.filter((ele) => {
    return ele.isCompleted === Boolean(isCompleted);
  });

  if (found.length) {
    res.status(200);
    res.json(found);
  } else {
    res.status(404);
    res.json("tasks not found");
  }
});

app.get("/id", (req, res) => {
  const { id } = req.query;
  const found = tasks.find((ele) => {
    return ele.id == id;
  });

  if (found) {
    res.status(200);
    res.json(found);
  } else {
    res.status(404);
    res.json("tasks not found");
  }
});

app.post("/creat", (req, res) => {
  const { id, taskName, isCompleted } = req.body;
  const newTask = {
    id: req.body.id,
    taskName: req.body.taskName,
    isCompleted: req.body.isCompleted,
  };
  tasks.push({ id, taskName, isCompleted });
  res.status(200);
  res.json({ id, taskName, isCompleted });
});

app.delete("/delete", (req, res) => {
  const { isCompleted } = req.query;
  let newTasks=[];
  const found = tasks.map((ele,i) => {
    if (`${ele.isCompleted}` != isCompleted)
    {
        newTasks.push(ele);
    }else{
        return ele;
    }
    
  });
  
  tasks=newTasks;


  
  if (found) {
    res.status(200);
    res.json(tasks);
  } else {
    res.status(404);
    res.json("tasks not found");
  }
});

app.put("/put", (req, res) => {
  const { id } = req.query;
  const found = tasks.find((ele) => {
    return ele.id== id;
  });
  console.log(found)
  if (found) {
    let update = {
      id: found.id,
      taskName: req.body.taskName,
      isCompleted: req.body.isCompleted,
    };
    let targetIndex = tasks.indexOf(found);
    console.log(update)
    tasks.splice(targetIndex, 1, update);
    console.log(tasks)
    res.json(tasks);
  } else {
    res.status(404);
    res.json("tasks not found");
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
