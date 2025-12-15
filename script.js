class ControlPanel {
    constructor() {
        this.websites = [];
        this.groups = [];
        this.currentData = null;
        this.chart = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadData();
        this.updateDate();
        this.showToast('Control Panel Loaded', 'success');
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.showSection(e.target.dataset.section);
            });
        });
        
        // Quick random pick
        document.getElementById('quick-random').addEventListener('click', () => {
            this.quickRandomPick();
        });
        
        // Data input
        document.getElementById('data-input').addEventListener('paste', (e) => {
            setTimeout(() => this.parseData(), 100);
        });
    }
    
    showSection(sectionId) {
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }
    
    loadData() {
        // Try to load from localStorage first
        const savedData = localStorage.getItem('controlPanelData');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                this.websites = data.websites || [];
                this.groups = data.groups || [];
                this.updateUI();
            } catch (e) {
                console.error('Error loading saved data:', e);
            }
        }
    }
    
    saveData() {
        const data = {
            websites: this.websites,
            groups: this.groups,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('controlPanelData', JSON.stringify(data));
    }
    
    parseData() {
        const input = document.getElementById('data-input').value.trim();
        if (!input) {
            this.showToast('Please enter some data', 'warning');
            return;
        }
        
        try {
            // Try JSON first
            if (input.startsWith('[') || input.startsWith('{')) {
                const parsed = JSON.parse(input);
                this.processParsedData(parsed);
            } else {
                // Try CSV or list format
                const lines = input.split('\n').filter(line => line.trim());
                this.processListData(lines);
            }
        } catch (e) {
            // If JSON fails, treat as list
            const lines = input.split('\n').filter(line => line.trim());
            this.processListData(lines);
        }
    }
    
    processParsedData(data) {
        if (Array.isArray(data)) {
            this.websites = data.map((item, index) => ({
                id: index + 1,
                name: typeof item === 'object' ? item.name || item.url || `Site ${index + 1}` : item,
                url: typeof item === 'object' ? item.url || '#' : '#',
                group: typeof item === 'object' ? item.group || 'default' : 'default',
                status: 'active'
            }));
        } else if (typeof data === 'object') {
            // Handle object format
            this.websites = Object.entries(data).map(([key, value], index) => ({
                id: index + 1,
                name: key,
                url: typeof value === 'object' ? value.url || '#' : value,
                group: typeof value === 'object' ? value.group || 'default' : 'default',
                status: 'active'
            }));
        }
        
        this.extractGroups();
        this.updateUI();
        this.showToast(`Loaded ${this.websites.length} items`, 'success');
    }
    
    processListData(lines) {
        this.websites = lines.map((line, index) => {
            const parts = line.split(',').map(p => p.trim());
            return {
                id: index + 1,
                name: parts[0] || `Site ${index + 1}`,
                url: parts[1] || '#',
                group: parts[2] || 'default',
                status: 'active'
            };
        });
        
        this.extractGroups();
        this.updateUI();
        this.showToast(`Loaded ${this.websites.length} items`, 'success');
    }
    
    extractGroups() {
        const groupSet = new Set();
        this.websites.forEach(site => {
            if (site.group) groupSet.add(site.group);
        });
        this.groups = Array.from(groupSet);
    }
    
    updateUI() {
        // Update stats
        document.getElementById('total-websites').textContent = this.websites.length;
        document.getElementById('total-groups').textContent = this.groups.length;
        document.getElementById('active-sites').textContent = this.websites.filter(s => s.status === 'active').length;
        
        // Update data preview
        const preview = document.getElementById('data-preview');
        if (this.websites.length > 0) {
            preview.innerHTML = `
                <div class="preview-header">
                    <span>Name</span>
                    <span>URL</span>
                    <span>Group</span>
                </div>
                ${this.websites.slice(0, 5).map(site => `
                    <div class="preview-item">
                        <span>${site.name}</span>
                        <span><a href="${site.url}" target="_blank">${site.url}</a></span>
                        <span class="group-tag">${site.group}</span>
                    </div>
                `).join('')}
                ${this.websites.length > 5 ? `<p>... and ${this.websites.length - 5} more</p>` : ''}
            `;
            
            // Add CSS for preview
            const style = document.createElement('style');
            style.textContent = `
                .preview-header {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    font-weight: bold;
                    padding: 0.5rem;
                    background: var(--light-bg);
                    border-radius: 4px;
                }
                .preview-item {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    padding: 0.5rem;
                    border-bottom: 1px solid var(--border-color);
                }
                .preview-item:hover {
                    background: var(--light-bg);
                }
            `;
            document.head.appendChild(style);
        } else {
            preview.innerHTML = '<p class="no-data">No data loaded yet</p>';
        }
        
        // Update group filter
        const groupFilter = document.getElementById('group-filter');
        groupFilter.innerHTML = `
            <option value="all">All Groups</option>
            ${this.groups.map(group => `<option value="${group}">${group}</option>`).join('')}
        `;
        
        // Update group list
        this.updateGroupList();
        
        // Update analytics
        this.updateAnalytics();
        
        // Save data
        this.saveData();
    }
    
    updateGroupList() {
        const groupList = document.getElementById('group-list');
        const assignmentPanel = document.getElementById('group-assignment');
        
        if (this.groups.length > 0) {
            groupList.innerHTML = `
                <h3>Existing Groups</h3>
                <div class="groups-tags">
                    ${this.groups.map(group => `
                        <div class="group-tag">
                            <span>${group}</span>
                            <span class="group-count">(${this.websites.filter(s => s.group === group).length})</span>
                            <button onclick="controlPanel.deleteGroup('${group}')" class="delete-btn">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;
            
            // Create assignment interface
            assignmentPanel.innerHTML = `
                <h3>Assign Websites to Groups</h3>
                <select id="assignment-select" onchange="controlPanel.showGroupAssignment(this.value)">
                    <option value="">Select a website...</option>
                    ${this.websites.map(site => `
                        <option value="${site.id}">${site.name}</option>
                    `).join('')}
                </select>
                <div id="assignment-options" class="assignment-options"></div>
            `;
        } else {
            groupList.innerHTML = '<p class="no-data">No groups created yet</p>';
            assignmentPanel.innerHTML = '';
        }
    }
    
    createGroup() {
        const groupName = document.getElementById('new-group').value.trim();
        if (!groupName) {
            this.showToast('Please enter a group name', 'warning');
            return;
        }
        
        if (this.groups.includes(groupName)) {
            this.showToast('Group already exists', 'warning');
            return;
        }
        
        this.groups.push(groupName);
        document.getElementById('new-group').value = '';
        this.updateUI();
        this.showToast(`Group "${groupName}" created`, 'success');
    }
    
    deleteGroup(groupName) {
        if (!confirm(`Delete group "${groupName}"? Websites in this group will be moved to "default".`)) {
            return;
        }
        
        // Move websites to default group
        this.websites.forEach(site => {
            if (site.group === groupName) {
                site.group = 'default';
            }
        });
        
        // Remove group
        this.groups = this.groups.filter(g => g !== groupName);
        this.updateUI();
        this.showToast(`Group "${groupName}" deleted`, 'success');
    }
    
    showGroupAssignment(siteId) {
        const site = this.websites.find(s => s.id == siteId);
        if (!site) return;
        
        const options = document.getElementById('assignment-options');
        options.innerHTML = `
            <div class="assignment-card">
                <h4>${site.name}</h4>
                <p>Current group: <strong>${site.group}</strong></p>
                <div class="group-buttons">
                    ${this.groups.map(group => `
                        <button class="group-btn ${site.group === group ? 'active' : ''}" 
                                onclick="controlPanel.assignToGroup(${site.id}, '${group}')">
                            ${group}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    assignToGroup(siteId, groupName) {
        const site = this.websites.find(s => s.id == siteId);
        if (site) {
            site.group = groupName;
            this.updateUI();
            this.showToast(`Assigned "${site.name}" to "${groupName}"`, 'success');
        }
    }
    
    quickRandomPick() {
        if (this.websites.length === 0) {
            this.showToast('No data available', 'warning');
            return;
        }
        
        const randomIndex = this.getTrueRandomIndex(this.websites.length);
        const randomSite = this.websites[randomIndex];
        
        const resultDiv = document.getElementById('random-result');
        resultDiv.innerHTML = `
            <h4>Selected Website:</h4>
            <div class="selected-site">
                <strong>${randomSite.name}</strong>
                <p>URL: <a href="${randomSite.url}" target="_blank">${randomSite.url}</a></p>
                <p>Group: <span class="group-tag">${randomSite.group}</span></p>
            </div>
            <button class="btn-secondary" onclick="controlPanel.openWebsite('${randomSite.url}')">
                <i class="fas fa-external-link-alt"></i> Open Website
            </button>
        `;
    }
    
    performRandomPick() {
        const groupFilter = document.getElementById('group-filter').value;
        const pickCount = parseInt(document.getElementById('pick-count').value) || 1;
        
        let filteredSites = this.websites;
        if (groupFilter !== 'all') {
            filteredSites = this.websites.filter(site => site.group === groupFilter);
        }
        
        if (filteredSites.length === 0) {
            this.showToast('No websites available for selection', 'warning');
            return;
        }
        
        const picks = [];
        const usedIndices = new Set();
        
        // True random selection without replacement
        for (let i = 0; i < Math.min(pickCount, filteredSites.length); i++) {
            let randomIndex;
            do {
                randomIndex = this.getTrueRandomIndex(filteredSites.length);
            } while (usedIndices.has(randomIndex));
            
            usedIndices.add(randomIndex);
            picks.push(filteredSites[randomIndex]);
        }
        
        const resultsDiv = document.getElementById('random-results');
        resultsDiv.innerHTML = `
            <h3>Random Selection Results</h3>
            <div class="picks-grid">
                ${picks.map((site, index) => `
                    <div class="pick-card">
                        <div class="pick-number">${index + 1}</div>
                        <h4>${site.name}</h4>
                        <p><a href="${site.url}" target="_blank">${site.url}</a></p>
                        <p>Group: <span class="group-tag">${site.group}</span></p>
                        <button class="btn-secondary" onclick="controlPanel.openWebsite('${site.url}')">
                            <i class="fas fa-external-link-alt"></i> Visit
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Add CSS for picks grid
        const style = document.createElement('style');
        style.textContent = `
            .picks-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 1rem;
                margin-top: 1rem;
            }
            .pick-card {
                padding: 1rem;
                border: 1px solid var(--border-color);
                border-radius: 8px;
                text-align: center;
                background: white;
            }
            .pick-number {
                width: 30px;
                height: 30px;
                background: var(--secondary-color);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 10px;
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);
    }
    
    generateMultiplePicks() {
        const groupFilter = document.getElementById('group-filter').value;
        let filteredSites = this.websites;
        if (groupFilter !== 'all') {
            filteredSites = this.websites.filter(site => site.group === groupFilter);
        }
        
        if (filteredSites.length < 5) {
            this.showToast('Need at least 5 websites for multiple sets', 'warning');
            return;
        }
        
        const resultsDiv = document.getElementById('random-results');
        let html = '<h3>5 Random Sets</h3>';
        
        for (let setNum = 1; setNum <= 5; setNum++) {
            const set = [];
            const usedIndices = new Set();
            
            // Pick 3 random sites for each set
            for (let i = 0; i < Math.min(3, filteredSites.length); i++) {
                let randomIndex;
                do {
                    randomIndex = this.getTrueRandomIndex(filteredSites.length);
                } while (usedIndices.has(randomIndex));
                
                usedIndices.add(randomIndex);
                set.push(filteredSites[randomIndex]);
            }
            
            html += `
                <div class="set-container">
                    <h4>Set ${setNum}</h4>
                    ${set.map(site => `
                        <div class="set-item">
                            <span>${site.name}</span>
                            <span class="group-tag small">${site.group}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        resultsDiv.innerHTML = html;
    }
    
    getTrueRandomIndex(max) {
        // Use cryptographic random for true randomness
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return array[0] % max;
    }
    
    updateAnalytics() {
        if (this.websites.length === 0) {
            document.getElementById('analytics-stats').innerHTML = '<p class="no-data">No data available</p>';
            return;
        }
        
        // Calculate stats
        const groupCounts = {};
        this.websites.forEach(site => {
            groupCounts[site.group] = (groupCounts[site.group] || 0) + 1;
        });
        
        // Update stats display
        const statsDiv = document.getElementById('analytics-stats');
        statsDiv.innerHTML = `
            <div class="stat-item">
                <span>Total Websites:</span>
                <strong>${this.websites.length}</strong>
            </div>
            ${Object.entries(groupCounts).map(([group, count]) => `
                <div class="stat-item">
                    <span>${group}:</span>
                    <strong>${count}</strong>
                </div>
            `).join('')}
            <div class="stat-item">
                <span>Groups:</span>
                <strong>${this.groups.length}</strong>
            </div>
        `;
        
        // Update chart
        this.updateChart(groupCounts);
    }
    
    updateChart(groupCounts) {
        const ctx = document.getElementById('group-chart').getContext('2d');
        
        if (this.chart) {
            this.chart.destroy();
        }
        
        const colors = [
            '#3498db', '#2ecc71', '#9b59b6', '#e74c3c', '#f39c12',
            '#1abc9c', '#34495e', '#d35400', '#c0392b', '#8e44ad'
        ];
        
        this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(groupCounts),
                datasets: [{
                    data: Object.values(groupCounts),
                    backgroundColor: colors.slice(0, Object.keys(groupCounts).length),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    openWebsite(url) {
        if (url && url !== '#') {
            window.open(url, '_blank');
        }
    }
    
    copyAllData() {
        const data = {
            websites: this.websites,
            groups: this.groups,
            stats: {
                total: this.websites.length,
                groups: this.groups.length
            }
        };
        
        navigator.clipboard.writeText(JSON.stringify(data, null, 2))
            .then(() => this.showToast('Data copied to clipboard', 'success'))
            .catch(() => this.showToast('Failed to copy data', 'danger'));
    }
    
    exportData() {
        const data = {
            websites: this.websites,
            groups: this.groups,
            exported: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `control-panel-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast('Data exported successfully', 'success');
    }
    
    clearData() {
        if (confirm('Clear all data?')) {
            this.websites = [];
            this.groups = [];
            document.getElementById('data-input').value = '';
            this.updateUI();
            localStorage.removeItem('controlPanelData');
            this.showToast('Data cleared', 'success');
        }
    }
    
    pasteData() {
        navigator.clipboard.readText()
            .then(text => {
                document.getElementById('data-input').value = text;
                this.parseData();
            })
            .catch(() => {
                this.showToast('Failed to read clipboard', 'danger');
            });
    }
    
    updateDate() {
        const now = new Date();
        document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'toast show';
        
        // Set color based on type
        const colors = {
            success: '#2ecc71',
            warning: '#f39c12',
            danger: '#e74c3c',
            info: '#3498db'
        };
        toast.style.background = colors[type] || colors.info;
        
        // Hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.controlPanel = new ControlPanel();
});