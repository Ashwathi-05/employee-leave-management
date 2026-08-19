const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

let leaves = [
    {
        id: 1,
        name: "John",
        reason: "Sick Leave",
        status: "Approved"
    },
    {
        id: 2,
        name: "Priya",
        reason: "Family Function",
        status: "Pending"
    }
];

app.post("/api/leaves", (req, res) => {
    const { name, reason } = req.body;

    if (!name || !reason) {
        return res.status(400).json({
            message: "Name and reason are required"
        });
    }

    const newLeave = {
        id: leaves.length + 1,
        name: name,
        reason: reason,
        status: "Pending"
    };

    leaves.push(newLeave);

    res.status(201).json({
        message: "Leave applied successfully",
        leave: newLeave
    });
});

app.get("/api/leaves", (req, res) => {
    res.json(leaves);
});

app.put("/api/leaves/:id/approve", (req, res) => {
    const id = Number(req.params.id);

    const leave = leaves.find(item => item.id === id);

    if (!leave) {
        return res.status(404).json({
            message: "Leave not found"
        });
    }

    leave.status = "Approved";

    res.json({
        message: "Leave approved",
        leave: leave
    });
});

app.put("/api/leaves/:id/reject", (req, res) => {
    const id = Number(req.params.id);

    const leave = leaves.find(item => item.id === id);

    if (!leave) {
        return res.status(404).json({
            message: "Leave not found"
        });
    }

    leave.status = "Rejected";

    res.json({
        message: "Leave rejected",
        leave: leave
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
