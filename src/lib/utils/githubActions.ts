const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
export const getGithubAccesToken = async (
  code: string | string[] | undefined
) => {
  const response = await fetch(
    `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  const { access_token } = await response.json();

  return access_token;
};
