// Resume Settings and Customization JavaScript
class ResumeCustomizer {
    constructor() {
        this.settings = {
            template: 'classic',
            font: 'Inter',
            fontSize: 14,
            colorTheme: 'teal',
            customColor: '#009688',
            layout: 'one-column',
            sections: {
                education: true,
                experience: true,
                skills: true,
                contact: true
            }
        };

        this.colorThemes = {
            teal: '#009688',
            blue: '#2196F3',
            purple: '#9C27B0',
            green: '#4CAF50'
        };

        this.init();
    }

    init() {
        this.loadSettings();
        this.bindEvents();
        this.updatePreview();
    }

    loadSettings() {
        const savedSettings = localStorage.getItem('resumeSettings');
        if (savedSettings) {
            this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
            this.applySettingsToUI();
        }
    }

    saveSettings() {
        localStorage.setItem('resumeSettings', JSON.stringify(this.settings));
        this.showNotification('Settings saved successfully!', 'success');
    }

    applySettingsToUI() {
        // Template selection
        document.querySelector(`input[name="template"][value="${this.settings.template}"]`).checked = true;
        
        // Font selection
        document.getElementById('font-family').value = this.settings.font;
        document.getElementById('font-size').value = this.settings.fontSize;
        document.getElementById('font-size-value').textContent = `${this.settings.fontSize}px`;
        
        // Color theme
        document.querySelector(`input[name="color-theme"][value="${this.settings.colorTheme}"]`).checked = true;
        document.getElementById('custom-color-picker').value = this.settings.customColor;
        
        // Layout
        document.querySelector(`input[name="layout"][value="${this.settings.layout}"]`).checked = true;
        
        // Section visibility
        Object.keys(this.settings.sections).forEach(section => {
            document.getElementById(`show-${section}`).checked = this.settings.sections[section];
        });
    }

    bindEvents() {
        // Template selection
        document.querySelectorAll('input[name="template"]').forEach(input => {
            input.addEventListener('change', (e) => {
                this.settings.template = e.target.value;
                this.updatePreview();
            });
        });

        // Font selection
        document.getElementById('font-family').addEventListener('change', (e) => {
            this.settings.font = e.target.value;
            this.updatePreview();
        });

        // Font size
        document.getElementById('font-size').addEventListener('input', (e) => {
            this.settings.fontSize = parseInt(e.target.value);
            document.getElementById('font-size-value').textContent = `${this.settings.fontSize}px`;
            this.updatePreview();
        });

        // Color theme
        document.querySelectorAll('input[name="color-theme"]').forEach(input => {
            input.addEventListener('change', (e) => {
                this.settings.colorTheme = e.target.value;
                this.updatePreview();
            });
        });

        // Custom color picker
        document.getElementById('custom-color-picker').addEventListener('input', (e) => {
            this.settings.customColor = e.target.value;
            this.settings.colorTheme = 'custom';
            this.updatePreview();
        });

        // Layout selection
        document.querySelectorAll('input[name="layout"]').forEach(input => {
            input.addEventListener('change', (e) => {
                this.settings.layout = e.target.value;
                this.updatePreview();
            });
        });

        // Section visibility toggles
        ['education', 'experience', 'skills', 'contact'].forEach(section => {
            document.getElementById(`show-${section}`).addEventListener('change', (e) => {
                this.settings.sections[section] = e.target.checked;
                this.updatePreview();
            });
        });

        // Action buttons
        document.getElementById('save-settings').addEventListener('click', () => {
            this.saveSettings();
        });

        document.getElementById('reset-settings').addEventListener('click', () => {
            this.resetSettings();
        });

        document.getElementById('export-resume').addEventListener('click', () => {
            this.exportResume();
        });

        document.getElementById('toggle-preview').addEventListener('click', () => {
            this.togglePreviewMode();
        });
    }

    updatePreview() {
        const resumeContent = document.querySelector('.resume-content');
        
        // Apply template class
        resumeContent.className = `resume-content ${this.settings.template}`;
        
        // Apply color theme
        if (this.settings.colorTheme !== 'custom') {
            resumeContent.classList.add(`${this.settings.colorTheme}-theme`);
        } else {
            this.applyCustomColor();
        }
        
        // Apply layout
        if (this.settings.layout === 'two-column') {
            resumeContent.classList.add('two-column');
        }
        
        // Apply font
        resumeContent.style.fontFamily = `'${this.settings.font}', sans-serif`;
        resumeContent.style.fontSize = `${this.settings.fontSize}px`;
        
        // Apply section visibility
        Object.keys(this.settings.sections).forEach(section => {
            const sectionElement = document.getElementById(`${section}-section`);
            if (sectionElement) {
                sectionElement.style.display = this.settings.sections[section] ? 'block' : 'none';
            }
        });

        // Apply template-specific styles
        this.applyTemplateStyles();
    }

