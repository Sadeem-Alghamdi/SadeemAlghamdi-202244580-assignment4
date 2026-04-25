/* =========================
   CONFIG
========================= */
const GITHUB_USERNAME = "Sadeem-Alghamdi";
const WEATHER_LAT = 26.4207;
const WEATHER_LON = 50.0888;
const WEATHER_LABEL = "Al-Khobar, Saudi Arabia";

/* =========================
   DOM
========================= */
const yearEl = document.getElementById("year");
const greetingEl = document.getElementById("greeting");
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const html = document.documentElement;
const progressBar = document.getElementById("progressBar");
const scrollTopBtn = document.getElementById("scrollTopBtn");

const visitorNameInput = document.getElementById("visitorName");
const saveNameBtn = document.getElementById("saveNameBtn");
const clearNameBtn = document.getElementById("clearNameBtn");
const personalGreeting = document.getElementById("personalGreeting");

const counters = document.querySelectorAll(".counter");
const revealSections = document.querySelectorAll(".section");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const projectSearch = document.getElementById("projectSearch");
const emptyMessage = document.getElementById("emptyMessage");
const favoriteMessage = document.getElementById("favoriteMessage");
const favoriteButtons = document.querySelectorAll(".favorite-btn");
const resultsCount = document.getElementById("resultsCount");

const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalIcon = document.getElementById("modalIcon");

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const messageInput = document.getElementById("message");
const messageCounter = document.getElementById("messageCounter");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const githubProfileLoading = document.getElementById("githubProfileLoading");
const githubProfileError = document.getElementById("githubProfileError");
const githubProfile = document.getElementById("githubProfile");
const githubAvatar = document.getElementById("githubAvatar");
const githubName = document.getElementById("githubName");
const githubUsername = document.getElementById("githubUsername");
const githubBio = document.getElementById("githubBio");
const githubReposCount = document.getElementById("githubReposCount");
const githubFollowers = document.getElementById("githubFollowers");
const githubFollowing = document.getElementById("githubFollowing");
const githubProfileLink = document.getElementById("githubProfileLink");
const githubReposLoading = document.getElementById("githubReposLoading");
const githubReposError = document.getElementById("githubReposError");
const githubReposContainer = document.getElementById("githubRepos");
const refreshGithubBtn = document.getElementById("refreshGithubBtn");

const quoteLoading = document.getElementById("quoteLoading");
const quoteError = document.getElementById("quoteError");
const quoteBox = document.getElementById("quoteBox");
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteBtn = document.getElementById("newQuoteBtn");

const weatherLoading = document.getElementById("weatherLoading");
const weatherError = document.getElementById("weatherError");
const weatherBox = document.getElementById("weatherBox");
const weatherLocation = document.getElementById("weatherLocation");
const weatherDescription = document.getElementById("weatherDescription");
const weatherTemp = document.getElementById("weatherTemp");
const weatherWind = document.getElementById("weatherWind");
const weatherHumidity = document.getElementById("weatherHumidity");
const weatherUpdated = document.getElementById("weatherUpdated");
const weatherIcon = document.getElementById("weatherIcon");
const refreshWeatherBtn = document.getElementById("refreshWeatherBtn");

const assistantQuestions = document.querySelectorAll(".assistant-question");
const assistantAnswer = document.getElementById("assistantAnswer");

let activeFilter = "all";
let countersStarted = false;
let lastFocusedButton = null;

/* =========================
   HELPERS
========================= */
function sanitizeText(value) {
    return value.trim().replace(/[<>]/g, "");
}

function clearFieldError(inputEl, errorEl) {
    inputEl.classList.remove("input-error");
    errorEl.textContent = "";
}

function showFieldError(inputEl, errorEl, message) {
    inputEl.classList.add("input-error");
    errorEl.textContent = message;
}

function formatNumber(num) {
    return new Intl.NumberFormat().format(num);
}

async function fetchJSON(url, options = {}) {
    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
}

/* =========================
   FOOTER YEAR
========================= */
yearEl.textContent = new Date().getFullYear();

/* =========================
   GREETING
========================= */
function updateGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) {
        greetingEl.textContent = "Good Morning ☀️";
    } else if (hour < 18) {
        greetingEl.textContent = "Good Afternoon 👋";
    } else {
        greetingEl.textContent = "Good Evening 🌙";
    }
}

