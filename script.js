let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('installPrompt').style.display = 'block';
});

document.getElementById('installBtn').addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
                console.log('App installed');
            }
            document.getElementById('installPrompt').style.display = 'none';
            deferredPrompt = null;
        });
    }
});

function appendValue(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = "";
}

function calculate() {
    try {
        document.getElementById('display').value = eval(document.getElementById('display').value);
    } catch (e) {
        alert('Invalid Expression');
    }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(() => console.log("Service Worker Registered"));
}
