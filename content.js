console.log("Content script is running on the page.");

function logConnectButtons() {
    // Updated selector based on the provided button structure
    const connectButtons = document.querySelectorAll(`
        button[aria-label*="Invite"]
    `);

    if (connectButtons.length === 0) {
        console.log("No connectable profiles available.");
    } else {
        console.log(`Found ${connectButtons.length} connect buttons:`);
        connectButtons.forEach((button, index) => {
            console.log(`Button ${index + 1}:`, button);
        });
    }
}

// Initial call to log buttons
logConnectButtons();

// Set up MutationObserver to check for dynamically loaded buttons
const observer = new MutationObserver(logConnectButtons);

// Observe changes to the body for child nodes
observer.observe(document.body, { childList: true, subtree: true });
