// BestiNut AI - Main JavaScript File
class FitHarmonyAI {
    constructor() {
        this.isInitialized = false;
        this.chatbotOpen = false;
        this.voiceRecording = false;
        this.currentUser = null;
        this.dietData = {};
        this.weightChartInstance = null;
        this.nutritionChartInstance = null;
        this.animationObserver = null;
        this.init();
    }

    init() {
        this.hideLoadingScreen();
        this.initializeEventListeners();
        this.initializeCharts();
        this.initializeAI();
        this.initializeAnimations();
        this.exportGlobalWrappers();
        this.isInitialized = true;
        console.log('BestiNut AI initialized successfully');
    }

    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 2000);
    }

    initializeEventListeners() {
        // Navigation
        this.setupNavigation();
        
        // AI Diet Form
        this.setupDietForm();
        
        // Meal Tracker
        this.setupMealTracker();
        
        // Smooth Scrolling
        this.setupSmoothScrolling();
        
        // Scroll Animations
        this.setupScrollAnimations();
        
        // Mobile Navigation
        this.setupMobileNavigation();

        // Debounced resize for charts
        window.addEventListener('resize', this.debounce(() => {
            if (this.weightChartInstance) {
                this.weightChartInstance.resize();
            }
            if (this.nutritionChartInstance) {
                this.nutritionChartInstance.resize();
            }
        }, 150));
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                this.updateActiveNavLink(link);
            });
        });
    }

    setupDietForm() {
        const dietForm = document.getElementById('aiDietForm');
        if (dietForm) {
            dietForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.generateAIDietPlan();
            });
        }
    }

    setupMealTracker() {
        const uploadArea = document.getElementById('uploadArea');
        const foodImageInput = document.getElementById('foodImage');

        if (uploadArea && foodImageInput) {
            // Drag and drop functionality
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = '#4CAF50';
                uploadArea.style.background = 'rgba(76, 175, 80, 0.1)';
            });

            uploadArea.addEventListener('dragleave', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = '#E0E0E0';
                uploadArea.style.background = 'white';
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = '#E0E0E0';
                uploadArea.style.background = 'white';
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleImageUpload({ target: { files } });
                }
            });

            // Click to upload
            uploadArea.addEventListener('click', () => {
                foodImageInput.click();
            });
        }
    }

    setupSmoothScrolling() {
        // Smooth scroll for all internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add staggered animation for child elements
                    const children = entry.target.querySelectorAll('.animate-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.analytics-card, .stat-item, .feature-item, .ai-diet-form, .upload-area').forEach(el => {
            this.animationObserver.observe(el);
        });
    }

    setupTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };

        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }

    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-card, .hero-visual');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.textContent);
            const increment = target / 50;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        };

        // Animate counters when they come into view
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    setupHoverEffects() {
        // Add ripple effect to buttons
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                button.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add floating effect to cards
        document.querySelectorAll('.analytics-card, .stat-item, .feature-item').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    setupMobileNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
    }

    initializeCharts() {
        this.createWeightChart();
        this.createNutritionChart();
    }

    createWeightChart() {
        const canvas = document.getElementById('weightChart');
        if (!canvas || typeof Chart === 'undefined') return;

        // Destroy previous instance to prevent duplicates/resize bugs
        if (this.weightChartInstance) {
            try { this.weightChartInstance.destroy(); } catch (_) {}
            this.weightChartInstance = null;
        }

        this.weightChartInstance = new Chart(canvas, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags'],
                datasets: [{
                    label: 'Berat Badan (kg)',
                    data: [75, 74.2, 73.8, 73.1, 72.5, 71.9, 71.2, 70.8],
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#4CAF50',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: false, grid: { color: 'rgba(0,0,0,0.08)' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    createNutritionChart() {
        const canvas = document.getElementById('nutritionChart');
        if (!canvas || typeof Chart === 'undefined') return;

        // Destroy previous instance to prevent duplicates/resize bugs
        if (this.nutritionChartInstance) {
            try { this.nutritionChartInstance.destroy(); } catch (_) {}
            this.nutritionChartInstance = null;
        }

        this.nutritionChartInstance = new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels: ['Protein', 'Karbohidrat', 'Lemak', 'Serat'],
                datasets: [{
                    data: [25, 45, 20, 10],
                    backgroundColor: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0'],
                    borderWidth: 0,
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 16, usePointStyle: true, font: { size: 12 } }
                    }
                },
                cutout: '62%'
            }
        });
    }

    initializeAI() {
        // Initialize AI features
        this.setupAIChatbot();
        this.setupVoiceCommands();
        this.loadAIModel();
    }

    setupAIChatbot() {
        // Chatbot functionality
        window.toggleChatbot = () => {
            const container = document.getElementById('chatbot-container');
            if (!container) return;
            if (this.chatbotOpen) {
                container.classList.remove('active');
                this.chatbotOpen = false;
            } else {
                container.classList.add('active');
                this.chatbotOpen = true;
                this.simulateAIThinking();
            }
        };

        window.sendMessage = () => {
            const input = document.getElementById('chat-input');
            if (!input) return;
            const message = input.value.trim();
            if (message) {
                this.addUserMessage(message);
                input.value = '';
                this.processAIResponse(message);
            }
        };

        window.handleChatInput = (event) => {
            if (event.key === 'Enter') {
                window.sendMessage();
            }
        };
    }

    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-content"><p>${message}</p></div>
            <div class="message-time">Baru saja</div>
        `;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    addAIMessage(message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai-message';
        messageDiv.innerHTML = `
            <div class="message-content"><p>${message}</p></div>
            <div class="message-time">Baru saja</div>
        `;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    simulateAIThinking() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;
        const thinkingDiv = document.createElement('div');
        thinkingDiv.className = 'message ai-message thinking';
        thinkingDiv.innerHTML = `
            <div class="message-content"><p><i class="fas fa-spinner fa-spin"></i> AI sedang berpikir...</p></div>
        `;
        messagesContainer.appendChild(thinkingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    processAIResponse(userMessage) {
        const thinking = document.querySelector('.thinking');
        if (thinking) thinking.remove();
        setTimeout(() => {
            const response = this.generateAIResponse(userMessage);
            this.addAIMessage(response);
        }, 900);
    }

    generateAIResponse(userMessage) {
        const message = userMessage.toLowerCase();
    
        if (message.includes('kalori') || message.includes('calorie')) {
            return `Kalori adalah satuan energi yang dibutuhkan tubuh. 
    Untuk orang dewasa, kebutuhan kalori harian berkisar 1500-2500 kcal tergantung aktivitas dan tujuan. 
    Tips: hitung kalori harian berdasarkan berat badan, tinggi, usia, dan level aktivitas. 
    Mau saya bantu hitung kebutuhan kalori Anda?`;
        } 
        else if (message.includes('protein')) {
            return `Protein penting untuk pembentukan otot dan perbaikan sel. 
    Sumber protein: ayam, ikan, telur, kacang-kacangan, susu, dan produk kedelai. 
    Target harian: 0.8-1.2g per kg berat badan. 
    Tips: sertakan protein di setiap makan untuk kenyang lebih lama.`;
        } 
        else if (message.includes('diet') || message.includes('makanan')) {
            return `Diet seimbang terdiri dari:
    - Karbohidrat: 45-65%
    - Protein: 15-25%
    - Lemak: 20-35%
    Fokus pada makanan utuh, sayuran, buah, dan protein lean. 
    Hindari makanan olahan berlebihan, minuman manis, dan gorengan.`;
        } 
        else if (message.includes('olahraga') || message.includes('exercise')) {
            return `Olahraga rutin sangat penting:
    - Cardio: jalan cepat, lari, bersepeda, renang (150 menit/minggu)
    - Strength Training: angkat beban, resistance band, push-up, squat (2-3x/minggu)
    - Fleksibilitas & Mobility: stretching, yoga, pilates
    Tips: mulai dari intensitas ringan, tingkatkan bertahap sesuai kemampuan.`;
        } 
        else if (message.includes('berat badan') || message.includes('weight')) {
            return `Untuk menurunkan berat badan:
    - Buat defisit kalori 300-500 kcal/hari
    - Kombinasikan pola makan sehat & olahraga rutin
    - Fokus pada protein & serat agar kenyang lebih lama
    - Pantau berat badan mingguan untuk evaluasi progres`;
        } 
        else {
            return `"terimakasi sudah datang diweb bestinut semoga hari mu membaik dan hidup sehat".`;
        }
    }
    

    setupVoiceCommands() {
        window.toggleVoiceCommand = () => {
            if (this.voiceRecording) this.stopVoiceRecording();
            else this.startVoiceRecording();
        };
    }

    startVoiceRecording() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'id-ID';
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.onstart = () => {
                this.voiceRecording = true;
                const icon = document.getElementById('voice-icon');
                if (icon) icon.classList.add('recording');
                this.showNotification('Mendengarkan...', 'info');
            };
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.processVoiceCommand(transcript);
            };
            recognition.onerror = () => {
                this.showNotification('Error dalam pengenalan suara', 'error');
            };
            recognition.onend = () => { this.stopVoiceRecording(); };
            recognition.start();
        } else {
            this.showNotification('Voice recognition tidak didukung di browser ini', 'warning');
        }
    }

    stopVoiceRecording() {
        this.voiceRecording = false;
        const icon = document.getElementById('voice-icon');
        if (icon) icon.classList.remove('recording');
    }

    processVoiceCommand(command) {
        const cmd = (command || '').toLowerCase();
        if (cmd.includes('beranda') || cmd.includes('home')) this.scrollToSection('home');
        else if (cmd.includes('diet')) this.scrollToSection('ai-diet');
        else if (cmd.includes('tracking') || cmd.includes('meal')) this.scrollToSection('meal-tracker');
        else if (cmd.includes('analisis') || cmd.includes('analytics')) this.scrollToSection('analytics');
        else if (cmd.includes('komunitas') || cmd.includes('community')) this.scrollToSection('community');
        else if (cmd.includes('chatbot') || cmd.includes('bantuan')) window.toggleChatbot();
        else this.showNotification(`Perintah tidak dikenali: "${command}"`, 'warning');
    }

    loadAIModel() {
        setTimeout(() => { this.showNotification('AI Assistant siap membantu!', 'success'); }, 1200);
    }

    generateAIDietPlan() {
        const formData = this.getFormData();
        if (!this.validateFormData(formData)) return;
        const resultContainer = document.getElementById('dietResult');
        if (!resultContainer) return;
        resultContainer.innerHTML = `
            <div class="ai-loading">
                <i class="fas fa-robot fa-spin"></i>
                <h3>AI sedang menganalisis data Anda...</h3>
                <p>Membuat rekomendasi diet personal yang optimal</p>
            </div>
        `;
        setTimeout(() => {
            const dietPlan = this.createAIDietPlan(formData);
            this.displayDietPlan(dietPlan);
        }, 1200);
    }

    getFormData() {
        return {
            name: (document.getElementById('name') || {}).value,
            age: parseInt((document.getElementById('age') || {}).value, 10),
            gender: (document.getElementById('gender') || {}).value,
            weight: parseFloat((document.getElementById('weight') || {}).value),
            height: parseFloat((document.getElementById('height') || {}).value),
            activity: (document.getElementById('activity') || {}).value,
            goal: (document.getElementById('goal') || {}).value,
            allergies: (document.getElementById('allergies') || {}).value,
            preferences: (document.getElementById('preferences') || {}).value
        };
    }

    validateFormData(data) {
        if (!data.name || !data.age || !data.gender || !data.weight || !data.height || !data.activity || !data.goal) {
            this.showNotification('Mohon lengkapi semua field yang wajib diisi', 'error');
            return false;
        }
        return true;
    }

    createAIDietPlan(userData) {
        let bmr;
        if (userData.gender === 'male') bmr = (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age) + 5;
        else bmr = (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age) - 161;
        const activityMultipliers = { 'sedentary': 1.2, 'light': 1.375, 'moderate': 1.55, 'active': 1.725, 'very-active': 1.9 };
        let tdee = bmr * (activityMultipliers[userData.activity] || 1.2);
        const goalAdjustments = { 'weight-loss': 0.85, 'weight-gain': 1.15, 'maintain': 1.0, 'muscle-gain': 1.1, 'healthy-lifestyle': 1.0 };
        tdee = tdee * (goalAdjustments[userData.goal] || 1.0);
        const bmi = userData.weight / Math.pow(userData.height / 100, 2);
        let bmiStatus = (bmi < 18.5) ? 'Kurus' : (bmi < 25) ? 'Normal' : (bmi < 30) ? 'Gemuk' : 'Obesitas';
        const mealPlan = this.generateMealPlan(userData, tdee);
        return { userData, bmr: Math.round(bmr), tdee: Math.round(tdee), bmi: bmi.toFixed(1), bmiStatus, mealPlan, recommendations: this.generateRecommendations(userData, bmi, tdee) };
    }

    generateMealPlan(userData, tdee) {
        const protein = Math.round((tdee * 0.25) / 4);
        const carbs = Math.round((tdee * 0.45) / 4);
        const fat = Math.round((tdee * 0.30) / 9);
        return {
            dailyTargets: { calories: Math.round(tdee), protein: protein + 'g', carbs: carbs + 'g', fat: fat + 'g' },
            meals: {
                breakfast: this.getMealSuggestions('breakfast'),
                lunch: this.getMealSuggestions('lunch'),
                dinner: this.getMealSuggestions('dinner'),
                snacks: this.getMealSuggestions('snacks')
            }
        };
    }

    getMealSuggestions(mealType) {
        const suggestions = {
            breakfast: ['Oatmeal dengan buah dan kacang almond', 'Telur orak-arik dengan roti gandum', 'Smoothie bowl dengan protein powder', 'Greek yogurt dengan granola dan madu'],
            lunch: ['Ayam panggang dengan quinoa dan sayuran', 'Salad tuna dengan alpukat dan sayuran hijau', 'Nasi merah dengan tempe dan sayuran', 'Sandwich gandum dengan ayam dan sayuran'],
            dinner: ['Ikan salmon dengan ubi jalar dan brokoli', 'Dada ayam dengan kentang dan wortel', 'Tofu dengan nasi merah dan sayuran', 'Sup ayam dengan sayuran dan mie gandum'],
            snacks: ['Apel dengan selai kacang', 'Kacang almond dan kurma', 'Greek yogurt dengan beri', 'Smoothie protein shake']
        };
        return suggestions[mealType];
    }

    generateRecommendations(userData, bmi) {
        const rec = [];
        if (bmi < 18.5) rec.push({ type: 'warning', title: 'Berat Badan Rendah', message: 'Fokus pada peningkatan asupan kalori sehat dan protein.' });
        else if (bmi >= 25) rec.push({ type: 'info', title: 'Manajemen Berat Badan', message: 'Defisit kalori ringan + olahraga rutin untuk hasil optimal.' });
        if (userData.goal === 'muscle-gain') rec.push({ type: 'success', title: 'Pembentukan Otot', message: 'Tingkatkan protein dan strength training 3-4x/minggu.' });
        if (userData.activity === 'sedentary') rec.push({ type: 'warning', title: 'Aktivitas Fisik', message: 'Mulai olahraga ringan 30 menit per hari.' });
        return rec;
    }

    displayDietPlan(dietPlan) {
        const resultContainer = document.getElementById('dietResult');
        if (!resultContainer) return;
        resultContainer.innerHTML = `
            <div class="diet-plan-result">
                <div class="result-header">
                    <h3>🎯 AI Diet Plan untuk ${dietPlan.userData.name}</h3>
                    <p>Dibuat khusus berdasarkan profil dan tujuan Anda</p>
                </div>
                <div class="metrics-grid">
                    <div class="metric-item"><div class="metric-value">${dietPlan.bmi}</div><div class="metric-label">BMI</div><div class="metric-status ${dietPlan.bmiStatus.toLowerCase()}">${dietPlan.bmiStatus}</div></div>
                    <div class="metric-item"><div class="metric-value">${dietPlan.tdee}</div><div class="metric-label">Kalori Harian</div><div class="metric-unit">kcal</div></div>
                    <div class="metric-item"><div class="metric-value">${dietPlan.bmr}</div><div class="metric-label">BMR</div><div class="metric-unit">kcal</div></div>
                </div>
                <div class="nutrition-targets">
                    <h4>Target Nutrisi Harian</h4>
                    <div class="target-grid">
                        <div class="target-item"><span class="target-label">Protein</span><span class="target-value">${dietPlan.mealPlan.dailyTargets.protein}</span></div>
                        <div class="target-item"><span class="target-label">Karbohidrat</span><span class="target-value">${dietPlan.mealPlan.dailyTargets.carbs}</span></div>
                        <div class="target-item"><span class="target-label">Lemak</span><span class="target-value">${dietPlan.mealPlan.dailyTargets.fat}</span></div>
                    </div>
                </div>
                <div class="meal-suggestions">
                    <h4>Rekomendasi Menu</h4>
                    <div class="meal-tabs">
                        <button class="meal-tab active" onclick="showMealTab('breakfast')">Sarapan</button>
                        <button class="meal-tab" onclick="showMealTab('lunch')">Makan Siang</button>
                        <button class="meal-tab" onclick="showMealTab('dinner')">Makan Malam</button>
                        <button class="meal-tab" onclick="showMealTab('snacks')">Snack</button>
                    </div>
                    <div class="meal-content">
                        <div id="breakfast-content" class="meal-content-item active">${dietPlan.mealPlan.meals.breakfast.map(item => `<div class=\"meal-item\">• ${item}</div>`).join('')}</div>
                        <div id="lunch-content" class="meal-content-item">${dietPlan.mealPlan.meals.lunch.map(item => `<div class=\"meal-item\">• ${item}</div>`).join('')}</div>
                        <div id="dinner-content" class="meal-content-item">${dietPlan.mealPlan.meals.dinner.map(item => `<div class=\"meal-item\">• ${item}</div>`).join('')}</div>
                        <div id="snacks-content" class="meal-content-item">${dietPlan.mealPlan.meals.snacks.map(item => `<div class=\"meal-item\">• ${item}</div>`).join('')}</div>
                    </div>
                </div>
                <div class="ai-recommendations">
                    <h4>💡 AI Recommendations</h4>
                    ${dietPlan.recommendations.map(rec => `
                        <div class="recommendation-item ${rec.type}">
                            <i class="fas fa-${rec.type === 'success' ? 'check-circle' : rec.type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                            <div><strong>${rec.title}</strong><p>${rec.message}</p></div>
                        </div>
                    `).join('')}
                </div>
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="saveDietPlan()"><i class="fas fa-save"></i> Simpan Diet Plan</button>
                    <button class="btn btn-secondary" onclick="shareDietPlan()"><i class="fas fa-share"></i> Bagikan</button>
                </div>
            </div>
        `;
    }

    handleImageUpload(event) {
        const file = event && event.target && event.target.files && event.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) { this.showNotification('Mohon pilih file gambar', 'error'); return; }
        const reader = new FileReader();
        reader.onload = (e) => { this.analyzeFoodImage(e.target.result); };
        reader.readAsDataURL(file);
    }

    analyzeFoodImage(imageData) {
        const resultContainer = document.getElementById('trackerResult');
        if (!resultContainer) return;
        resultContainer.innerHTML = `
            <div class="image-analysis-loading">
                <img src="${imageData}" alt="Food Image" style="max-width: 200px; border-radius: 8px; margin-bottom: 20px;">
                <i class="fas fa-robot fa-spin"></i>
                <h3>AI sedang menganalisis makanan...</h3>
                <p>Mengidentifikasi jenis makanan dan menghitung nutrisi</p>
            </div>
        `;
        setTimeout(() => {
            const analysis = this.simulateFoodAnalysis();
            this.displayFoodAnalysis(imageData, analysis);
        }, 1200);
    }

    simulateFoodAnalysis() {
        const foodTypes = [
            { name: 'Nasi Goreng', calories: 350, protein: 8, carbs: 45, fat: 12 },
            { name: 'Ayam Goreng', calories: 280, protein: 25, carbs: 2, fat: 18 },
            { name: 'Sayur Bayam', calories: 45, protein: 4, carbs: 7, fat: 0.5 },
            { name: 'Tempe Goreng', calories: 180, protein: 12, carbs: 15, fat: 8 },
            { name: 'Ikan Bakar', calories: 220, protein: 28, carbs: 0, fat: 12 }
        ];
        const randomFood = foodTypes[Math.floor(Math.random() * foodTypes.length)];
        return {
            foodName: randomFood.name,
            confidence: (85 + Math.random() * 15).toFixed(1),
            nutrition: { calories: randomFood.calories, protein: randomFood.protein, carbs: randomFood.carbs, fat: randomFood.fat, fiber: (1 + Math.random() * 3).toFixed(1) },
            suggestions: ['Makanan ini mengandung protein yang baik untuk otot', 'Kurangi minyak untuk versi yang lebih sehat', 'Tambahkan sayuran untuk serat tambahan']
        };
    }

    displayFoodAnalysis(imageData, analysis) {
        const resultContainer = document.getElementById('trackerResult');
        if (!resultContainer) return;
        resultContainer.innerHTML = `
            <div class="food-analysis-result">
                <div class="food-image">
                    <img src="${imageData}" alt="Food Image">
                    <div class="confidence-badge"><i class="fas fa-check-circle"></i> ${analysis.confidence}% Akurat</div>
                </div>
                <div class="food-info"><h3>${analysis.foodName}</h3><p>AI berhasil mengidentifikasi makanan dengan tingkat kepercayaan tinggi</p></div>
                <div class="nutrition-breakdown">
                    <h4>Breakdown Nutrisi</h4>
                    <div class="nutrition-grid">
                        <div class="nutrition-item"><span class="nutrition-value">${analysis.nutrition.calories}</span><span class="nutrition-label">Kalori</span></div>
                        <div class="nutrition-item"><span class="nutrition-value">${analysis.nutrition.protein}g</span><span class="nutrition-label">Protein</span></div>
                        <div class="nutrition-item"><span class="nutrition-value">${analysis.nutrition.carbs}g</span><span class="nutrition-label">Karbohidrat</span></div>
                        <div class="nutrition-item"><span class="nutrition-value">${analysis.nutrition.fat}g</span><span class="nutrition-label">Lemak</span></div>
                        <div class="nutrition-item"><span class="nutrition-value">${analysis.nutrition.fiber}g</span><span class="nutrition-label">Serat</span></div>
                    </div>
                </div>
                <div class="ai-suggestions">
                    <h4>💡 AI Suggestions</h4>
                    ${analysis.suggestions.map(s => `<div class=\"suggestion-item\"><i class=\"fas fa-lightbulb\"></i><span>${s}</span></div>`).join('')}
                </div>
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="addToDailyLog()"><i class="fas fa-plus"></i> Tambah ke Log Harian</button>
                    <button class="btn btn-secondary" onclick="getMoreInfo()"><i class="fas fa-info-circle"></i> Info Lebih Lanjut</button>
                </div>
            </div>
        `;
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
        `;
        document.body.appendChild(notification);
        setTimeout(() => { notification.classList.add('show'); }, 50);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => { notification.remove(); }, 300);
        }, 4200);
    }

    // Enhanced form handling
    handleFormSubmit(formId, callback) {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (callback) callback(e);
            });
        }
    }

    // Enhanced scroll handling
    smoothScrollTo(elementId, offset = 0) {
        const element = document.getElementById(elementId);
        if (element) {
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }

    // Support Section Functions
    showHelpGuide() {
        this.showNotification('Membuka panduan bantuan...', 'info');
        // Simulate opening help guide
        setTimeout(() => {
            this.showNotification('Panduan bantuan dibuka!', 'success');
        }, 1000);
    }

    showAllFAQ() {
        this.showNotification('Membuka halaman FAQ lengkap...', 'info');
        // Simulate opening FAQ page
        setTimeout(() => {
            this.showNotification('Halaman FAQ dibuka!', 'success');
        }, 1000);
    }

    contactSupport() {
        this.showNotification('Membuka halaman kontak...', 'info');
        // Simulate opening contact page
        setTimeout(() => {
            this.showNotification('Halaman kontak dibuka!', 'success');
        }, 1000);
    }

    showPrivacyPolicy() {
        this.showNotification('Membuka kebijakan privasi...', 'info');
        // Simulate opening privacy policy
        setTimeout(() => {
            this.showNotification('Kebijakan privasi dibuka!', 'success');
        }, 1000);
    }

    // Utility functions
    openDemo() { this.showNotification('Demo akan segera tersedia!', 'info'); }
    saveDietPlan() { this.showNotification('Diet plan berhasil disimpan!', 'success'); }
    shareDietPlan() {
                    if (navigator.share) navigator.share({ title: 'My AI Diet Plan - BestiNut AI', text: 'Lihat diet plan personal yang dibuat AI untuk saya!', url: window.location.href });
        else this.showNotification('Link berhasil disalin ke clipboard!', 'success');
    }
    addToDailyLog() { this.showNotification('Makanan berhasil ditambahkan ke log harian!', 'success'); }
    getMoreInfo() { this.showNotification('Fitur info detail akan segera tersedia!', 'info'); }

    exportGlobalWrappers() {
        window.openDemo = () => window.fitHarmonyAI.openDemo();
        window.saveDietPlan = () => window.fitHarmonyAI.saveDietPlan();
        window.shareDietPlan = () => window.fitHarmonyAI.shareDietPlan();
        window.addToDailyLog = () => window.fitHarmonyAI.addToDailyLog();
        window.getMoreInfo = () => window.fitHarmonyAI.getMoreInfo();
        window.handleImageUpload = (e) => window.fitHarmonyAI.handleImageUpload(e);
    }

    debounce(fn, delay) {
        let t;
        return (...args) => {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), delay);
        };
    }
}

