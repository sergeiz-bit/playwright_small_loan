import {expect, test} from '@playwright/test';
import {SmallLoanPage} from "../page-objects/pages/SmallLoanPage";
import {LoanDecisionPage} from "../page-objects/pages/LoanDecisionPage";

test.describe("Loan app tests", async () => {
    test('TL-20-1 Base test', async ({page}) => {
        const smallLoanPage = new SmallLoanPage(page)
        const loanDecisionPage = new LoanDecisionPage(page)
        await smallLoanPage.open()
        const prefilledAmount = await smallLoanPage.amountInput.getCurrentValue();
        const prefilledPeriod = await smallLoanPage.getFirstPeriodOption();
        await smallLoanPage.applyButton.click();
        await smallLoanPage.usernameInput.fill("test")
        await smallLoanPage.passwordInput.fill("test")
        await smallLoanPage.continueButton.click();
        const finalAmount = await loanDecisionPage.getFinalAmountValue();
        const finalPeriod = await loanDecisionPage.getFinalPeriodValue();
        expect(finalAmount).toEqual(prefilledAmount)
        expect(finalPeriod).toEqual(prefilledPeriod)
    });

    test('TL-20-2 Scroll test', async ({page}) => {
        const smallLoanPage = new SmallLoanPage(page)
        await smallLoanPage.open()
        await smallLoanPage.applyImage2.click();
        await smallLoanPage.applyButton.checkButtonInViewPort();
    });

})


