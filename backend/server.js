const express = require("express")
const app = express()
const cors = require("cors")


// Middlewares
app.use(express.json())
app.use(cors())


// Calling routes
app.use("/uploads", express.static("uploads"))
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

})