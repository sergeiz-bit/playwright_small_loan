import {test} from '@playwright/test';
import {SmallLoanPage} from "../page-objects/pages/SmallLoanPage";

test.describe("Loan app mock tests", async () => {
    test('TL-21-1 Positive test', async ({page}) => {

        const expectedMonthlyAmount = 100005
        const smallLoanPage = new SmallLoanPage(page);
        await page.route("**/api/loan-calc*", async(request)=>{

            const responseBody = {paymentAmountMonthly: expectedMonthlyAmount}
            await request.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify(responseBody)
            })
        })
        const responsePromise = page.waitForResponse("**/api/loan-calc*");
        await smallLoanPage.open();
        await responsePromise;
        await smallLoanPage.checkMonthlyAmount(expectedMonthlyAmount)

    });

})


