// Extract portal ID and languages from hsVars and page content
function getPageInfo() {
    let info = {
        portalId: null,
        languages: new Set(),
        currentLanguage: null
    };

    // Try to get hsVars from different possible sources
    try {
        // Try direct window access
        if (typeof window.hsVars !== "undefined") {
            info.portalId = window.hsVars.portal_id;
            info.currentLanguage = window.hsVars.language;
        } else {
            // Try to find hsVars in script tags
            const scripts = document.querySelectorAll("script");
            for (const script of scripts) {
                const content = script.textContent;
                if (content && content.includes("var hsVars = {")) {
                    const match = content.match(/var hsVars = ({[^}]+})/);
                    if (match) {
                        try {
                            const vars = JSON.parse(match[1].replace(/([{,]\s*)(\w+):/g, "$1\"$2\":"));
                            info.portalId = vars.portal_id;
                            info.currentLanguage = vars.language;
                            break;
                        } catch (e) {
                            console.error("Error parsing hsVars:", e);
                        }
                    }
                }
            }
        }
    } catch (e) {
        console.error("Error accessing hsVars:", e);
    }

    // Find languages from alternate links
    const alternateLinks = document.querySelectorAll("link[rel=\"alternate\"][hreflang]");
    alternateLinks.forEach(link => {
        const lang = link.getAttribute("hreflang");
        if (lang) {
            info.languages.add(lang);
        }
    });

    // Add current language to available languages if not already included
    if (info.currentLanguage) {
        info.languages.add(info.currentLanguage);
    }

    console.log("Page Info:", info); // Debug log

    return {
        portalId: info.portalId,
        languages: Array.from(info.languages),
        currentLanguage: info.currentLanguage
    };
}

// Send page info to the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getPortalId") {
        const info = getPageInfo();
        sendResponse({ portalId: info.portalId });
        return true;
    }

    if (request.action === "getLanguages") {
        const info = getPageInfo();
        sendResponse({
            languages: info.languages,
            currentLanguage: info.currentLanguage
        });
        return true;
    }
});