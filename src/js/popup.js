document.addEventListener("DOMContentLoaded", () => {
  // Tab switching functionality
  const tabs = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs and contents
      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      contents.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked tab and corresponding content
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      const tabId = tab.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  const initDisabledTooltips = () => {
    const disabledElements = document.querySelectorAll("button[disabled], select[disabled], input[disabled]");
    disabledElements.forEach((el) => {
      if (!el.getAttribute("title")) {
        el.setAttribute("title", "Coming soon");
      }
    });
  };

  initDisabledTooltips();

  // URL modification functionality
  const modifyUrl = async (params) => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTab = tabs[0];

    // if (!currentTab.url.includes("hubspot.com")) {
    //     alert("This tool can only be used on HubSpot domains.");
    //     return;
    // }

    const url = new URL(currentTab.url);

    // Update or add each parameter
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    // Update the URL and reload the page
    await chrome.tabs.update(currentTab.id, { url: url.toString() });
  };

  // Generate random 4-digit number
  const generateRandomNumber = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  // Button click handlers
  document.getElementById("bypassCache").addEventListener("click", () => {
    modifyUrl({ hsCacheBuster: generateRandomNumber() });
    window.close();
  });

  document.getElementById("enableDebug").addEventListener("click", () => {
    modifyUrl({ hsDebug: "true" });
    window.close();
  });

  document.getElementById("showDebugOnly").addEventListener("click", () => {
    modifyUrl({ hsDebugOnly: "true" });
    window.close();
  });

  document.getElementById("activateDev").addEventListener("click", () => {
    modifyUrl({ developerMode: "true" });
    window.close();
  });

  document.getElementById("viewAmp").addEventListener("click", () => {
    modifyUrl({ hs_amp: "true" });
    window.close();
  });

  // Language switcher functionality
  const setupLanguageSwitcher = async () => {
    const langSelect = document.getElementById("langSelect");
    const switchLangBtn = document.getElementById("switchLang");
    const langMessage = document.getElementById("langMessage");

    try {
      // Inject content script if not already injected
      await chrome.scripting.executeScript({
        target: { tabId: (await chrome.tabs.query({ active: true, currentWindow: true }))[0].id },
        files: ["js/content.js"],
      });

      // Get available languages
      const response = await chrome.tabs.sendMessage(
        (await chrome.tabs.query({ active: true, currentWindow: true }))[0].id,
        { action: "getLanguages" }
      );

      if (response && response.languages && response.languages.length > 0) {
        // Clear any existing options
        langSelect.innerHTML = "<option value=\"\">Select Language</option>";

        // Add available languages
        response.languages.forEach((lang) => {
          const option = document.createElement("option");
          option.value = lang;
          option.textContent = new Intl.DisplayNames(["en"], { type: "language" }).of(lang);
          if (lang === response.currentLanguage) {
            option.selected = true;
          }
          langSelect.appendChild(option);
        });

        // Enable controls
        langSelect.disabled = false;
        switchLangBtn.disabled = false;
        if (langMessage) langMessage.style.display = "none";
      } else {
        // Disable controls and show message
        langSelect.disabled = true;
        switchLangBtn.disabled = true;
        if (langMessage) {
          langMessage.textContent = "No language options available on this page";
          langMessage.style.display = "block";
        }
      }
    } catch (error) {
      console.error("Error setting up language switcher:", error);
      langSelect.disabled = true;
      switchLangBtn.disabled = true;
      if (langMessage) {
        langMessage.textContent = "Unable to detect available languages";
        langMessage.style.display = "block";
      }
    }
  };

  // Initialize language switcher
  setupLanguageSwitcher();

  // Language switch button handler
  document.getElementById("switchLang").addEventListener("click", () => {
    const langSelect = document.getElementById("langSelect");
    const selectedLang = langSelect.value;

    if (!selectedLang) {
      alert("Please select a language");
      return;
    }

    modifyUrl({ hsLang: selectedLang });
    window.close();
  });

  // Design Manager functionality
  const openDesignManager = async () => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const currentTab = tabs[0];

    try {
      // Inject content script
      await chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        files: ["js/content.js"],
      });

      // Wait a brief moment for the script to initialize
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Now try to get the portal ID
      const response = await chrome.tabs.sendMessage(currentTab.id, {
        action: "getPortalId",
      });
      if (response && response.portalId) {
        const designManagerUrl = `https://app.hubspot.com/design-manager/${response.portalId}`;
        await chrome.tabs.create({ url: designManagerUrl });
        window.close();
      } else {
        alert(
          "Could not find portal ID on this page. Please make sure you are on a HubSpot page."
        );
      }
    } catch (error) {
      console.error("Error accessing portal ID:", error);
      alert(
        "Could not access page information. Please make sure you are on a HubSpot page."
      );
    }
  };

  document
    .getElementById("designManager")
    .addEventListener("click", openDesignManager);
});
