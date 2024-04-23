$(document).ready(function () {
  const generateButton = $(".btn-generate");
  const rangeInput = $(".input-length");
  const checkboxes = $(".input-check");
  const passwordField = $(".text-password");
  const copyButton = $(".btn-copy");
  const form = $(".generator-form");

  function generatePassword() {
    let dictionary = "";
    checkboxes.each(function () {
      if ($(this).prop("checked")) {
        switch ($(this).val()) {
          case "lowercase":
            dictionary += "abcdefghijklmnopqrstuvwxyz";
            break;
          case "uppercase":
            dictionary += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;
          case "numbers":
            dictionary += "1234567890";
            break;
          case "symbols":
            dictionary += "!@#$%^&*()_+-={}[];<>:";
            break;
        }
      }
    });

    const length = rangeInput.val();

    if (length < 1 || dictionary.length === 0) {
      return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      const pos = Math.floor(Math.random() * dictionary.length);
      password += dictionary[pos];
    }

    passwordField.val(password);
  }

  function updateLengthIndicator() {
    $(".number-length").text(rangeInput.val());
  }

  function copyPasswordToClipboard() {
    const pass = passwordField.val();
    navigator.clipboard.writeText(pass).then(() => {
      copyButton.text("Copied!");
      setTimeout(() => {
        copyButton.text("Copy");
      }, 1000);
    });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    generatePassword();
  }

  generateButton.on("click", generatePassword);
  rangeInput.on("input", () => {
    updateLengthIndicator();
    generatePassword();
  });
  copyButton.on("click", copyPasswordToClipboard);
  form.on("submit", handleFormSubmit);

  generatePassword();
});
