const express = require("express");
const fs = require("fs")
const users = require("./MOCK_DATA.json")

const app = express();
const PORT = 8000;

// middleware
app.use(express.urlencoded({ extended: false }));


// HTML Doc

app.get("/users", (req, res) => {
     const html = `
     <ul>
          ${users.map(user => `<li>${user.first_name}</li>`).join("")}
     </ul>
     `
     res.send(html);
})


// ROUTES

app.get('/api/users', (req, res) => {
     return res.json(users)
})

// Grouping of same routes being used in methods
app
     .route('/api/users/:id')
     .get((req, res) => {
          const id = Number(req.params.id);
          const user = users.find(user => user.id === id)
          return res.json(user);
     })
     .patch((req, res) => {
          return res.json({ status: "Pending" })
     })
     .delete((req, res) => {
          return res.json({ status: "Pending" })
     })


app.post("/api/users", (req, res) => {
     const body = req.body;
     users.push({...body, id: users.length +      1});
     fs.writeFile('./MOCK_DATA,json', JSON.stringify(users), (err, data) => {
          return res.json({ status: "pending"})
     })
})

// app.patch("/api/users/:id", (req, res) => {
//      // TODO : Edit the user with Id
//      return res.json({ status: "pending"})
// })

// app.delete("/api/users/:id", (req, res) => {
//      // TODO : delete the user with Id
//      return res.json({ status: "pending"})
// })

app.listen(PORT, () => console.log/(`Server Started at PORT: ${PORT}`))