// Global functions for HTML onclick events
window.showMealTab = function(tabName) {
    document.querySelectorAll('.meal-content-item').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.meal-tab').forEach(tab => tab.classList.remove('active'));
    const content = document.getElementById(tabName + '-content');
    if (content) content.classList.add('active');
    if (event && event.target) event.target.classList.add('active');
};

// Initialize BestiNut AI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.fitHarmonyAI = new FitHarmonyAI();
});

// Add notification styles
const notificationStyles = `
<style>
.notification { position: fixed; top: 20px; right: 20px; background: white; padding: 15px 20px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 12px; z-index: 10000; transform: translateX(400px); transition: transform 0.3s ease-out; max-width: 350px; }
.notification.show { transform: translateX(0); }
.notification-success { border-left: 4px solid #4CAF50; }
.notification-error { border-left: 4px solid #F44336; }
.notification-warning { border-left: 4px solid #FF9800; }
.notification-info { border-left: 4px solid #2196F3; }
.notification i:first-child { font-size: 1.2rem; }
.notification-success i:first-child { color: #4CAF50; }
.notification-error i:first-child { color: #F44336; }
.notification-warning i:first-child { color: #FF9800; }
.notification-info i:first-child { color: #2196F3; }
.notification button { background: none; border: none; color: #9E9E9E; cursor: pointer; margin-left: auto; padding: 5px; border-radius: 50%; transition: all 0.3s; }
.notification button:hover { background: #f5f5f5; color: #757575; }
.diet-plan-result { text-align: left; }
.result-header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #e0e0e0; }
.metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
.metric-item { text-align: center; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
.metric-value { font-size: 2rem; font-weight: 700; color: #4CAF50; margin-bottom: 5px; }
.metric-label { font-size: 0.9rem; color: #757575; margin-bottom: 5px; }
.metric-status, .metric-unit { font-size: 0.8rem; color: #9E9E9E; text-transform: uppercase; }
.nutrition-targets, .meal-suggestions, .ai-recommendations { margin-bottom: 30px; }
.nutrition-targets h4, .meal-suggestions h4, .ai-recommendations h4 { margin-bottom: 15px; color: #212121; }
.target-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
.target-item { display: flex; justify-content: space-between; align-items: center; padding: 15px; background: #f5f5f5; border-radius: 8px; }
.meal-tabs { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
.meal-tab { padding: 10px 20px; border: 2px solid #e0e0e0; background: white; border-radius: 20px; cursor: pointer; transition: all 0.3s; font-size: 0.9rem; }
.meal-tab.active, .meal-tab:hover { border-color: #4CAF50; background: #4CAF50; color: white; }
.meal-content-item { display: none; }
.meal-content-item.active { display: block; }
.meal-item { padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #424242; }
.meal-item:last-child { border-bottom: none; }
.recommendation-item { display: flex; align-items: flex-start; gap: 15px; padding: 15px; background: white; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #4CAF50; }
.recommendation-item.warning { border-left-color: #FF9800; }
.recommendation-item.info { border-left-color: #2196F3; }
.recommendation-item i { color: #4CAF50; margin-top: 2px; }
.recommendation-item.warning i { color: #FF9800; }
.recommendation-item.info i { color: #2196F3; }
.action-buttons { display: flex; gap: 15px; justify-content: center; margin-top: 30px; }
.food-analysis-result { text-align: center; }
.food-image { position: relative; margin-bottom: 20px; }
.food-image img { max-width: 100%; border-radius: 8px; }
.confidence-badge { position: absolute; top: 10px; right: 10px; background: #4CAF50; color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.8rem; display: flex; align-items: center; gap: 5px; }
.nutrition-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; margin: 20px 0; }
.nutrition-item { text-align: center; padding: 15px 10px; background: #f5f5f5; border-radius: 8px; }
.nutrition-value { display: block; font-size: 1.2rem; font-weight: 600; color: #4CAF50; margin-bottom: 5px; }
.nutrition-label { font-size: 0.8rem; color: #757575; }
.suggestion-item { display: flex; align-items: center; gap: 10px; padding: 10px 0; text-align: left; }
.suggestion-item i { color: #FF9800; font-size: 1.1rem; }
@media (max-width: 768px) { .metrics-grid, .target-grid { grid-template-columns: 1fr; } .nutrition-grid { grid-template-columns: repeat(2, 1fr); } .meal-tabs { justify-content: center; } .action-buttons { flex-direction: column; } }
</style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);

// Theme switching and parallax additions
(function(){
    document.addEventListener('DOMContentLoaded', function(){
        // Theme switcher
        const switcher = document.querySelector('.theme-switcher');
        if (switcher) {
            switcher.addEventListener('click', function(e){
                const btn = e.target.closest('.theme-btn');
                if (!btn) return;
                const theme = btn.getAttribute('data-theme');
                if (theme) {
                    document.body.setAttribute('data-theme', theme);
                    try { localStorage.setItem('fh_theme', theme); } catch(_) {}
                }
            });
        }
        try {
            const saved = localStorage.getItem('fh_theme');
            if (saved) document.body.setAttribute('data-theme', saved);
        } catch(_) {}

        // Lightweight parallax for hero
        const parallaxRoot = document.querySelector('[data-parallax]');
        if (parallaxRoot) {
            const layers = parallaxRoot.querySelectorAll('[data-parallax-layer]');
            const onMove = (e) => {
                const rect = parallaxRoot.getBoundingClientRect();
                const cx = rect.left + rect.width/2;
                const cy = rect.top + rect.height/2;
                const dx = (e.clientX - cx) / rect.width;
                const dy = (e.clientY - cy) / rect.height;
                layers.forEach(layer => {
                    const depth = parseFloat(layer.getAttribute('data-depth') || '0.2');
                    const tx = -dx * 20 * depth;
                    const ty = -dy * 20 * depth;
                    layer.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
                });
            };
            const onLeave = () => { layers.forEach(l => l.style.transform = 'translate3d(0,0,0)'); };
            parallaxRoot.addEventListener('mousemove', onMove);
            parallaxRoot.addEventListener('mouseleave', onLeave);
        }
    });
})();
