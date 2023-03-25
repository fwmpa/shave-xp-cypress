import loginPage from "../support/pages/login/index";
import shaversPage from "../support/pages/shavers";
import data from "../fixtures/users-login.json";

describe("Login", () => {
    context("When submitting log in credentials", () => {
        it.only("Should be able to successfully log in", () => {
            const user = data.success;

            cy.createUser(user)

            loginPage.submit(user.email, user.password);

            shaversPage.header.userShouldBeLoggedIn(user.name);
        });

        it("Should not be able to log in with incorrect password", () => {
            const user = data.invpass;
            loginPage.submit(user.email, user.password);

            const message =
                "Ocorreu um erro ao fazer login, verifique suas credenciais.";

            loginPage.noticeShouldBe(message);
        });

        it("Should not be able to log in with not signed email", () => {
            const user = data.email404;
            loginPage.submit(user.email, user.password);

            const message =
                "Ocorreu um erro ao fazer login, verifique suas credenciais.";

            loginPage.noticeShouldBe(message);
        });

        it("required log in fields", () => {
            loginPage.submit();
            loginPage.requiredFields(
                "E-mail é obrigatório",
                "Senha é obrigatória"
            );
        });
    });

    context("Short password", () => {
        data.shortpass.forEach((p) => {
            it(`Should not be able to log in with password: ${p} `, () => {
                loginPage.submit("papito@teste.com.br", p);
                loginPage.alertShouldBe("Pelo menos 6 caracteres");
            });
        });
    });

    context("Incorrect emails", () => {
        data.invemails.forEach((e) => {
            it(`Should not be able to log in with incorrect email: ${e} `, () => {
                loginPage.submit(e, "pwd123");
                loginPage.alertShouldBe("Informe um email válido");
            });
        });
    });
});
