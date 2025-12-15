:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #9b59b6;
    --success-color: #2ecc71;
    --warning-color: #f39c12;
    --danger-color: #e74c3c;
    --light-bg: #ecf0f1;
    --dark-text: #2c3e50;
    --light-text: #7f8c8d;
    --border-color: #bdc3c7;
    --card-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: var(--dark-text);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    background: white;
    min-height: 100vh;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
}

header {
    background: var(--primary-color);
    color: white;
    padding: 2rem;
    text-align: center;
    border-bottom: 4px solid var(--secondary-color);
}

header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

header p {
    color: var(--light-bg);
    font-size: 1.1rem;
}

.main-content {
    display: flex;
    min-height: 70vh;
}

.sidebar {
    width: 250px;
    background: var(--light-bg);
    padding: 1.5rem;
    border-right: 1px solid var(--border-color);
}

.nav-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 2rem;
}

.nav-btn {
    padding: 1rem;
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    cursor: pointer;
    text-align: left;
    font-size: 1rem;
    color: var(--dark-text);
    transition: all 0.3s ease;
}

.nav-btn:hover {
    background: var(--secondary-color);
    color: white;
    transform: translateX(5px);
}

.nav-btn.active {
    background: var(--secondary-color);
    color: white;
    border-color: var(--secondary-color);
}

.nav-btn i {
    margin-right: 10px;
    width: 20px;
}

.quick-stats {
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: var(--card-shadow);
}

.quick-stats h3 {
    margin-bottom: 1rem;
    color: var(--primary-color);
}

.stat-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border-color);
}

.content-area {
    flex: 1;
    padding: 2rem;
}

.content-section {
    display: none;
    animation: fadeIn 0.5s ease;
}

.content-section.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.card {
    background: white;
    border-radius: 10px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: var(--card-shadow);
    border: 1px solid var(--border-color);
}

.card h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--light-bg);
}

.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

.btn-primary, .btn-secondary {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.btn-primary {
    background: var(--secondary-color);
    color: white;
}

.btn-primary:hover {
    background: #2980b9;
    transform: translateY(-2px);
}

.btn-secondary {
    background: white;
    color: var(--dark-text);
    border: 1px solid var(--border-color);
}

.btn-secondary:hover {
    background: var(--light-bg);
    transform: translateY(-2px);
}

.input-group textarea {
    width: 100%;
    min-height: 150px;
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-family: monospace;
    font-size: 0.9rem;
    resize: vertical;
}

.button-group {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    flex-wrap: wrap;
}

.result-box, .results-container {
    margin-top: 1rem;
    padding: 1rem;
    background: var(--light-bg);
    border-radius: 6px;
    border-left: 4px solid var(--secondary-color);
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.form-group input, .form-group select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
}

.groups-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
}

.group-tag {
    background: var(--accent-color);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.analytics-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
}

.chart-container {
    padding: 1rem;
    background: white;
    border-radius: 8px;
    border: 1px solid var(--border-color);
}

.stats-container {
    padding: 1rem;
}

footer {
    text-align: center;
    padding: 1.5rem;
    background: var(--primary-color);
    color: white;
    margin-top: 2rem;
}

.toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: var(--success-color);
    color: white;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
}

.toast.show {
    transform: translateY(0);
    opacity: 1;
}

@media (max-width: 768px) {
    .main-content {
        flex-direction: column;
    }
    
    .sidebar {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid var(--border-color);
    }
    
    .analytics-grid {
        grid-template-columns: 1fr;
    }
    
    .dashboard-grid {
        grid-template-columns: 1fr;
    }
}