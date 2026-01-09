export function fakeLogin({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@example.com" && password === "password123") {
        resolve({ user: { email } });
      } else {
        reject(new Error("Incorrect email or password."));
      }
    }, 1000);
  });
}
