export const email =
  $app.stage === "production"
    ? new sst.aws.Email("Email1", {
        sender: "michael.poulgrain.aws@gmail.com",
      })
    : sst.aws.Email.get("Email1", "michael.poulgrain.aws@gmail.com");
