class VehicleCardManager {
    constructor() {
        this.currentIndex = 0;
        this.vehicleCards = document.querySelector('.vehicle-cards');
        this.sidePanel = document.querySelector('.side-panel');
        this.modal = document.querySelector('#contact-modal');
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.querySelector('.see-more').addEventListener('click', () => this.loadMoreVehicles());
        
        // Close side panel when clicking outside
        document.addEventListener('click', (e) => {
            if (this.sidePanel.classList.contains('active') && 
                !this.sidePanel.contains(e.target) && 
                !e.target.closest('.vehicle-card')) {
                this.closeSidePanel();
            }
        });

        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Handle form submission
        document.getElementById('contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.closeModal();
        });
    }

    createVehicleCard(vehicle) {
        const card = document.createElement('div');
        card.className = 'vehicle-card';
        
        card.innerHTML = `
            <div class="card-header">
                <h2 class="card-title">${vehicle.title}</h2>
                <div class="card-actions">
                    <button class="heart-btn">❤️</button>
                    <button class="close-btn">✕</button>
                </div>
            </div>
            <div class="card-sections">
                <div class="section image-section">
                    <img class="car-image" src="https://cars.swizzl.ai/cars/images/${encodeURIComponent(vehicle.title)}" 
                         alt="${vehicle.title}" 
                         onerror="this.src='https://via.placeholder.com/350x200?text=Vehicle+Image'">
                </div>
                <div class="section">
                    <h3>Fits Your Needs</h3>
                    <ul>
                        ${vehicle.fits_your_needs.map(need => `<li>${need}</li>`).join('')}
                    </ul>
                </div>
                <div class="section">
                    <h3>Potential Gaps</h3>
                    <ul>
                        ${vehicle.potential_gaps.map(gap => `<li>${gap}</li>`).join('')}
                    </ul>
                </div>
                <div class="section">
                    <h3>Key Specs</h3>
                    <ul>
                        ${vehicle.key_specs.map(spec => `<li>${spec}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        // Add event listeners
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.card-actions')) {
                this.openSidePanel(vehicle);
            }
        });

        card.querySelector('.close-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeAndReplaceCard(card);
        });

        card.querySelector('.heart-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            const btn = e.target;
            btn.textContent = btn.textContent === '❤️' ? '🤍' : '❤️';
        });

        return card;
    }

    loadMoreVehicles() {
        if (this.currentIndex < vehicleData.cars.length) {
            const vehicle = vehicleData.cars[this.currentIndex];
            const card = this.createVehicleCard(vehicle);
            this.vehicleCards.appendChild(card);
            this.currentIndex++;

            if (this.currentIndex >= vehicleData.cars.length) {
                document.querySelector('.see-more').style.display = 'none';
            }
        }
    }

    removeAndReplaceCard(card) {
        if (this.currentIndex < vehicleData.cars.length) {
            const newVehicle = vehicleData.cars[this.currentIndex];
            const newCard = this.createVehicleCard(newVehicle);
            card.replaceWith(newCard);
            this.currentIndex++;
        } else {
            card.remove();
        }
    }

    openSidePanel(vehicle) {
        const content = `
            <h2>${vehicle.title}</h2>
            <img class="car-image" src="https://cars.swizzl.ai/cars/images/${encodeURIComponent(vehicle.title)}" 
                 alt="${vehicle.title}"
                 onerror="this.src='https://via.placeholder.com/350x200?text=Vehicle+Image'">
            <div class="section">
                <h3>Fits Your Needs</h3>
                <ul>
                    ${vehicle.fits_your_needs.map(need => `<li>${need}</li>`).join('')}
                </ul>
            </div>
            <div class="section">
                <h3>Potential Gaps</h3>
                <ul>
                    ${vehicle.potential_gaps.map(gap => `<li>${gap}</li>`).join('')}
                </ul>
            </div>
            <div class="section">
                <h3>Key Specs</h3>
                <ul>
                    ${vehicle.key_specs.map(spec => `<li>${spec}</li>`).join('')}
                </ul>
            </div>
            <button class="contact-dealer" onclick="vehicleManager.openModal('${vehicle.title}')">
                Contact the Dealer
            </button>
        `;
        
        this.sidePanel.querySelector('.side-panel-content').innerHTML = content;
        this.sidePanel.classList.add('active');
    }

    closeSidePanel() {
        this.sidePanel.classList.remove('active');
    }

    openModal(vehicleTitle) {
        const messageArea = this.modal.querySelector('#message');
        messageArea.value = `John is interested in the ${vehicleTitle} you have in stock...`;
        this.modal.classList.add('active');
    }

    closeModal() {
        this.modal.classList.remove('active');
    }
}

// Initialize the manager and load initial vehicles
const vehicleManager = new VehicleCardManager();
for (let i = 0; i < 3; i++) { // Load first 3 vehicles initially
    vehicleManager.loadMoreVehicles();
}
