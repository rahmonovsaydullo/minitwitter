// const express = require("express")
// const app = express()
// const cors = require("cors")


// const userRouter = require("./routes/userRouter");


// // Middlewares
// app.use(express.json())
// app.use(cors())
// app.use("/uploads", express.static("uploads"))


// // Calling routes
// app.use("/", userRouter)
// app.use("/user", userRouter);

// const PORT = 3000
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// })


const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRouter");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Calling routes
app.use("/", userRouter)
app.use("/user", userRouter); 

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
