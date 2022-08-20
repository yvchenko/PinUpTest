const Page = require('../pageobjects/GoogleDocsPage');
const GoogleDocsPage = new Page();

describe('Try accessing a spreadsheet from an unreliable browser', () => {
    it('should redirect to Google Support', async () => {
        const path = 'spreadsheets/d'
        const id = '1wV_b5TnfUw-9s-KzqhTHluDfVMkb2lQTLNUfty0ufnw'

        const email = 'aslongasitworks@gmail.com'

        await GoogleDocsPage.open(path, id) // try opening the spreadsheet

        const login_input = await $('#identifierId')
        await expect(login_input).toExist() // check if the login input is present

        await login_input.setValue(email)
        await expect(login_input).toHaveValue(email) // enter email

        const next_button = await $('#identifierNext')
        await expect(next_button).toExist()
        await expect(next_button).toBeClickable() // check if the 'next' button is present and available

        await next_button.click() // click the 'next' button

        const warning = await $('#headingText')
        await browser.pause(1200)
        await expect(warning).toExist() // check if the form contents have changed

        const retry_button = await $('#next')
        await expect(retry_button).toExist() // check if the 'retry' button is present

        await retry_button.click() // click the 'retry' button

        await expect(login_input).toExist() // check if the login input is present
        await browser.pause(1200)
        await login_input.setValue(email)
        await expect(login_input).toHaveValue(email) // enter email again

        await next_button.click() // click the 'next' button again
        await browser.pause(1200)
        await expect(warning).toExist() // check if the form contents have changed again

        const more_link = await $('a[href*="support.google.com"]')
        await expect(more_link).toExist() // check if the 'learn more' link is present

        await more_link.click() // click the 'learn more' link

        const [support_url] = await Promise.all(['https://support.google.com/accounts/answer/7675428'])
        expect(support_url).toBeRequested() // check if the right support article is requested

        const article_header = await $('#article-container > h1')
        await browser.pause(1200)
        expect(article_header).toExist() // check if the header is present
        expect(article_header).toHaveText('Як увійти в обліковий запис у сумісному веб-переглядачі') // check if the header matches

    });
});