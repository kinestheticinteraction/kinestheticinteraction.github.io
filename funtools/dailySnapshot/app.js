document.addEventListener('DOMContentLoaded', () => {
    const tickerInput = document.getElementById('tickerInput');

    const resultCard = document.getElementById('resultCard');
    const skeletonCard = document.getElementById('skeletonCard');
    const landingContent = document.getElementById('landingContent');
    const backBtn = document.getElementById('backBtn');
    const legalText = document.getElementById('legalText');
    const recentSection = document.getElementById('recentSection');
    const recentTickerGrid = document.getElementById('recentTickerGrid');
    const clearRecentBtn = document.getElementById('clearRecentBtn');

    // Load recent searches
    let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

    function updateRecentGrid() {
        if (!recentTickerGrid) return;
        recentTickerGrid.innerHTML = '';
        recentSearches.forEach(ticker => {
            const btn = document.createElement('button');
            btn.className = 'ticker-pill';
            btn.setAttribute('data-ticker', ticker);
            btn.textContent = ticker;
            btn.addEventListener('click', () => {
                tickerInput.value = ticker;
                analyzeTicker();
            });
            recentTickerGrid.appendChild(btn);
        });

        if (recentSearches.length > 0) {
            recentSection.classList.remove('hidden');
            recentSection.classList.remove('collapsed');
        } else {
            recentSection.classList.add('hidden');
        }
    }

    updateRecentGrid();
    loadPopularChanges();

    // Handle clear button click
    if (clearRecentBtn) {
        clearRecentBtn.addEventListener('click', () => {
            recentSection.classList.add('collapsed');
            setTimeout(() => {
                recentSearches = [];
                localStorage.removeItem('recentSearches');
                updateRecentGrid();
            }, 150);
        });
    }

    // Handle back button click
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            resultCard.classList.add('hidden');
            skeletonCard.classList.add('hidden');
            landingContent.classList.remove('hidden');
            backBtn.classList.remove('visible');
            if (legalText) legalText.classList.add('hidden');
            tickerInput.value = '';
        });
    }

    // Handle ticker pill clicks
    document.querySelectorAll('.ticker-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            const ticker = pill.getAttribute('data-ticker');
            tickerInput.value = ticker;
            analyzeTicker();
        });
    });

    async function loadPopularChanges() {
        const popularSection = document.querySelector('.popular-section');
        if (!popularSection) return;

        function updatePills(data) {
            const grid = popularSection.querySelector('.ticker-grid');
            if (!grid) return;

            const pills = Array.from(grid.querySelectorAll('.ticker-pill'));
            
            // Measure initial height
            const initialHeight = popularSection.getBoundingClientRect().height;

            // Sort pills: most down to most up
            pills.sort((a, b) => {
                const tickerA = a.getAttribute('data-ticker');
                const tickerB = b.getAttribute('data-ticker');
                const valA = data[tickerA] ? parseFloat(data[tickerA].replace('%', '')) : 0;
                const valB = data[tickerB] ? parseFloat(data[tickerB].replace('%', '')) : 0;
                return valA - valB;
            });

            // Re-append in sorted order and update content
            pills.forEach(pill => {
                grid.appendChild(pill);
                const ticker = pill.getAttribute('data-ticker');
                if (data[ticker]) {
                    pill.classList.remove('loading');
                    const isNegative = data[ticker].startsWith('-');
                    const arrow = isNegative ? '▼' : '▲';
                    let changeVal = data[ticker];
                    if (isNegative) {
                        changeVal = changeVal.substring(1); // Remove '-'
                    }
                    pill.innerHTML = `${ticker} <span class="pill-change ${isNegative ? 'negative' : 'positive'}"><span>${arrow}</span><span>${changeVal}</span></span>`;
                }
            });
            
            // Measure final height
            const finalHeight = popularSection.getBoundingClientRect().height;
            const heightDiff = finalHeight - initialHeight;
            
            if (heightDiff !== 0) {
                const portfolioSection = document.querySelector('.portfolio-section');
                const discoverSection = document.querySelector('.discover-section');
                const sectionsBelow = [portfolioSection, discoverSection].filter(Boolean);
                
                sectionsBelow.forEach(sec => {
                    sec.style.transition = 'none';
                    sec.style.transform = `translateY(-${heightDiff}px)`;
                    
                    // Force reflow
                    sec.offsetHeight;
                    
                    sec.style.transition = 'transform 0.3s cubic-bezier(0.32, 0, 0, 1)';
                    sec.style.transform = 'translateY(0)';
                });
            }
        }

        try {
            const response = await fetch('https://docs.google.com/spreadsheets/d/11XiXiSL0MsypxmX14yExsP5yXSbfxl0kvk7Q-H_3mXA/export?format=csv');
            const csvText = await response.text();
            const lines = csvText.split(/\r?\n/);
            const data = {};
            lines.forEach(line => {
                const parts = line.split(',');
                if (parts.length >= 3) {
                    const ticker = parts[1].trim();
                    const change = parts[2].trim();
                    if (ticker && change) {
                        data[ticker] = change;
                    }
                }
            });
            updatePills(data);
        } catch (error) {
            console.error('Error loading popular changes:', error);
            // Fallback data from sheet
            const fallbackData = {
                'NVDA': '2.61%',
                'GOOG': '-0.17%',
                'META': '0.23%',
                'TSLA': '0.99%',
                'AAPL': '1.50%',
                'AMZN': '2.02%',
                'MSFT': '-0.59%'
            };
            updatePills(fallbackData);
        }
    }

    const resultTicker = document.getElementById('resultTicker');
    const resultPrice = document.getElementById('resultPrice');
    const movementBadge = document.getElementById('movementBadge');
    const reasonText = document.getElementById('reasonText');
    const timestamp = document.getElementById('timestamp');
    const refreshBtn = document.getElementById('refreshBtn');

    // Hardcoded Gemini API Key
    const GEMINI_API_KEY = 'AIzaSyCmVRQEETpmhuv-oxKB7UDggXKd1K-XlbY';

    // Hardcoded Finnhub API Key
    const FINNHUB_API_KEY = 'd7bavn1r01qgc9t6ntcgd7bavn1r01qgc9t6ntd0';

    async function fetchFinnhubData(ticker) {
        const url = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${FINNHUB_API_KEY}`;
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (!data.c) {
                console.error('Finnhub Error: No data returned');
                return null;
            }

            return {
                price: data.c.toFixed(2),
                change: data.d.toFixed(2),
                changePercent: (data.dp >= 0 ? '+' : '') + data.dp.toFixed(2) + '%',
                currency: 'USD'
            };
        } catch (error) {
            console.error('Finnhub Error:', error);
            return null;
        }
    }

    async function fetchFinnhubNews(ticker) {
        const today = new Date().toISOString().slice(0, 10);
        const fromDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10); // Last 3 days
        const url = `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${fromDate}&to=${today}&token=${FINNHUB_API_KEY}`;
        try {
            const response = await fetch(url);
            const data = await response.json();

            // Return top 5 headlines
            return data.slice(0, 5).map(item => item.headline).join('\n');
        } catch (error) {
            console.error('Finnhub News Error:', error);
            return 'No recent news found.';
        }
    }





    async function fetchGeminiReason(ticker, price, changePercent, news) {


        const prompt = `Summarize the stock movement for ${ticker} today. 
        It is currently trading at ${price} (${changePercent}).
        
        Here are some recent news headlines for ${ticker}:
        ${news}
        
        Provide exactly 3 bullet points of summary explaining why it might be moving or what the general sentiment is based on the news.
        Prioritize looking for:
        
        - New deals, partnerships, or product announcements
        - Management comments or analyst rating/price target changes
        - Earnings reports or guidance
        - Insider buying or selling activity

        
        Format the response in structured JSON with:
        - "header": A string like "Possible factors in ${ticker} going [up/down/flat] today:"
        - "bullets": An array of exactly 3 short strings representing factors.`;

        // gemini 3
        // const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`;
        //gemini 2.5
        //const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        //gemma 4 31b
        //const url = `https://generativelanguage.googleapis.com/v1beta/models/gemma-4-31b-it:generateContent?key=${GEMINI_API_KEY}`;

        const models = [
            'gemini-3-flash-preview',
            'gemini-2.5-flash',
            'gemini-2.5-flash-lite',
            'gemma-4-31b-it',
            'gemini-3.1-flash-lite-preview'
        ];

        const model = models[3];
        console.log("using model " + model + "for " + ticker);

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;


        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        responseMimeType: "application/json",
                        responseSchema: {
                            type: "OBJECT",
                            properties: {
                                header: { type: "STRING", description: "A header sentence explaining the direction." },
                                bullets: {
                                    type: "ARRAY",
                                    items: { type: "STRING" },
                                    description: "Exactly 3 bullet points representing factors."
                                }
                            },
                            required: ["header", "bullets"],
                        }
                    }
                })
            });

            if (response.status === 429) {
                // return "You've hit your Snapshot limit for now. Try again in an hour.";
            }

            const data = await response.json();
            if (data.error) {
                console.error('Gemini Error:', data.error);
                if (data.error.status === 'RESOURCE_EXHAUSTED' || data.error.code === 429) {
                    // return "You've hit your Snapshot limit for now. Try again in an hour.";
                }
                return `Error from AI: ${data.error.message}`;
            }

            if (!data.candidates || data.candidates.length === 0) {
                return 'Error from AI: No response generated.';
            }
            const textResponse = data.candidates[0].content.parts[0].text;
            return JSON.parse(textResponse || "{}");
        } catch (error) {
            console.error('Fetch Error:', error);
            return 'Failed to connect to the AI service. Please check your network and API key.';
        }
    }

    async function analyzeTicker() {
        const ticker = tickerInput.value.toUpperCase().trim();

        // Flash effect removed from here, handled by mousedown/mouseup on button

        if (!ticker) {
            reasonText.textContent = 'Please enter a stock ticker';
            resultTicker.textContent = 'N/A';
            resultPrice.textContent = 'N/A';
            movementBadge.className = 'movement-pill badge-flat';
            const percent = movementBadge.querySelector('.percent');
            if (percent) percent.textContent = 'N/A';
            resultCard.classList.remove('hidden');
            skeletonCard.classList.add('hidden');
            return;
        }

        // Blur the input to remove focus and flashing cursor
        tickerInput.blur();

        // Save to recent searches
        if (!recentSearches.includes(ticker)) {
            recentSearches.unshift(ticker);
            if (recentSearches.length > 5) recentSearches.pop();
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
            updateRecentGrid();
        } else {
            recentSearches = recentSearches.filter(t => t !== ticker);
            recentSearches.unshift(ticker);
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
            updateRecentGrid();
        }

        // Reset UI
        resultCard.classList.add('hidden');
        skeletonCard.classList.remove('hidden');
        if (landingContent) landingContent.classList.add('hidden');
        if (backBtn) backBtn.classList.add('visible');



        let price = 'N/A';
        let changePercent = 'N/A';
        let aiData;

        // if (ticker === 'AVGO') {
        //     price = "$1402.50";
        //     changePercent = "+1.76%";
        //     aiData = {
        //         header: "Possible contributing factors to AVGO going up today:",
        //         bullets: [
        //             "Strong demand for custom AI accelerators and networking chips continues to drive growth.",
        //             "Analysts raised price targets following positive checks on enterprise software integration.",
        //             "The broader semiconductor sector is experiencing a relief rally today."
        //         ]
        //     };
        // } else {
        const finnhubData = await fetchFinnhubData(ticker);
        const news = await fetchFinnhubNews(ticker);

        if (finnhubData) {
            price = `$${finnhubData.price}`;
            changePercent = finnhubData.changePercent;
        }

        aiData = await fetchGeminiReason(ticker, price, changePercent, news);
        // }

        // Hide skeleton and show result
        skeletonCard.classList.add('hidden');
        resultCard.classList.remove('hidden');
        if (legalText) legalText.classList.remove('hidden');



        resultTicker.textContent = ticker;

        // Reset pill classes
        movementBadge.className = 'movement-pill';
        const percent = movementBadge.querySelector('.percent');

        const isDown = changePercent.includes('-');
        const isFlat = changePercent === 'N/A' || changePercent === '0%';

        movementBadge.classList.add(isFlat ? 'badge-flat' : (isDown ? 'badge-down' : 'badge-up'));
        percent.textContent = changePercent;

        // Update icon orientation
        const trendIcon = movementBadge.querySelector('.trend-icon');
        if (isFlat) {
            trendIcon.innerHTML = `<line x1="5" y1="12" x2="19" y2="12"></line>`;
        } else if (isDown) {
            trendIcon.innerHTML = `<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline>`;
        } else {
            trendIcon.innerHTML = `<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>`;
        }

        if (typeof aiData === 'object' && aiData.bullets && Array.isArray(aiData.bullets)) {
            reasonText.innerHTML = `
                <p class="summary-header">${aiData.header || `Possible factors in ${ticker} going ${isDown ? 'down' : 'up'} today:`}</p>
                <ul class="bullet-list">
                    ${aiData.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
                </ul>`;

            resultPrice.textContent = price;

        } else if (typeof aiData === 'object' && aiData.summary) {
            reasonText.textContent = aiData.summary;
            resultPrice.textContent = aiData.price || '$0.00';

            const changePct = aiData.changePercent || '0%';
            const isDown = changePct.includes('-');

            movementBadge.classList.add(isDown ? 'badge-down' : 'badge-up');
            percent.textContent = changePct;
        } else {
            // Error handling
            console.error('Invalid AI Data:', aiData);
            reasonText.textContent = typeof aiData === 'string' ? aiData : 'Error: Received invalid data structure from AI.';
            resultPrice.textContent = 'N/A';
            movementBadge.classList.add('badge-flat');
            percent.textContent = 'N/A';
        }

        // Update timestamp
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
        timestamp.textContent = `Last update ${timeString.replace(' ', '')} PST`;
    }



    tickerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            analyzeTicker();
        }
    });

    tickerInput.addEventListener('focus', () => {
        setTimeout(() => {
            tickerInput.select();
        }, 0);
    });

    refreshBtn.addEventListener('click', () => {
        analyzeTicker();
    });
});
