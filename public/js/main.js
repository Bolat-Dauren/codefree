// codefree/public/js/main.js

// Initialize the Ace editor
var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/java");

async function runCode() {
    var code = editor.getValue();

    // Clear previous output
    document.getElementById("output").textContent = "";

    try {
        // Use JDoodle API to run Java code
        var result = await executeJavaCode(code);
        console.log(result);
        document.getElementById("output").textContent = result.output;
    } catch (error) {
        console.error(error);
        document.getElementById("output").textContent = "Error: " + (error.message || 'undefined error');
    }
}

// Function to execute Java code using JDoodle API
async function executeJavaCode(code) {
    // Replace 'YOUR_JDOODLE_API_KEY' with your actual JDoodle API key
    var apiKey = 'YOUR_JDOODLE_API_KEY';
    var apiUrl = 'https://api.jdoodle.com/v1/execute';

    // Prepare the request payload
    var requestData = {
        script: code,
        language: 'java',
        versionIndex: '3',
        clientId: 'client_id',  // Use any client ID
        clientSecret: 'client_secret'  // Use any client secret
    };

    // Send a POST request to JDoodle API
    var response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify(requestData)
    });

    var data = await response.json();

    if (data.error) {
        throw new Error(data.error);
    }

    return data;
}



