// ===== State Management =====
// Track which buttons are currently active
let activeButtons = [false, false, false];

// Default labels
const defaultLabels = ['Fast', 'Good', 'Cheap'];

// ===== DOM Elements =====
const menuBtn = document.getElementById('menuBtn');
const customizePanel = document.getElementById('customizePanel');
const toggleButtons = [
    document.getElementById('toggle1'),
    document.getElementById('toggle2'),
    document.getElementById('toggle3')
];
const labelElements = [
    document.getElementById('label1'),
    document.getElementById('label2'),
    document.getElementById('label3')
];
const labelInputs = [
    document.getElementById('input1'),
    document.getElementById('input2'),
    document.getElementById('input3')
];
const copyLinkBtn = document.getElementById('copyLinkBtn');
const copyFeedback = document.getElementById('copyFeedback');
const colorPrimaryInput = document.getElementById('colorPrimary');
const colorSecondaryInput = document.getElementById('colorSecondary');

// ===== Color Management =====

/**
 * Update CSS variables for colors
 */
function updateColors(primary, secondary) {
    document.documentElement.style.setProperty('--color-primary', primary);
    document.documentElement.style.setProperty('--color-secondary', secondary);
}

// ===== URL Parameter Handling =====

/**
 * Parse URL parameters and extract custom labels and state
 * Format: ?a=Label1&b=Label2&c=Label3&state=110 (optional)
 */
function loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    // Get custom labels from URL
    const labelA = params.get('a');
    const labelB = params.get('b');
    const labelC = params.get('c');
    
    // Get colors from URL
    const primaryColor = params.get('c1');
    const secondaryColor = params.get('c2');
    
    // Get theme from URL
    const themeParam = params.get('theme');
    
    // Get state (which buttons are active)
    const stateParam = params.get('state');
    
    // Apply custom labels if they exist
    if (labelA || labelB || labelC) {
        const labels = [
            labelA || defaultLabels[0],
            labelB || defaultLabels[1],
            labelC || defaultLabels[2]
        ];
        
        applyLabels(labels);
    } else {
        // Use default labels
        applyLabels(defaultLabels);
    }
    
    // Apply custom colors if they exist
    if (primaryColor && secondaryColor) {
        updateColors(primaryColor, secondaryColor);
        colorPrimaryInput.value = primaryColor;
        colorSecondaryInput.value = secondaryColor;
    }
    
    // Apply theme if it exists
    if (themeParam) {
        switchTheme(themeParam);
    } else {
        // Load saved theme from localStorage if no URL param
        loadSavedTheme();
    }
    
    // Apply state if it exists (e.g., "110" means first two buttons active)
    if (stateParam && stateParam.length === 3) {
        for (let i = 0; i < 3; i++) {
            activeButtons[i] = stateParam[i] === '1';
        }
        updateUI();
    }
}

/**
 * Apply labels to both the display labels and input fields
 */
function applyLabels(labels) {
    for (let i = 0; i < 3; i++) {
        labelElements[i].textContent = labels[i];
        labelInputs[i].value = labels[i];
    }
}

/**
 * Generate a shareable URL with current labels and state
 */
function generateShareableURL() {
    const baseURL = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    
    // Add labels
    params.set('a', labelInputs[0].value.trim() || defaultLabels[0]);
    params.set('b', labelInputs[1].value.trim() || defaultLabels[1]);
    params.set('c', labelInputs[2].value.trim() || defaultLabels[2]);
    
    // Add theme
    const savedTheme = localStorage.getItem('theme') || 'default';
    params.set('theme', savedTheme);
    
    // Only add colors if using default theme
    if (savedTheme === 'default') {
        params.set('c1', colorPrimaryInput.value);
        params.set('c2', colorSecondaryInput.value);
    }
    
    // Add state (e.g., "110" = first two active, last one inactive)
    const stateString = activeButtons.map(active => active ? '1' : '0').join('');
    params.set('state', stateString);
    
    return `${baseURL}?${params.toString()}`;
}

// ===== Toggle Button Logic =====

/**
 * Handle toggle button clicks
 * Rule: Only 2 buttons can be active at once
 */
function handleToggleClick(clickedIndex) {
    // If the clicked button is already active, deactivate it
    if (activeButtons[clickedIndex]) {
        activeButtons[clickedIndex] = false;
    } else {
        // Count how many buttons are currently active
        const activeCount = activeButtons.filter(Boolean).length;
        
        // If 2 are already active, deactivate a random one
        if (activeCount >= 2) {
            // Get indices of all active buttons (excluding the one we're about to activate)
            const activeIndices = activeButtons
                .map((active, index) => active && index !== clickedIndex ? index : -1)
                .filter(index => index !== -1);
            
            // Randomly pick one to deactivate
            const randomIndex = activeIndices[Math.floor(Math.random() * activeIndices.length)];
            activeButtons[randomIndex] = false;
        }
        
        // Activate the clicked button
        activeButtons[clickedIndex] = true;
    }
    
    updateUI();
}

