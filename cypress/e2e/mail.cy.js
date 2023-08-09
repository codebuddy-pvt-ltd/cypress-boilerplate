describe("Mail", () => {
  it("can load the plugin", async function () {
    // test we can connect to mailslurp
    const mailslurp = await cy.mailslurp();
    const userInfo = await mailslurp.userController.getUserInfo();
    expect(userInfo.id).to.exist;
  });
});

describe("Send email using mailslurp", () => {
  before(function () {
    return cy
      .mailslurp()
      .then((mailslurp) => mailslurp.createInbox())
      .then((inbox) => {
        // save inbox id and email address to this (make sure you use function and not arrow syntax)
        cy.wrap(inbox.id).as("inboxId");
        cy.wrap(inbox.emailAddress).as("emailAddress");
      });
  });

  it("Should send email", function () {
    cy.mailslurp().then((mailslurp) =>
      mailslurp.sendEmail(this.inboxId, {
        to: [this.emailAddress],
        subject: "My email",
        body: "<html><h1>My email</h1></html>",
        isHTML: true,
      })
    );
  });

  it("Should receive mail", function () {
    cy.mailslurp()
      .then((mailslurp) =>
        mailslurp.waitForLatestEmail(this.inboxId, 30000, false)
      )
      .then((email) => {
        console.log(email);
        expect(email.subject).to.contain("My email");
      });
  });
});
