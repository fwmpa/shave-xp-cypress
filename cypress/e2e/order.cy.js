import loginPage from "../support/pages/login/index";
import shaversPage from "../support/pages/shavers";
import catalogPage from "../support/pages/catalog";
import orderPage from "../support/pages/order"

import data from "../fixtures/order.json";

describe("service order", () => {
    context("Logged used", () => {
        const { customer, shaver, service } = data;

        before(() => {
            cy.createUser(customer);
            cy.apiLogin(customer)
        });

        it("Should be able to order services", () => {
            shaversPage.selectShaver(shaver.name);
            catalogPage.hasShaver(shaver.name)

            catalogPage.selectService(service.description)
            catalogPage.hasTitle(service.description)

            catalogPage.confirmOrder()
            orderPage.hasOrder()
        });
    });
});


