const { JSDOM } = require('jsdom');

// Comment to test github connection

/**
 * 
 * @param {string} htmlBody // HTML of page
 * @param {string} baseURL // URL of website we are crawling
 * @returns An array of strings representing URLs
 */ 
function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll('a')
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      // relative URL
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`)
        urls.push(urlObj.href)
      } catch (err) {
        console.log(`error with relative url: ${err.message}`)
      }
    } else {
      // absolute URL
      try {
        const urlObj = new URL(linkElement.href)
        urls.push(urlObj.href)
      } catch (err) {
        console.log(`error with absolute url: ${err.message}`)
      }
    }
  }
  return urls;
}

/**
 * Function normalizes URLs using URL Object
 * @param {url String} urlString 
 * @returns domain and path as a string
 */
function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
};

module.exports = {
  normalizeURL,
  getURLsFromHTML
}