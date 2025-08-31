document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    // Get the current <script> element and its tabindex, title and prefix attribute
    const currentScript = document.querySelector('script[src$="common.js"]');
    const selectedIndex = parseInt(currentScript?.getAttribute("tabindex") ?? "-1", 10);
    const sectionTitle = currentScript?.getAttribute("title") ?? "";
    const pathPrefix = currentScript?.getAttribute("prefix") ?? "";

    // Define the navigation links and labels
    const navLinks = [
        { href: "index.html", label: "Index" },
        { href: "projects.html", label: "Projects" },
        { href: "videos.html", label: "Videos" },
        { href: "notepad.html", label: "Notepad" },
        { href: "utils.html", label: "Utils" },
        { href: "debug.html", label: "Debug" }
    ];

    // Update <title> element dynamically
    if (selectedIndex >= 0 && selectedIndex < navLinks.length) {
        const sectionPath = sectionTitle ? " / " + sectionTitle : "";
        document.title = `${navLinks[selectedIndex].label}${sectionPath} @ MorningMC.qzz.io`;
    }

    // Generate the navigation bar with > < marker for selected item
    const navBar = navLinks.map((link, i) => {
        const mark = i === selectedIndex ? ">" : " ";
        const backMark = i === selectedIndex ? "<" : " ";
        return `${mark} <a href="${pathPrefix}${link.href}">${link.label}</a> ${backMark}`;
    }).join("  ");

    // Header HTML content with placeholder for dynamic time
    const headerHTML = "<pre>\n" +
        "                                                            _____\n" +
        " /'\\_/`\\                        __                  /'\\_/`\\/\\   _`\\\n" +
        "/\\      \\    ___   _ __    ___ /\\_\\    ___      __ /\\      \\ \\ \\/\\_\\\n" +
        "\\ \\ \\__\\ \\  / __`\\/\\`'__\\/' _ `\\/\\ \\ /' _ `\\  /'_ `\\ \\ \\__\\ \\ \\ \\/_/_\n" +
        " \\ \\ \\_/\\ \\/\\ \\L\\ \\ \\ \\/ /\\ \\/\\ \\ \\ \\/\\ \\/\\ \\/\\ \\L\\ \\ \\ \\_/\\ \\ \\ \\L\\ \\\n" +
        "  \\ \\_\\\\ \\_\\ \\____/\\ \\_\\ \\ \\_\\ \\_\\ \\_\\ \\_\\ \\_\\ \\____ \\ \\_\\\\ \\_\\ \\____/.qzz.io\n" +
        "   \\/_/ \\/_/\\/___/  \\/_/  \\/_/\\/_/\\/_/\\/_/\\/_/\\/___L\\ \\/_/ \\/_/\\/___/ 's personal website\n" +
        "                                                /\\____/   <span class='datetime'>Loading time...</span>\n" +
        "                                                \\_/__/\n" +
        "========================================================================================================================\n" +
        "Navigation bar ::  " + navBar + "\n" +
        "========================================================================================================================\n" +
        "<noscript>[!] It seems that you have JavaScript disabled (or your browser doesn't support it). Please enable it to see the website properly.</noscript>\n" +
        "</pre>";

    // Footer HTML content
    const footerHTML = "<pre>\n" +
        "------------------------------------------------------------------------------------------------------------------------\n" +
        "Powered by <a href=\"https://pages.github.com/\">GitHub Pages</a>. View source <a href=\"https://github.com/MorningMC/MorningMC.github.io\">here</a>.\n" +
        "</pre>";

    // Insert the header and footer
    body.insertAdjacentHTML("afterbegin", headerHTML);
    body.insertAdjacentHTML("beforeend", footerHTML);

    // Format and update the current time
    const updateClock = () => {
        const now = new Date();

        const tzOffset = -now.getTimezoneOffset();
        const sign = tzOffset >= 0 ? "+" : "-";
        const pad = (n, len = 2) => String(Math.abs(n)).padStart(len, "0");
        const tzHours = pad(Math.floor(Math.abs(tzOffset) / 60));
        const tzMinutes = pad(Math.abs(tzOffset) % 60);
        const timezone = sign + tzHours + tzMinutes;

        const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${pad(now.getMilliseconds(), 3)}${timezone}`;

        const timeEl = document.querySelector(".datetime");
        if (timeEl) {
            timeEl.textContent = timestamp;
        }
    };

    updateClock();
    setInterval(updateClock, 64);
});