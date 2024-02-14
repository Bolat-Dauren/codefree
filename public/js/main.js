// codefree/public/js/main.js

var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/java");


function goToProfile() {
    window.location.href = "/profile";
}

async function runCode() {
    var code = editor.getValue();

    document.getElementById("output").textContent = "";

    try {
        var result = await executeJavaCode(code);
        console.log(result);
        document.getElementById("output").textContent = result.output;
    } catch (error) {
        console.error(error);
        document.getElementById("output").textContent = "Error: " + (error.message || 'undefined error');
    }
}

async function executeJavaCode(code) {
    var apiKey = 'YOUR_JDOODLE_API_KEY';
    var apiUrl = 'https://api.jdoodle.com/v1/execute';
    var requestData = {
        script: code,
        language: 'java',
        versionIndex: '3',
        clientId: '8a23b5056b9cd6d66e189ffea9dd5424',  // Use any client ID
        clientSecret: 'd42e454b81adde23e731e323eea4f0ebda249b71e7df1c6adf1c1cad36037b35'  // Use any client secret
    };

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