updateGreeting();

/* =========================
   THEME
========================= */
const themeIcon = themeToggle.querySelector("i");

function updateThemeIcon(theme) {
    themeIcon.classList.remove("fa-moon", "fa-sun");

    if (theme === "dark") {
        themeIcon.classList.add("fa-sun");
    } else {
        themeIcon.classList.add("fa-moon");
    }
}

const savedTheme = localStorage.getItem("theme") || "dark";
html.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
});

/* =========================
   MOBILE NAV
========================= */
function closeMobileMenu() {
    navMenu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");

    const icon = menuToggle.querySelector("i");
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
}

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    const isOpen = navMenu.classList.contains("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));

    const icon = menuToggle.querySelector("i");

    if (isOpen) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
});

document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});

document.addEventListener("click", (e) => {
    const clickedInsideMenu = navMenu.contains(e.target);
    const clickedMenuButton = menuToggle.contains(e.target);

    if (!clickedInsideMenu && !clickedMenuButton && navMenu.classList.contains("active")) {
        closeMobileMenu();
    }
});

/* =========================
   SMOOTH SCROLL
========================= */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);

        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

/* =========================
   ACTIVE NAV
========================= */
const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {
    let currentSectionId = "";

    sections.forEach((section) => {
        const top = window.scrollY;
        const offset = section.offsetTop - 140;
        const height = section.offsetHeight;

        if (top >= offset && top < offset + height) {
            currentSectionId = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSectionId}`) {
            link.classList.add("active");
        }
    });
}

/* =========================
   SCROLL PROGRESS
========================= */
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    progressBar.style.width = `${progress}%`;

    if (scrollTop > 300) {
        scrollTopBtn.classList.add("visible");
    } else {
        scrollTopBtn.classList.remove("visible");
    }
}

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* =========================
   PERSONALIZED GREETING
========================= */
function renderSavedName() {
    const savedName = localStorage.getItem("visitorName");

    if (savedName) {
        personalGreeting.textContent = `Welcome back, ${savedName}!`;
    } else {
        personalGreeting.textContent = "Save your name to personalize this portfolio.";
    }
}

renderSavedName();

function saveVisitorName() {
    const nameValue = sanitizeText(visitorNameInput.value);

    if (!nameValue) {
        personalGreeting.textContent = "Please enter your name before saving.";
        return;
    }

    localStorage.setItem("visitorName", nameValue);
    personalGreeting.textContent = `Welcome back, ${nameValue}!`;
    visitorNameInput.value = "";
}

saveNameBtn.addEventListener("click", saveVisitorName);

visitorNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        saveVisitorName();
    }
});

clearNameBtn.addEventListener("click", () => {
    localStorage.removeItem("visitorName");
    visitorNameInput.value = "";
    renderSavedName();
});

/* =========================
   COUNTERS
========================= */
function startCounters() {
    if (countersStarted) return;

    countersStarted = true;

    counters.forEach((counter) => {
        const target = Number(counter.dataset.target);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 30));

        const interval = setInterval(() => {
            current += step;

            if (current >= target) {
                counter.textContent = target;
                clearInterval(interval);
            } else {
                counter.textContent = current;
            }
        }, 40);
    });
}

/* =========================
   REVEAL ON SCROLL
========================= */
revealSections.forEach((section) => section.classList.add("reveal"));

function revealOnScroll() {
    revealSections.forEach((section, index) => {
        const top = section.getBoundingClientRect().top;
        const visiblePoint = window.innerHeight - 110;

        if (top < visiblePoint) {
            section.classList.add("visible");

            if (index === 0) {
                startCounters();
            }
        }
    });
}

/* =========================
   PROJECTS
========================= */
function updateProjects() {
    const searchValue = projectSearch.value.toLowerCase().trim();
    let visibleCount = 0;

    projectCards.forEach((card) => {
        const category = card.dataset.category;
        const title = card.dataset.title.toLowerCase();
        const keywords = card.dataset.keywords.toLowerCase();

        const matchesFilter = activeFilter === "all" || category === activeFilter;
        const matchesSearch = title.includes(searchValue) || keywords.includes(searchValue);

        if (matchesFilter && matchesSearch) {
            card.classList.remove("hidden");
            visibleCount++;
        } else {
            card.classList.add("hidden");
        }
    });

    resultsCount.textContent = `${visibleCount} project(s) shown.`;
    emptyMessage.textContent = visibleCount === 0 ? "No projects found. Try another keyword or category." : "";
}

filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
        activeFilter = this.dataset.filter;

        filterButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        updateProjects();
    });
});

projectSearch.addEventListener("input", updateProjects);

/* =========================
   FAVORITE PROJECT
========================= */
function renderFavoriteState() {
    const savedFavorite = localStorage.getItem("favoriteProject");

    favoriteButtons.forEach((button) => {
        const card = button.closest(".project-card");
        const projectName = card.dataset.project;
        const icon = button.querySelector("i");

        if (savedFavorite === projectName) {
            button.classList.add("saved");
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
        } else {
            button.classList.remove("saved");
            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");
        }
    });

    favoriteMessage.textContent = savedFavorite
        ? `Favorite project saved: ${savedFavorite}`
        : "You have not selected a favorite project yet.";
}

favoriteButtons.forEach((button) => {
    button.addEventListener("click", function () {
        const card = this.closest(".project-card");
        const projectName = card.dataset.project;
        const currentFavorite = localStorage.getItem("favoriteProject");

        if (currentFavorite === projectName) {
            localStorage.removeItem("favoriteProject");
        } else {
            localStorage.setItem("favoriteProject", projectName);
        }

        renderFavoriteState();
    });
});

/* =========================
   MODAL
========================= */
document.querySelectorAll(".open-modal-btn").forEach((button) => {
    button.addEventListener("click", function () {
        lastFocusedButton = this;

        const card = this.closest(".project-card");
        const title = card.dataset.project;
        const description = card.dataset.description;
        const iconHTML = card.querySelector(".project-icon").innerHTML;

        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalIcon.innerHTML = iconHTML;

        modalOverlay.classList.add("active");
        modalOverlay.setAttribute("aria-hidden", "false");
        modalClose.focus();
    });
});

function closeModal() {
    modalOverlay.classList.remove("active");
    modalOverlay.setAttribute("aria-hidden", "true");

    if (lastFocusedButton) {
        lastFocusedButton.focus();
    }
}

modalClose.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
        closeModal();
    }
});

/* =========================
   TABS
========================= */
tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
        const selectedTab = this.dataset.tab;

        tabButtons.forEach((btn) => {
            btn.classList.remove("active");
            btn.setAttribute("aria-selected", "false");
        });

        tabContents.forEach((content) => content.classList.remove("active"));

        this.classList.add("active");
        this.setAttribute("aria-selected", "true");
        document.getElementById(selectedTab).classList.add("active");
    });
});

/* =========================
   CONTACT FORM
========================= */
function updateMessageCounter() {
    const currentLength = messageInput.value.length;
    messageCounter.textContent = `${currentLength} / 300`;
}

updateMessageCounter();

messageInput.addEventListener("input", updateMessageCounter);

[nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("input", () => {
        if (input === nameInput) clearFieldError(nameInput, nameError);
        if (input === emailInput) clearFieldError(emailInput, emailError);
        if (input === messageInput) clearFieldError(messageInput, messageError);
        formMessage.textContent = "";
    });
});

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = sanitizeText(nameInput.value);
    const email = emailInput.value.trim();
    const message = sanitizeText(messageInput.value);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    clearFieldError(nameInput, nameError);
    clearFieldError(emailInput, emailError);
    clearFieldError(messageInput, messageError);
    formMessage.textContent = "";

    if (!name) {
        showFieldError(nameInput, nameError, "Please enter your name.");
        isValid = false;
    } else if (name.length < 2) {
        showFieldError(nameInput, nameError, "Name must be at least 2 characters.");
        isValid = false;
    }

    if (!email) {
        showFieldError(emailInput, emailError, "Please enter your email.");
        isValid = false;
    } else if (!emailPattern.test(email)) {
        showFieldError(emailInput, emailError, "Please enter a valid email address.");
        isValid = false;
    }

    if (!message) {
        showFieldError(messageInput, messageError, "Please enter your message.");
        isValid = false;
    } else if (message.length < 10) {
        showFieldError(messageInput, messageError, "Message must be at least 10 characters.");
        isValid = false;
    }

    if (!isValid) {
        formMessage.textContent = "❌ Please fix the highlighted fields.";
        formMessage.style.color = "var(--error)";
        return;
    }

    const submittedAt = new Date().toLocaleString();

    formMessage.innerHTML = `
        <div class="submission-preview">
            <strong>✅ Message received successfully.</strong><br>
            Thank you, ${name}. This is a front-end simulation of a professional contact workflow.<br>
            <span>Submitted at: ${submittedAt}</span>
        </div>
    `;

    formMessage.style.color = "var(--text)";
    contactForm.reset();
    updateMessageCounter();
});

/* =========================
   GITHUB API
========================= */
function renderGitHubProfile(user) {
    githubAvatar.src = user.avatar_url;
    githubAvatar.alt = `${user.login} avatar`;
    githubName.textContent = user.name || user.login;
    githubUsername.textContent = `@${user.login}`;
    githubBio.textContent = user.bio || "No bio available.";
    githubReposCount.textContent = formatNumber(user.public_repos);
    githubFollowers.textContent = formatNumber(user.followers);
    githubFollowing.textContent = formatNumber(user.following);
    githubProfileLink.href = user.html_url;
}

function createRepoCard(repo) {
    const article = document.createElement("article");
    article.className = "repo-item";

    const language = repo.language || "Not specified";
    const description = repo.description || "No description available.";

    article.innerHTML = `
        <div class="repo-title-row">
            <a class="repo-title" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
            <span class="repo-tag">${language}</span>
        </div>
        <p class="repo-desc">${description}</p>
        <div class="repo-meta">
            <span><i class="fa-solid fa-star"></i> ${repo.stargazers_count}</span>
            <span><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</span>
            <span><i class="fa-solid fa-clock"></i> Updated ${new Date(repo.updated_at).toLocaleDateString()}</span>
        </div>
    `;

    return article;
}

async function loadGitHubData() {
    githubProfileLoading.textContent = "Loading GitHub profile...";
    githubReposLoading.textContent = "Loading repositories...";
    githubProfileError.textContent = "";
    githubReposError.textContent = "";
    githubReposContainer.innerHTML = "";
    githubProfile.classList.add("hidden");

    try {
        const [user, repos] = await Promise.all([
            fetchJSON(`https://api.github.com/users/${GITHUB_USERNAME}`),
            fetchJSON(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=4`)
        ]);

        renderGitHubProfile(user);
        githubProfile.classList.remove("hidden");

        if (!repos.length) {
            githubReposContainer.innerHTML = `<p class="muted">No repositories found.</p>`;
        } else {
            repos.forEach((repo) => {
                githubReposContainer.appendChild(createRepoCard(repo));
            });
        }

        githubProfileLoading.textContent = "";
        githubReposLoading.textContent = "";
    } catch (error) {
        githubProfileLoading.textContent = "";
        githubReposLoading.textContent = "";
        githubProfileError.textContent = "Could not load GitHub profile.";
        githubReposError.textContent = "Could not load GitHub repositories.";
        console.error("GitHub API error:", error);
    }
}

refreshGithubBtn.addEventListener("click", loadGitHubData);

/* =========================
   QUOTE API
========================= */
async function loadQuote() {
    quoteLoading.textContent = "Loading quote...";
    quoteError.textContent = "";
    quoteBox.classList.add("hidden");

    try {
        const data = await fetchJSON("https://dummyjson.com/quotes/random");

        quoteText.textContent = `"${data.quote}"`;
        quoteAuthor.textContent = `— ${data.author}`;

        quoteLoading.textContent = "";
        quoteBox.classList.remove("hidden");
    } catch (error) {
        quoteLoading.textContent = "";
        quoteError.textContent = "Could not load quote right now.";
        console.error("Quote API error:", error);
    }
}

newQuoteBtn.addEventListener("click", loadQuote);

/* =========================
   WEATHER API
========================= */
function getWeatherDescription(code) {
    const map = {
        0: { text: "Clear sky", icon: "fa-sun" },
        1: { text: "Mainly clear", icon: "fa-cloud-sun" },
        2: { text: "Partly cloudy", icon: "fa-cloud-sun" },
        3: { text: "Overcast", icon: "fa-cloud" },
        45: { text: "Fog", icon: "fa-smog" },
        48: { text: "Depositing rime fog", icon: "fa-smog" },
        51: { text: "Light drizzle", icon: "fa-cloud-rain" },
        53: { text: "Moderate drizzle", icon: "fa-cloud-rain" },
        55: { text: "Dense drizzle", icon: "fa-cloud-rain" },
        61: { text: "Slight rain", icon: "fa-cloud-showers-heavy" },
        63: { text: "Moderate rain", icon: "fa-cloud-showers-heavy" },
        65: { text: "Heavy rain", icon: "fa-cloud-showers-heavy" },
        71: { text: "Slight snow", icon: "fa-snowflake" },
        73: { text: "Moderate snow", icon: "fa-snowflake" },
        75: { text: "Heavy snow", icon: "fa-snowflake" },
        80: { text: "Rain showers", icon: "fa-cloud-showers-heavy" },
        81: { text: "Rain showers", icon: "fa-cloud-showers-heavy" },
        82: { text: "Violent rain showers", icon: "fa-cloud-showers-heavy" },
        95: { text: "Thunderstorm", icon: "fa-bolt" },
        96: { text: "Thunderstorm with hail", icon: "fa-bolt" },
        99: { text: "Thunderstorm with hail", icon: "fa-bolt" }
    };

    return map[code] || { text: "Unknown condition", icon: "fa-cloud" };
}

async function loadWeather() {
    weatherLoading.textContent = "Loading weather...";
    weatherError.textContent = "";
    weatherBox.classList.add("hidden");

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${WEATHER_LAT}&longitude=${WEATHER_LON}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

    try {
        const data = await fetchJSON(url);
        const current = data.current;
        const condition = getWeatherDescription(current.weather_code);

        weatherLocation.textContent = WEATHER_LABEL;
        weatherDescription.textContent = condition.text;
        weatherTemp.textContent = `${Math.round(current.temperature_2m)}°C`;
        weatherWind.textContent = Math.round(current.wind_speed_10m);
        weatherHumidity.textContent = current.relative_humidity_2m;
        weatherUpdated.textContent = `Last updated: ${new Date(current.time).toLocaleString()}`;

        weatherIcon.className = `fa-solid ${condition.icon} weather-icon`;

        weatherLoading.textContent = "";
        weatherBox.classList.remove("hidden");
    } catch (error) {
        weatherLoading.textContent = "";
        weatherError.textContent = "Could not load weather right now.";
        console.error("Weather API error:", error);
    }
}

refreshWeatherBtn.addEventListener("click", loadWeather);

/* =========================
   AI PORTFOLIO ASSISTANT
========================= */
const assistantResponses = {
    about: "Sadeem Alghamdi is a Software Engineering student at KFUPM who focuses on building clean, interactive, and user-centered web applications. This portfolio presents her technical growth, projects, skills, and ability to connect front-end interfaces with real-world data.",

    projects: "The portfolio includes projects such as a Horse Racing Database, KFUPM Map Tool, and Course Tutoring App. Each project highlights a different skill area, including database design, Java programming, software problem-solving, and user experience design.",

    tech: "This application uses HTML for structure, CSS for responsive styling and themes, and JavaScript for interaction, validation, localStorage, API calls, DOM rendering, and event handling. It also connects to GitHub, Quote, and Weather APIs.",

    ai: "AI was used as a support tool for brainstorming, debugging, documentation improvement, and UI/UX suggestions. The final implementation was reviewed, modified, tested, and adapted to match the assignment requirements and maintain academic integrity.",

    future: "Future improvements could include connecting the contact form to a real backend, adding a project case-study page, improving the resume viewer, adding more accessibility testing, and expanding the assistant into a real AI-powered chatbot."
};

assistantQuestions.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedAnswer = button.dataset.answer;

        assistantQuestions.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        assistantAnswer.textContent = assistantResponses[selectedAnswer];
    });
});

/* =========================
   INITIAL LOAD
========================= */
window.addEventListener("scroll", () => {
    updateScrollProgress();
    updateActiveNav();
    revealOnScroll();
});

window.addEventListener("load", () => {
    updateProjects();
    renderFavoriteState();
    revealOnScroll();
    updateScrollProgress();
    updateActiveNav();
    loadGitHubData();
    loadQuote();
    loadWeather();
});