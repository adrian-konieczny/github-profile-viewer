import axios from "axios";

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

export const getGithubAccesToken = async (code: string) => {
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

export const getGithubUser = async (access_token: string) => {
  const user_res = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: "token " + access_token,
    },
  });
  const user_data = await user_res.json();
  const emails_res = await fetch("https://api.github.com/user/emails", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const emails_data = await emails_res.json();
  console.log(emails_data);
  const primary_email = emails_data.find((e: { primary: boolean }) => {
    return e.primary;
  });
  const email = primary_email.email;
  return { ...user_data, email };
};

export const fetchUserData = async (id: string) => {
  const { data } = await axios(`https://api.github.com/users/${id}`);

  const { data: repodata } = await axios(
    `https://api.github.com/users/${id}/repos`
  );
  return { data, repodata };
};
