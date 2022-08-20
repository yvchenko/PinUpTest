class GoogleDocsPage {
    async open(path, id) {
        await console.log('open');
        await browser.maximizeWindow();
        await browser.url(`https://docs.google.com/${path}/${id}`);
    };
}

module.exports = GoogleDocsPage;