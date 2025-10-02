document.addEventListener('DOMContentLoaded', () => {
    // Elements for position data
    const loader = document.getElementById('loader');
    const errorMessage = document.getElementById('errorMessage');
    const positionsContainer = document.getElementById('positionsContainer');
    const noData = document.getElementById('noData');
    const positionsTableBody = document.getElementById('positionsTableBody');
    const refreshBtn = document.getElementById('refreshBtn');
    const totalValueEl = document.getElementById('totalValue');
    const totalPLEl = document.getElementById('totalPL');
    const positionCountEl = document.getElementById('positionCount');
    
    // Elements for card navigation
    const cardsWrapper = document.querySelector('.cards-wrapper');
    const indicators = document.querySelectorAll('.indicator');
    const cryptoCards = document.querySelectorAll('.crypto-card');
    let currentCardIndex = 0;
    
    // Elements for Dogecoin details
    const dogeLoader = document.getElementById('dogeLoader');
    const dogeErrorMessage = document.getElementById('dogeErrorMessage');
    const dogeDetailsContainer = document.getElementById('dogeDetailsContainer');
    const dogeUserName = document.getElementById('dogeUserName');
    const dogeQuantity = document.getElementById('dogeQuantity');
    const dogeBuyPrice = document.getElementById('dogeBuyPrice');
    const dogeInvestedAmount = document.getElementById('dogeInvestedAmount');
    const dogeCurrentPrice = document.getElementById('dogeCurrentPrice');
    const dogeProfitLoss = document.getElementById('dogeProfitLoss');
    const dogeProfitLossPercentage = document.getElementById('dogeProfitLossPercentage');
    const dogeTotalValue = document.getElementById('dogeTotalValue');
    const dogeProfitLossRow = document.getElementById('dogeProfitLossRow');
    const refreshDogeBtn = document.getElementById('refreshDogeBtn');
    const editDogeQuantity = document.getElementById('editDogeQuantity');
    const editDogeBuyPrice = document.getElementById('editDogeBuyPrice');
    
    // Elements for Harshi details
    const harshiLoader = document.getElementById('harshiLoader');
    const harshiErrorMessage = document.getElementById('harshiErrorMessage');
    const harshiDetailsContainer = document.getElementById('harshiDetailsContainer');
    const harshiUserName = document.getElementById('harshiUserName');
    const harshiQuantity = document.getElementById('harshiQuantity');
    const harshiBuyPrice = document.getElementById('harshiBuyPrice');
    const harshiInvestedAmount = document.getElementById('harshiInvestedAmount');
    const harshiCurrentPrice = document.getElementById('harshiCurrentPrice');
    const harshiProfitLoss = document.getElementById('harshiProfitLoss');
    const harshiProfitLossPercentage = document.getElementById('harshiProfitLossPercentage');
    const harshiTotalValue = document.getElementById('harshiTotalValue');
    const harshiProfitLossRow = document.getElementById('harshiProfitLossRow');
    const refreshHarshiBtn = document.getElementById('refreshHarshiBtn');
    const editHarshiQuantity = document.getElementById('editHarshiQuantity');
    const editHarshiBuyPrice = document.getElementById('editHarshiBuyPrice');
    
    // Default values for crypto assets
    let dogeData = {
        quantity: 10000,
        buyPrice: 0.354,
        userName: 'Arun'
    };
    
    let harshiData = {
        quantity: 33966,
        buyPrice: 0.268,
        userName: 'Harshi'
    };
    
    // Initialize card navigation
    function initCardNavigation() {
        console.log("Initializing card navigation");
        console.log("Cards found:", cryptoCards.length);
        cryptoCards.forEach((card, index) => {
            console.log(`Card ${index}: id=${card.id}`);
        });
        
        // Set Harshi (index 0) as the default card
        currentCardIndex = 0;
        
        // Show the current card initially
        updateCardPosition();
        
        // Add event listeners for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentCardIndex = index;
                updateCardPosition();
            });
        });
    }
    

    
    // Update card position based on current index
    function updateCardPosition() {
        const translateValue = -currentCardIndex * 50 + '%';
        console.log("Setting transform to:", translateValue);
        console.log("Current card index:", currentCardIndex);
        console.log("Cards wrapper:", cardsWrapper);
        cardsWrapper.style.transform = `translateX(${translateValue})`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === currentCardIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        // Make sure both cards are visible in the DOM
        document.querySelectorAll('.crypto-card').forEach(card => {
            card.style.display = 'block';
        });
    }

    // Fetch data when page loads
    fetchPositionData();
    fetchDogecoinData();
    fetchHarshiData();
    initCardNavigation();
    
    // Handle window resize to adjust card display
    window.addEventListener('resize', () => {
        // Always update card position when resizing
        updateCardPosition();
    });

    // Add event listener to refresh buttons
    refreshBtn.addEventListener('click', () => {
        fetchPositionData();
    });
    
    if (refreshDogeBtn) {
        refreshDogeBtn.addEventListener('click', () => {
            fetchDogecoinData();
        });
    } else {
        console.error("refreshDogeBtn not found!");
    }
    
    if (refreshHarshiBtn) {
        refreshHarshiBtn.addEventListener('click', () => {
            fetchHarshiData();
        });
    } else {
        console.error("refreshHarshiBtn not found!");
    }
    
    // Add event listeners for edit buttons
    if (editDogeQuantity) {
        editDogeQuantity.addEventListener('click', () => {
            const newQuantity = prompt('Enter new quantity:', dogeData.quantity);
            if (newQuantity !== null && !isNaN(newQuantity) && newQuantity.trim() !== '') {
                dogeData.quantity = parseFloat(newQuantity);
                updateDogecoinUI();
            }
        });
    } else {
        console.error("editDogeQuantity not found!");
    }
    
    if (editDogeBuyPrice) {
        editDogeBuyPrice.addEventListener('click', () => {
            const newBuyPrice = prompt('Enter new buy price:', dogeData.buyPrice);
            if (newBuyPrice !== null && !isNaN(newBuyPrice) && newBuyPrice.trim() !== '') {
                dogeData.buyPrice = parseFloat(newBuyPrice);
                updateDogecoinUI();
            }
        });
    } else {
        console.error("editDogeBuyPrice not found!");
    }
    
    if (editHarshiQuantity) {
        editHarshiQuantity.addEventListener('click', () => {
            const newQuantity = prompt('Enter new quantity:', harshiData.quantity);
            if (newQuantity !== null && !isNaN(newQuantity) && newQuantity.trim() !== '') {
                harshiData.quantity = parseFloat(newQuantity);
                updateHarshiUI();
            }
        });
    } else {
        console.error("editHarshiQuantity not found!");
    }
    
    if (editHarshiBuyPrice) {
        editHarshiBuyPrice.addEventListener('click', () => {
            const newBuyPrice = prompt('Enter new buy price:', harshiData.buyPrice);
            if (newBuyPrice !== null && !isNaN(newBuyPrice) && newBuyPrice.trim() !== '') {
                harshiData.buyPrice = parseFloat(newBuyPrice);
                updateHarshiUI();
            }
        });
    } else {
        console.error("editHarshiBuyPrice not found!");
    }

    /**
     * Fetches position data from the API
     */
    function fetchPositionData() {
        // Show loader and hide other elements
        showLoader();
        console.log("Fetching position data...");
        
        // Use mock data if the API fails (common with free services that limit requests)
        const useMockData = true;
        
        if (useMockData) {
            console.log("Using mock position data");
            setTimeout(() => {
                const mockData = {
                    items: [
                        { name: "Bitcoin", symbol: "BTC", quantity: 0.25, price: 63420.50 },
                        { name: "Ethereum", symbol: "ETH", quantity: 2.5, price: 3015.75 },
                        { name: "Cardano", symbol: "ADA", quantity: 1500, price: 0.45 },
                        { name: "Solana", symbol: "SOL", quantity: 10, price: 142.30 }
                    ]
                };
                displayPositions(mockData);
            }, 1000);
            return;
        }
        
        fetch('https://crypto.free.beeceptor.com/position')
            .then(response => {
                console.log("Position API response:", response);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Position data received:", data);
                displayPositions(data);
            })
            .catch(error => {
                console.error('Error fetching position data:', error);
                showError();
            });
    }

    /**
     * Displays the position data in the table
     * @param {Object} data - The position data from the API
     */
    function displayPositions(data) {
        console.log("Displaying positions with data:", data);
        
        if (!data || !data.items || data.items.length === 0) {
            console.log("No position data found, showing no data message");
            showNoData();
            return;
        }

        // Clear existing table rows
        positionsTableBody.innerHTML = '';
        
        let totalValue = 0;
        let totalProfitLoss = 0;
        
        console.log(`Found ${data.items.length} positions to display`);
        
        // Add each position to the table
        data.items.forEach(item => {
            const value = item.price * item.quantity;
            // Calculate a simple profit/loss placeholder (since API doesn't provide it)
            // This is just for demo purposes - in a real app, you'd have actual P/L data
            const profitLoss = value * 0.05 * (Math.random() > 0.5 ? 1 : -1);
            
            totalValue += value;
            totalProfitLoss += profitLoss;
            
            const row = document.createElement('tr');
            
            const plClass = profitLoss >= 0 ? 'positive-pl' : 'negative-pl';
            const plPrefix = profitLoss >= 0 ? '+' : '';
            
            row.innerHTML = `
                <td>
                    <div style="display: flex; align-items: center;">
                        <strong>${item.name}</strong>
                    </div>
                </td>
                <td>$${formatPrice(item.price)}</td>
                <td>${formatQuantity(item.quantity)}</td>
                <td>$${formatNumber(value)}</td>
                <td class="${plClass}">${plPrefix}$${formatNumber(profitLoss)}</td>
            `;
            
            positionsTableBody.appendChild(row);
        });
        
        // Update summary stats
        totalValueEl.textContent = `$${formatNumber(totalValue)}`;
        totalPLEl.textContent = `${totalProfitLoss >= 0 ? '+' : ''}$${formatNumber(totalProfitLoss)}`;
        totalPLEl.className = totalProfitLoss >= 0 ? 'positive-pl' : 'negative-pl';
        positionCountEl.textContent = data.items.length;
        
        // Show the positions container
        hideLoader();
        positionsContainer.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        noData.classList.add('hidden');
    }

    /**
     * Shows the loader and hides other elements
     */
    function showLoader() {
        loader.classList.remove('hidden');
        positionsContainer.classList.add('hidden');
        errorMessage.classList.add('hidden');
        noData.classList.add('hidden');
    }

    /**
     * Shows the error message and hides other elements
     */
    function showError() {
        console.log("Showing error message");
        console.log("Error element exists:", !!errorMessage);
        
        loader.classList.add('hidden');
        positionsContainer.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        noData.classList.add('hidden');
        
        console.log("Error message visibility:", {
            loaderHidden: loader.classList.contains('hidden'),
            positionsContainerHidden: positionsContainer.classList.contains('hidden'),
            errorMessageHidden: errorMessage.classList.contains('hidden'),
            noDataHidden: noData.classList.contains('hidden')
        });
    }

    /**
     * Shows the no data message and hides other elements
     */
    function showNoData() {
        loader.classList.add('hidden');
        positionsContainer.classList.add('hidden');
        errorMessage.classList.add('hidden');
        noData.classList.remove('hidden');
    }

    /**
     * Hides the loader
     */
    function hideLoader() {
        loader.classList.add('hidden');
    }

    /**
     * Format number to 2 decimal places and add commas
     * @param {number} num - The number to format
     * @returns {string} The formatted number
     */
    function formatNumber(num) {
        return parseFloat(num).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
    
    function formatPrice(num) {
        // Show exactly 3 decimal places for prices
        return parseFloat(num).toLocaleString(undefined, {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3
        });
    }
    
    function formatQuantity(num) {
        // Show whole numbers for quantities
        return parseInt(num).toLocaleString();
    }
    
    /**
     * Fetches the latest Dogecoin price data from Coinbase API
     */
    function fetchDogecoinData() {
        console.log("Fetching Arun data from GitHub API...");
        // Show loader and hide other elements
        dogeLoader.classList.remove('hidden');
        dogeDetailsContainer.classList.add('hidden');
        dogeErrorMessage.classList.add('hidden');
        
        console.log("Doge elements:", {
            loader: dogeLoader,
            container: dogeDetailsContainer,
            error: dogeErrorMessage
        });
        
        fetch('https://raw.githubusercontent.com/arunk1234/financial-calculators/master/price.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(text => {
                console.log("Raw GitHub data received for Arun:", text);
                
                // Parse the JSON
                const data = JSON.parse(text);
                console.log("Parsed data array for Arun:", data);
                
                if (data && Array.isArray(data) && data.length > 0) {
                    // Look for entry with name "arun"
                    let arunEntry = data.find(item => 
                        item.name && item.name.toLowerCase() === 'arun'
                    );
                    
                    console.log("Looking for Arun entry...");
                    console.log("Found arunEntry:", arunEntry);
                    
                    if (!arunEntry) {
                        // Use the first entry as fallback
                        arunEntry = data[0];
                        console.log("Using fallback entry for Arun:", arunEntry);
                    }
                    
                    if (arunEntry) {
                        // Update dogeData with Arun's values
                        dogeData.quantity = parseInt(arunEntry.quantity) || dogeData.quantity;
                        dogeData.buyPrice = parseFloat(arunEntry.price) || dogeData.buyPrice;
                        dogeData.userName = arunEntry.name || 'Arun';
                        
                        console.log("Updated dogeData (Arun) before price fetch:", dogeData);
                        
                        // Fetch current price
                        fetch('https://api.coinbase.com/v2/prices/DOGE-USD/spot')
                            .then(response => response.json())
                            .then(priceData => {
                                if (priceData && priceData.data && priceData.data.amount) {
                                    dogeData.currentPrice = parseFloat(priceData.data.amount);
                                } else {
                                    dogeData.currentPrice = dogeData.buyPrice * 1.1; // 10% increase as fallback
                                }
                                console.log("Final updated Arun data:", dogeData);
                                updateDogecoinUI();
                            })
                            .catch(error => {
                                console.warn('Error fetching current price for Arun, using fallback:', error);
                                dogeData.currentPrice = dogeData.buyPrice * 1.1;
                                console.log("Final updated Arun data with fallback:", dogeData);
                                updateDogecoinUI();
                            });
                    } else {
                        throw new Error('Could not find Arun entry in data');
                    }
                } else {
                    throw new Error('Invalid or empty data from GitHub API');
                }
            })
            .catch(error => {
                console.error('Error fetching Arun data from GitHub:', error);
                showDogeError();
            });
    }
    
    /**
     * Fetches data for Harshi (for demo purposes, we're using the same API as Dogecoin)
     */
    function fetchHarshiData() {
        console.log("Fetching data from GitHub API...");
        // Show loader and hide other elements
        harshiLoader.classList.remove('hidden');
        harshiDetailsContainer.classList.add('hidden');
        harshiErrorMessage.classList.add('hidden');
        
        fetch('https://raw.githubusercontent.com/arunk1234/financial-calculators/master/price.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(text => {
                console.log("Raw GitHub data received:", text);
                
                // Parse the JSON (it should be valid now)
                const data = JSON.parse(text);
                console.log("Parsed data array:", data);
                
                if (data && Array.isArray(data) && data.length > 0) {
                    // Look for entry with "harshi" field or name "harshi"
                    let harshiEntry = data.find(item => 
                        item.harshi === 'harshi' || 
                        (item.name && item.name.toLowerCase() === 'harshi')
                    );
                    
                    console.log("Looking for Harshi entry...");
                    console.log("Found harshiEntry:", harshiEntry);
                    
                    if (!harshiEntry) {
                        // If no harshi entry found, look for any entry that might be harshi
                        console.log("No direct harshi match, checking all entries:");
                        data.forEach((item, index) => {
                            console.log(`Entry ${index}:`, item);
                        });
                        
                        // Use the second entry as fallback if available
                        harshiEntry = data[1] || data[0];
                        console.log("Using fallback entry:", harshiEntry);
                    }
                    
                    console.log("Final harshiEntry selected:", harshiEntry);
                    
                    if (harshiEntry) {
                        // Update harshiData with API values
                        harshiData.quantity = parseInt(harshiEntry.quantity) || 10000;
                        harshiData.buyPrice = parseFloat(harshiEntry.price) || 0.267;
                        harshiData.userName = harshiEntry.harshi || harshiEntry.name || 'Harshi';
                        
                        console.log("Updated harshiData before price fetch:", harshiData);
                        
                        // For current price, we'll still use a crypto API (assuming this is crypto data)
                        // You can modify this to use a different API or set a fixed current price
                        fetch('https://api.coinbase.com/v2/prices/DOGE-USD/spot')
                            .then(response => response.json())
                            .then(priceData => {
                                if (priceData && priceData.data && priceData.data.amount) {
                                    harshiData.currentPrice = parseFloat(priceData.data.amount);
                                } else {
                                    // Fallback current price if API fails
                                    harshiData.currentPrice = harshiData.buyPrice * 1.2; // 20% increase as example
                                }
                                console.log("Final updated Harshi data:", harshiData);
                                updateHarshiUI();
                            })
                            .catch(error => {
                                console.warn('Error fetching current price, using fallback:', error);
                                harshiData.currentPrice = harshiData.buyPrice * 1.2; // 20% increase as fallback
                                console.log("Final updated Harshi data with fallback price:", harshiData);
                                updateHarshiUI();
                            });
                    } else {
                        throw new Error('Could not find any valid entry in data');
                    }
                } else {
                    throw new Error('Invalid or empty data from GitHub API');
                }
            })
            .catch(error => {
                console.error('Error fetching data from GitHub:', error);
                console.log("Showing Harshi error");
                showHarshiError();
            });
    }
    
    /**
     * Updates the Dogecoin UI with the latest data
     */
    function updateDogecoinUI() {
        // Calculate derived values
        const investedAmount = dogeData.quantity * dogeData.buyPrice;
        const currentValue = dogeData.quantity * dogeData.currentPrice;
        const profitLoss = currentValue - investedAmount;
        const profitLossPercentage = (profitLoss / investedAmount) * 100;
        
        // Update UI elements
        dogeUserName.textContent = dogeData.userName;
        dogeQuantity.textContent = formatQuantity(dogeData.quantity);
        dogeBuyPrice.textContent = '$' + formatPrice(dogeData.buyPrice);
        dogeInvestedAmount.textContent = '$' + formatNumber(investedAmount);
        dogeCurrentPrice.textContent = '$' + formatPrice(dogeData.currentPrice);
        
        // Format profit/loss with dollar amount first, percentage below
        const profitLossSign = profitLoss >= 0 ? '+' : '';
        dogeProfitLoss.textContent = '$' + profitLossSign + formatNumber(profitLoss);
        dogeProfitLossPercentage.textContent = profitLossSign + formatNumber(profitLossPercentage) + '%';
        
        // Add appropriate color class based on profit/loss
        if (profitLoss >= 0) {
            dogeProfitLossRow.classList.add('positive');
        } else {
            dogeProfitLossRow.classList.remove('positive');
        }
        
        // Update total value
        dogeTotalValue.textContent = '$' + formatNumber(currentValue);
        
        // Show the details container
        dogeLoader.classList.add('hidden');
        dogeDetailsContainer.classList.remove('hidden');
        dogeErrorMessage.classList.add('hidden');
    }
    
    /**
     * Updates the Harshi UI with the latest data
     */
    function updateHarshiUI() {
        console.log("Updating Harshi UI with data:", harshiData);
        
        // Calculate derived values
        const investedAmount = harshiData.quantity * harshiData.buyPrice;
        const currentValue = harshiData.quantity * harshiData.currentPrice;
        const profitLoss = currentValue - investedAmount;
        const profitLossPercentage = (profitLoss / investedAmount) * 100;
        
        console.log("Harshi calculations:", { investedAmount, currentValue, profitLoss, profitLossPercentage });
        
        // Update UI elements
        harshiUserName.textContent = harshiData.userName;
        harshiQuantity.textContent = formatQuantity(harshiData.quantity);
        harshiBuyPrice.textContent = '$' + formatPrice(harshiData.buyPrice);
        harshiInvestedAmount.textContent = '$' + formatNumber(investedAmount);
        harshiCurrentPrice.textContent = '$' + formatPrice(harshiData.currentPrice);
        
        // Format profit/loss with dollar amount first, percentage below
        const profitLossSign = profitLoss >= 0 ? '+' : '';
        harshiProfitLoss.textContent = '$' + profitLossSign + formatNumber(profitLoss);
        harshiProfitLossPercentage.textContent = profitLossSign + formatNumber(profitLossPercentage) + '%';
        
        // Add appropriate color class based on profit/loss
        if (profitLoss >= 0) {
            harshiProfitLossRow.classList.add('positive');
        } else {
            harshiProfitLossRow.classList.remove('positive');
        }
        
        // Update total value
        harshiTotalValue.textContent = '$' + formatNumber(currentValue);
        
        // Show the details container
        console.log("Showing Harshi details container");
        console.log("Container elements:", {
            loader: harshiLoader,
            container: harshiDetailsContainer,
            error: harshiErrorMessage
        });
        
        harshiLoader.classList.add('hidden');
        harshiDetailsContainer.classList.remove('hidden');
        harshiErrorMessage.classList.add('hidden');
        
        console.log("Class list after update:", {
            loaderHidden: harshiLoader.classList.contains('hidden'),
            containerHidden: harshiDetailsContainer.classList.contains('hidden'),
            errorHidden: harshiErrorMessage.classList.contains('hidden')
        });
    }
    
    /**
     * Shows error message for Dogecoin data
     */
    function showDogeError() {
        dogeLoader.classList.add('hidden');
        dogeDetailsContainer.classList.add('hidden');
        dogeErrorMessage.classList.remove('hidden');
    }
    
    /**
     * Shows error message for Harshi data
     */
    function showHarshiError() {
        harshiLoader.classList.add('hidden');
        harshiDetailsContainer.classList.add('hidden');
        harshiErrorMessage.classList.remove('hidden');
    }
});