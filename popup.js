document.getElementById('startConnect').addEventListener('click', () => {
    // Notify the user
    alert('Connecting...');

    // Execute the auto connect function on the LinkedIn page
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: autoConnect
        });
    });
});

function autoConnect() {
    const clickConnectButtons = () => {
        const buttons = document.querySelectorAll('button[aria-label*="Invite"], button[data-control-name="invite"], button.artdeco-button--secondary');

        if (buttons.length === 0) {
            console.log("No connectable profiles available.");
        } else {
            console.log(`Found ${buttons.length} connect buttons.`);

            buttons.forEach((button, index) => {
                if (button && button.innerText.trim() === "Connect") {
                    button.click();
                    console.log(`Clicked connect button ${index + 1} of ${buttons.length}`);
                }
            });
        }
    };

    // Delay the execution by 3 seconds
    setTimeout(() => {
        // Click connect buttons after the delay
        clickConnectButtons();

        // Observe for dynamically loaded buttons (if applicable)
        const observer = new MutationObserver(clickConnectButtons);
        observer.observe(document.body, { childList: true, subtree: true });
    }, 3000); // 3000 milliseconds = 3 seconds
}
