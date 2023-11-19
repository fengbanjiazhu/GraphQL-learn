import { URL_API } from "./constant";

export const login = async (email, password) => {
  const requestBody = {
    query: `
      query {
        login(userInput: {email: "${email}", password: "${password}"}){
          token
        }
      }
    `,
  };
  try {
    const res = await fetch(URL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    // if (!res || !res.ok) throw new Error("There is an error when connecting server");
    console.log(res);
  } catch (error) {
    console.log(error);
  }
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
  try {
    const res = await fetch(URL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (!res || !res.ok) throw new Error("There is an error when connecting server");
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
