fetch("/authUrl")
  .then((res) => res.json())
  .then((res) => {
    document.querySelector("#authLink").href = res.authUrl;
  });
