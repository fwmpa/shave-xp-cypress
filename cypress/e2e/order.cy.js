import data from "../fixtures/order.json";

describe("service order", () => {
    context("Logged used", () => {
        const { customer, shaver, service } = data;

        before(() => {
            cy.createUser(customer);
            cy.apiLogin(customer)
        });

        it("Should be able to order services", () => {
            cy.selectShaver(shaver.name)
            cy.selectService(service.description)
            cy.confirmOrder()
            cy.hasOrder()
        });
    });
});