    applyCustomColor() {
        const resumeContent = document.querySelector('.resume-content');
        const customColor = this.settings.customColor;
        
        // Create or update custom style element
        let customStyle = document.getElementById('custom-color-style');
        if (!customStyle) {
            customStyle = document.createElement('style');
            customStyle.id = 'custom-color-style';
            document.head.appendChild(customStyle);
        }
        
        customStyle.textContent = `
            .resume-content .title,
            .resume-content .contact-info i,
            .resume-content .company,
            .resume-content .resume-section h2,
            .resume-content .resume-header {
                color: ${customColor} !important;
                border-color: ${customColor} !important;
            }
            .resume-content .skill {
                background: ${customColor} !important;
            }
        `;
    }

    applyTemplateStyles() {
        const resumeContent = document.querySelector('.resume-content');
        
        switch (this.settings.template) {
            case 'modern':
                resumeContent.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
                break;
            case 'creative':
                resumeContent.style.background = '#fff';
                resumeContent.style.borderLeft = `5px solid ${this.getCurrentColor()}`;
                break;
            case 'minimal':
                resumeContent.style.background = '#fff';
                resumeContent.style.boxShadow = 'none';
                resumeContent.style.border = '1px solid #e0e0e0';
                break;
            default: // classic
                resumeContent.style.background = '#fff';
                resumeContent.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                resumeContent.style.border = 'none';
                resumeContent.style.borderLeft = 'none';
                break;
        }
    }

    getCurrentColor() {
        return this.settings.colorTheme === 'custom' 
            ? this.settings.customColor 
            : this.colorThemes[this.settings.colorTheme];
    }

    resetSettings() {
        if (confirm('Are you sure you want to reset all settings to default?')) {
            localStorage.removeItem('resumeSettings');
            this.settings = {
                template: 'classic',
                font: 'Inter',
                fontSize: 14,
                colorTheme: 'teal',
                customColor: '#009688',
                layout: 'one-column',
                sections: {
                    education: true,
                    experience: true,
                    skills: true,
                    contact: true
                }
            };
            this.applySettingsToUI();
            this.updatePreview();
            this.showNotification('Settings reset to default!', 'info');
        }
    }

    exportResume() {
        const resumeContent = document.querySelector('.resume-content').cloneNode(true);
        
        // Create a new window with the resume content
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Resume - John Doe</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&family=Open+Sans:wght@300;400;500;600;700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
                <style>
                    body { margin: 0; padding: 20px; background: #f5f5f5; }
                    ${this.getExportStyles()}
                </style>
            </head>
            <body>
                ${resumeContent.outerHTML}
            </body>
            </html>
        `);
        printWindow.document.close();
        
        // Trigger print dialog
        setTimeout(() => {
            printWindow.print();
        }, 500);
        
        this.showNotification('Resume exported successfully!', 'success');
    }

    getExportStyles() {
        const currentColor = this.getCurrentColor();
        return `
            .resume-content {
                background: #fff;
                color: #333;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                max-width: 800px;
                margin: 0 auto;
                font-family: '${this.settings.font}', sans-serif;
                font-size: ${this.settings.fontSize}px;
                line-height: 1.6;
            }
            .resume-header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid ${currentColor};
            }
            .name {
                font-size: 32px;
                font-weight: 700;
                color: #333;
                margin-bottom: 5px;
            }
            .title {
                font-size: 18px;
                color: ${currentColor};
                font-weight: 500;
                margin-bottom: 15px;
            }
            .contact-info {
                display: flex;
                justify-content: center;
                gap: 20px;
                flex-wrap: wrap;
                font-size: 14px;
                color: #666;
            }
            .contact-info i {
                color: ${currentColor};
            }
            .resume-section h2 {
                color: ${currentColor};
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 15px;
                padding-bottom: 5px;
                border-bottom: 1px solid #e0e0e0;
            }
            .skill {
                background: ${currentColor};
                color: #fff;
                padding: 5px 12px;
                border-radius: 15px;
                font-size: 14px;
                font-weight: 500;
                display: inline-block;
                margin-right: 10px;
                margin-bottom: 10px;
            }
            .company {
                color: ${currentColor};
                font-weight: 500;
            }
            ${this.settings.layout === 'two-column' ? `
                .resume-body {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 30px;
                }
            ` : ''}
            @media print {
                body { background: #fff; padding: 0; }
                .resume-content { box-shadow: none; }
            }
        `;
    }

    togglePreviewMode() {
        const previewPanel = document.querySelector('.preview-panel');
        const settingsPanel = document.querySelector('.settings-panel');
        const toggleBtn = document.getElementById('toggle-preview');
        
        if (previewPanel.classList.contains('fullscreen')) {
            previewPanel.classList.remove('fullscreen');
            settingsPanel.style.display = 'block';
            toggleBtn.innerHTML = '<i class="fas fa-expand"></i>';
        } else {
            previewPanel.classList.add('fullscreen');
            settingsPanel.style.display = 'none';
            toggleBtn.innerHTML = '<i class="fas fa-compress"></i>';
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the customizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ResumeCustomizer();
});

// Handle user authentication state (similar to homepage)
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelector(".nav-bar ul");
    const signupLink = navLinks.querySelector("a[href='Auth.html']:last-child");
    
    const token = localStorage.getItem("token");
    
    if (token) {
        signupLink.textContent = "Logout";
        signupLink.href = "#";
        
        signupLink.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("resumeSettings");
            alert("You have been logged out.");
            window.location.href = "index.html";
        });
    }
});