/**
 * Update the UI based on current state
 */
function updateUI() {
    // Update toggle switch active states
    toggleButtons.forEach((btn, index) => {
        if (activeButtons[index]) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ===== Panel Toggle =====

/**
 * Toggle the customize panel open/closed
 */
function togglePanel() {
    customizePanel.classList.toggle('open');
    menuBtn.classList.toggle('active');
}

// ===== Label Updates =====

/**
 * Update labels in real-time as user types
 */
function updateLabelsRealTime() {
    for (let i = 0; i < 3; i++) {
        const value = labelInputs[i].value.trim();
        if (value) {
            labelElements[i].textContent = value;
        }
    }
}

// ===== Copy Link =====

/**
 * Copy the shareable link to clipboard
 */
async function copyShareableLink() {
    const url = generateShareableURL();
    console.log('Attempting to copy URL:', url);
    
    // Modern Clipboard API (preferred)
    if (navigator.clipboard && window.isSecureContext) {
        console.log('Trying Clipboard API...');
        try {
            await navigator.clipboard.writeText(url);
            console.log('Clipboard API success!');
            showCopySuccess();
            return;
        } catch (err) {
            console.warn('Clipboard API failed:', err);
        }
    } else {
        console.log('Clipboard API not available. isSecureContext:', window.isSecureContext);
    }
    
    // Fallback method for older browsers or non-HTTPS
    console.log('Trying fallback method...');
    try {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        textArea.style.opacity = '0';
        textArea.setAttribute('readonly', '');
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        textArea.setSelectionRange(0, 99999);
        
        let successful = false;
        try {
            successful = document.execCommand('copy');
            console.log('execCommand result:', successful);
        } catch (err) {
            console.error('execCommand failed:', err);
        }
        
        document.body.removeChild(textArea);
        
        if (successful) {
            console.log('Fallback method succeeded!');
            showCopySuccess();
        } else {
            console.log('Fallback method failed, showing manual copy option');
            showCopyFallback(url);
        }
    } catch (err) {
        console.error('All copy methods failed:', err);
        showCopyFallback(url);
    }
}

/**
 * Show success feedback
 */
function showCopySuccess() {
    console.log('Showing success feedback');
    copyFeedback.classList.add('show');
    copyLinkBtn.textContent = 'Copied!';
    
    setTimeout(() => {
        copyFeedback.classList.remove('show');
        copyLinkBtn.textContent = 'Copy Shareable Link';
    }, 2000);
}

/**
 * Fallback: show URL in prompt for manual copying
 */
function showCopyFallback(url) {
    console.log('Showing fallback prompt');
    prompt('Copy this link:', url);
}

// ===== Event Listeners =====

// Menu button
menuBtn.addEventListener('click', togglePanel);

// Toggle buttons
toggleButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => handleToggleClick(index));
});

// Label inputs - update in real-time
labelInputs.forEach(input => {
    input.addEventListener('input', updateLabelsRealTime);
});

// Color inputs - update in real-time
colorPrimaryInput.addEventListener('input', (e) => {
    updateColors(e.target.value, colorSecondaryInput.value);
});

colorSecondaryInput.addEventListener('input', (e) => {
    updateColors(colorPrimaryInput.value, e.target.value);
});

// Copy link button
copyLinkBtn.addEventListener('click', copyShareableLink);

// Close panel when clicking outside
document.addEventListener('click', (e) => {
    if (customizePanel.classList.contains('open') && 
        !customizePanel.contains(e.target) && 
        !menuBtn.contains(e.target)) {
        togglePanel();
    }
});

// ===== Theme Management =====
const themeButtons = document.querySelectorAll('.theme-btn');
const stylesheetLink = document.getElementById('stylesheet');

/**
 * Switch between stylesheets
 */
function switchTheme(theme) {
    const themeFiles = {
        'default': 'style.css',
        'comic': 'style-comic.css',
        'lcars': 'style-lcars.css'
    };
    
    stylesheetLink.href = themeFiles[theme] || 'style.css';
    
    // Update active state
    themeButtons.forEach(btn => {
        if (btn.dataset.theme === theme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Show/hide color pickers based on theme
    updateColorPickerVisibility(theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
}

/**
 * Load saved theme on page load
 */
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'default';
    switchTheme(savedTheme);
}

// Theme button event listeners
themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        switchTheme(btn.dataset.theme);
    });
});

/**
 * Show or hide color pickers based on theme
 */
function updateColorPickerVisibility(theme) {
    const colorSection = document.querySelector('.color-section');
    
    if (theme === 'default') {
        colorSection.style.display = 'block';
    } else {
        colorSection.style.display = 'none';
    }
}

// ===== Initialize =====

// Load from URL on page load
loadFromURL();

// Initialize UI
updateUI();