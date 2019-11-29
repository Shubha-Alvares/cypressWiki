import {testCase1, testCase2, testCase3, testCase4} from '../../scenarios/mythologyScenarios'

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test on some invalid exceptions
    return false
})
describe('Testcases for Mythology', () => {

    it('Validate the headings listed in the Contents box are used as headings on the page', () => {
        testCase1()
    })

    it('Validate the headings listed in the `Contents` box have functioning hyperlinks', () => {
        testCase2()
    })

    it('Validate  in the _Personified concepts_, `Nike` has a popup with some desired text', () => {
        let expectedText = `In ancient Greek religion, Nike was a goddess who personified victory. Her Roman equivalent was
Victoria.`
        cy.log(`Nike expected to have text ${expectedText}`)
        testCase3(expectedText)
    })

    it('Validating if the Nike hyperlink opens a page with family tree', () => {
        testCase4()
    })
})