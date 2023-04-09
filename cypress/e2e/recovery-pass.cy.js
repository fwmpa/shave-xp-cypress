describe("Recovery Password", () => {
    it("Should be able to request new password", () => {
        const user = {
            name: "Joao Esquecido",
            email: "joao@mail.com",
            password: "pwd123",
            is_shaver: false,
        };

        cy.createUser(user);

        cy.requestPassword(user.email);

        const message =
            "Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.";
        cy.noticeSuccessShouldBe(message);
    });

    context("When user requests password recovery", () => {
        const user = {
            name: "Will Souza",
            email: "will@mail.com",
            password: "pwd123",
            is_shaver: false,
        };
        beforeEach(() => {
            cy.createUser(user);
            cy.recoveryPass(user.email);
            cy.getToken(user.email);
        });

        it("Should be able to add new password", () => {
            cy.resetPassword(Cypress.env("token"), "abc123", "abc123");
            const message =
                "Agora você já pode logar com a sua nova senha secreta.";
            cy.noticeSuccessShouldBe(message);
        });

        afterEach(() => {
            cy.submitLogin(user.email, "abc123");
            cy.userShouldBeLoggedIn(user.name);
        });
    });
});
