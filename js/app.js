document.addEventListener("DOMContentLoaded", () => {
    // Select elements
    const loginPage = document.getElementById("login-page");
    const dashboardPage = document.getElementById("dashboard-page");
    const loginForm = document.getElementById("login-form");
    const logoutButton = document.getElementById("logout-button");

    // Log to check if JavaScript is working
    console.log("JavaScript is running");

    // Variables for Chart and WebSocket
    let randomChart;
    let socket;

    // Login logic
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        console.log(`Username: ${username}, Password: ${password}`);

        if (username === "admin" && password === "password") {
            console.log("Login successful. Showing dashboard.");
            loginPage.classList.add("hidden");
            dashboardPage.classList.remove("hidden");

            // Initialize WebSocket connection and Chart after login
            initWebSocketAndChart();
        } else {
            alert("Invalid credentials! Try admin/password.");
            loginForm.reset();
        }
    });

    // Logout logic
    logoutButton.addEventListener("click", () => {
        console.log("Logout clicked. Returning to login page.");
        dashboardPage.classList.add("hidden");
        loginPage.classList.remove("hidden");

        // Optionally, disconnect the socket and destroy the chart when logging out
        if (socket) {
            socket.disconnect();
            socket = null;
        }
        if (randomChart) {
            randomChart.destroy();
            randomChart = null;
        }
    });

    // Initialize WebSocket connection and Chart
    function initWebSocketAndChart() {
        // Establish WebSocket connection
        socket = io('https://data.gdscnsut.com/');

        // Handle connection errors
        socket.on('connect_error', (err) => {
            console.error("Connection Error:", err.message);
        });

        // Create Chart.js Line Chart for real-time data
        const ctx = document.getElementById('random-chart').getContext('2d');
        randomChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [], // Timestamps
                datasets: [{
                    label: 'Random Number',
                    data: [],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'second',
                            displayFormats: {
                                second: 'h:mm:ss a'
                            },
                            tooltipFormat: 'h:mm:ss a'
                        },
                        title: {
                            display: true,
                            text: 'Time'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Value'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            }
        });

        // Listen for 'random_number' events from WebSocket
        socket.on('random_number', (data) => {
            console.log("Received random number:", data);

            // Get current timestamp
            const timestamp = new Date();

            // Add new data point (timestamp and number)
            randomChart.data.labels.push(timestamp);
            randomChart.data.datasets[0].data.push(data);

            // Keep the last 20 data points visible on the chart
            if (randomChart.data.labels.length > 20) {
                randomChart.data.labels.shift(); // Remove the oldest label
                randomChart.data.datasets[0].data.shift(); // Remove the oldest data point
            }

            // Update the chart
            randomChart.update();
        });

        // Optionally, handle disconnection
        socket.on('disconnect', () => {
            console.warn("Disconnected from WebSocket server.");
        });
    }
});
