class GoogleDocsPage {
    async open(path, id) {
        await browser.url(`https://docs.google.com/${path}/${id}`);
    };
}

module.exports = GoogleDocsPage;