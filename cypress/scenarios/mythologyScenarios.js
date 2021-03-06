export function testCase1() {
    cy.log('log', `starting testCase1 `)
    cy.log('log', `Opening en.wikipedia.org/wiki/Metis_(mythology)`)
    let contents = []
    let headings = []
    cy.log('Visit https://en.wikipedia.org/wiki/Metis_(mythology)')
    cy.visit(`wiki/Metis_(mythology)`).then(() => {
        cy.log('Get the contents and store then in an array')
        cy.get(`#toc .toclevel-1`).each($row => {
            cy.get($row).within(() => {
                cy.get('.toctext').then($toctext => {
                    let contentName = $toctext.get(0).innerText.toString()
                    contents.push(contentName)
                })
            })
        })
    }).then(() => {
        cy.log('Get the numbers of headings and validate if the number of headings is equal to the numbers of contents')
        cy.log('Get the headings and validate if the headings is equal to the contents')
        cy.get('.mw-headline').should(($headings) => {
            expect($headings, `${contents.length} items`).to.have.length(contents.length)
                for(let counter = 0; counter< contents.length; counter++ ) {
                    expect($headings.eq(counter), `${counter + 1}  item`).to.contain(contents[counter])
                }
            })
    })
}

export function testCase2() {
    cy.log('Visit https://en.wikipedia.org/wiki/Metis_(mythology)')
    cy.visit(`wiki/Metis_(mythology)`).then(() => {
        cy.get(`#toc .toclevel-1`).each($row => {
            cy.get($row).within(() => {
                cy.get('.toctext').parent().should('have.attr', 'href').then($href => {
                    cy.log('validating the hyperlinks are functional')
                    cy.get(`a[href*="${$href}"]`).click()
                    cy.url().should('eq', `${Cypress.config().baseUrl}wiki/Metis_(mythology)${$href}`)
                })
            })
        })
    })
}

export function testCase3(expectedText) {
    cy.log('Visit https://en.wikipedia.org/wiki/Metis_(mythology)')
    cy.visit(`wiki/Metis_(mythology)`).then(() => {
        cy.get(`.vertical-navbox`).within(() => {
            cy.get(`a[href*="/wiki/Nike_(mythology)"]`).trigger('mouseover',{force: true})
        }).then(() => {
            cy.get('mwe-popups').within($popup => {
                cy.log('Validate  in the _Personified concepts_, `Nike` has a popup with some desired text')
                expect($popup).to.contain(expectedText)
            })
        })
    })
}

export function testCase4() {
    cy.log('Visit https://en.wikipedia.org/wiki/Metis_(mythology)')
    cy.visit(`wiki/Metis_(mythology)`).then(() => {
        cy.get(`.vertical-navbox`).within(() => {
            cy.get(`a[href*="/wiki/Nike_(mythology)"]`).click({force: true})
        }).then(() => {
                cy.url().should('include', '/wiki/Nike_(mythology)').then(() => {
                    cy.get('#Family_tree').parents('.mw-parser-output').within(() => {
                        cy.log('Validating if the Nike hyperlink opens a page with family tree')
                        cy.get('.toccolours')
                    })
                })
            })
        })
}

