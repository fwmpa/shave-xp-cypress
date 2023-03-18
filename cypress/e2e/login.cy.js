import loginPage from "../support/pages/login/index";
import shaversPage from "../support/pages/shavers";

describe("Login", () => {
    context("When submitting log in credentials", () => {
        it("Should be able to successfully log in", () => {
            const user = {
                name: "Fernando",
                email: "fernando@mail.com",
                password: "pwd123",
            };

            loginPage.submit(user.email, user.password);

            shaversPage.header.userShouldBeLoggedIn(user.name);
        });

        it("Should not be able to log in with incorrect password", () => {
            const user = {
                name: "Fernando",
                email: "fernando@mail.com",
                password: "pwd123456",
            };

            loginPage.submit(user.email, user.password);

            const message =
                "Ocorreu um erro ao fazer login, verifique suas credenciais.";

            loginPage.noticeShouldBe(message);
        });

        it("Should not be able to log in with not signed email", () => {
            const user = {
                name: "Fernando",
                email: "fernando@404.com",
                password: "pwd123456",
            };

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
        const passwords = ["1", "12", "123", "1234", "12345"];

        passwords.forEach((p) => {
            it(`Should not be able to log in with password: ${p} `, () => {
                loginPage.submit("papito@teste.com.br", p);
                loginPage.alertShouldBe("Pelo menos 6 caracteres");
            });
        });
    });

    context("Incorrect emails", () => {
        const emails = [
            "fernando&mail.com",
            "fernando.com.br",
            "@gmail.com",
            "@",
            "fernando@",
            "123123",
            "$@#!$@#",
            "xpt12345",
        ];

        emails.forEach((e) => {
            it.only(`Should not be able to log in with incorrect email: ${e} `, () => {
                loginPage.submit(e, "pwd123");
                loginPage.alertShouldBe("Informe um email válido");
            });
        });
    });
});
