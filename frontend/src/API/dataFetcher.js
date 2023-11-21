import { URL_API } from "./constant";

const sendRequest = async (requestBody) => {
  try {
    const res = await fetch(URL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (!res) throw new Error("There is an error when connecting server");
    const data = await res.json();
    if (data.errors?.length > 0) throw new Error(data.errors[0].message);

    return data;
  } catch (error) {
    return { error };
  }
};

export const login = async (email, password) => {
  const requestBody = {
    query: `
      query {
        login(email: "${email}", password: "${password}"){
          token
        }
      }
    `,
  };
  const res = await sendRequest(requestBody);
  return res;
};

export const signUp = async (email, password) => {
  const requestBody = {
    query: `
      mutation {
        createUser(userInput: {email: "${email}", password: "${password}"}){
          _id
          email
        }
      }
    `,
  };
  const res = await sendRequest(requestBody);
  return res;
};
