import data from "../fixtures/users-login.json";

describe("Login", () => {
    context("When submitting log in credentials", () => {
        it("Should be able to successfully log in", () => {
            const user = data.success;

            cy.createUser(user)

            cy.submitLogin(user.email, user.password)
            cy.userShouldBeLoggedIn(user.name);
        });

        it("Should not be able to log in with incorrect password", () => {
            const user = data.invpass;
            cy.submitLogin(user.email, user.password)

            const message =
                "Ocorreu um erro ao fazer login, verifique suas credenciais.";

            cy.noticeErrorShouldBe(message);
        });

        it("Should not be able to log in with not signed email", () => {
            const user = data.email404;
            cy.submitLogin(user.email, user.password)

            const message =
                "Ocorreu um erro ao fazer login, verifique suas credenciais.";

            cy.noticeErrorShouldBe(message);
        });

        it("required log in fields", () => {
            cy.submitLogin()

            cy.get('.alert-error')
            .should("have.length", 2)
            .and(($small) => {
                expect($small.get(0).textContent).to.equal("E-mail é obrigatório");
                expect($small.get(1).textContent).to.equal("Senha é obrigatória");
            });
        });
    });

    context("Short password", () => {
        data.shortpass.forEach((p) => {
            it(`Should not be able to log in with password: ${p} `, () => {
                cy.submitLogin("papito@teste.com.br", p)
                cy.alertShouldBe("Pelo menos 6 caracteres");
            });
        });
    });

    context("Incorrect emails", () => {
        data.invemails.forEach((e) => {
            it(`Should not be able to log in with incorrect email: ${e} `, () => {
                cy.submitLogin(e, "pwd123");
                cy.alertShouldBe("Informe um email válido");
            });
        });
    });
});
