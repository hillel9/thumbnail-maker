/* styles.css */
.panel {
    display: none;
}
.panel[data-active="true"] {
    display: block;
}

/* index.html */
/*
<div class="navigation">
    <button data-target="settings">Settings</button>
    <button data-target="profile">Profile</button>
    <button data-target="notifications">Notifications</button>
</div>

<div class="sidebar">
    <div class="panel" data-panel="settings">Settings content</div>
    <div class="panel" data-panel="profile">Profile content</div>
    <div class="panel" data-panel="notifications">Notifications content</div>
</div>
*/

// panel-manager.js
function showPanel(panelId) {
    document.querySelectorAll('.panel').forEach(panel => {
        panel.dataset.active = "false";
    });
    
    const targetPanel = document.querySelector(`.panel[data-panel="${panelId}"]`);
    if (targetPanel) {
        targetPanel.dataset.active = "true";
    }
}

// Event listeners
document.querySelectorAll('[data-target]').forEach(button => {
    button.addEventListener('click', () => {
        showPanel(button.dataset.target);
    });
});

// Show initial panel
showPanel('settings');