export const email = $dev
  ? sst.aws.Email.get("Email1", "workshop-repairs.click")
  : new sst.aws.Email("Email1", {
      sender: "workshop-repairs.click",
    });
