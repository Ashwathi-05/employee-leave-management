
const leaveForm = document.getElementById("leaveForm");

if (leaveForm) {

    leaveForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value;
        const reason = document.getElementById("reason").value;

        try {

            const response = await fetch("/api/leaves", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    reason: reason
                })

            });

            const data = await response.json();

            const message = document.getElementById("message");

            message.style.display = "block";

            if (response.ok) {

                message.style.background = "#dcfce7";
                message.style.color = "#166534";

                message.innerText =
                    "✓ " + data.message;

                leaveForm.reset();

            } else {

                message.style.background = "#fee2e2";
                message.style.color = "#991b1b";

                message.innerText =
                    data.message;

            }

        } catch (error) {

            console.log(error);

            alert("Server connection failed");

        }

    });

}


async function loadLeaves() {

    try {

        const response =
            await fetch("/api/leaves");

        const leaves =
            await response.json();

        const table =
            document.getElementById("leaveTable");

        table.innerHTML = "";

        leaves.forEach(leave => {

            const row =
                document.createElement("tr");

            row.innerHTML = `

                <td>${leave.id}</td>

                <td>${leave.name}</td>

                <td>${leave.reason}</td>

                <td class="${leave.status.toLowerCase()}">
                    ${leave.status}
                </td>

                <td>

                    <button
                        class="approve"
                        onclick="approveLeave(${leave.id})">
                        Approve
                    </button>

                    <button
                        class="reject"
                        onclick="rejectLeave(${leave.id})">
                        Reject
                    </button>

                </td>

            `;

            table.appendChild(row);

        });

    } catch (error) {

        alert("Unable to load leave requests");

        console.log(error);

    }

}



async function approveLeave(id) {

    await fetch(`/api/leaves/${id}/approve`, {

        method: "PUT"

    });

    loadLeaves();

}



async function rejectLeave(id) {

    await fetch(`/api/leaves/${id}/reject`, {

        method: "PUT"

    });

    loadLeaves();

}
