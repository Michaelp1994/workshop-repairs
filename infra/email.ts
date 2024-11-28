export const email =
  $app.stage === "production"
    ? new sst.aws.Email("Email1", {
        sender: "workshop-repairs.click",
      })
    : sst.aws.Email.get("Email1", "workshop-repairs.click");
