// Text-to-Speech Function
function speakText(text) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = 'en-US';
    speech.rate = 1; // Adjust speed
    window.speechSynthesis.speak(speech);
}

// Start Voice Command (Speech Recognition)
function startVoiceCommand() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript;
        document.getElementById('result').value = command;

        try {
            const result = eval(command); // Perform the calculation
            document.getElementById('result').value = result;
            speakText(`The answer is ${result}`);
        } catch (err) {
            document.getElementById('result').value = 'Error';
            speakText("Sorry, I couldn't understand that. Please try again.");
        }
    };

    recognition.start();
}

// Append value to the result field
function appendValue(value) {
    const resultField = document.getElementById('result');
    resultField.value += value;
}

// Clear the result field
function clearResult() {
    document.getElementById('result').value = '';
}

// Delete the last character
function deleteLast() {
    const resultField = document.getElementById('result');
    resultField.value = resultField.value.slice(0, -1);
}

// Perform calculation and speak result
function calculate() {
    const resultField = document.getElementById('result');
    try {
        let calculation = resultField.value.includes('Math.sqrt') 
                          ? eval(resultField.value + ')') 
                          : eval(resultField.value);

        resultField.value = calculation;
        speakText(`The answer is ${calculation}`);
    } catch (error) {
        resultField.value = 'Error';
        speakText("An error occurred. Please check your input.");
    }
}
