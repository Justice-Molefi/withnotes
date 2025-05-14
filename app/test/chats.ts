 const simulatedChat = [
  {
    chat: "Hi, can you help me with JavaScript?",
    chat2: "Of course! What do you need help with in JavaScript?"
  },
  {
    chat: "I'm trying to understand promises.",
    chat2: "Promises are a way to handle asynchronous operations. They represent a value that may be available now, later, or never."
  },
  {
    chat: "Can you show me an example?",
    chat2: "Sure! Here's a basic example:\n\n```js\nconst promise = new Promise((resolve, reject) => {\n  setTimeout(() => resolve('Done!'), 1000);\n});\n\npromise.then(result => console.log(result));\n```"
  },
  {
    chat: "What happens if it fails?",
    chat2: "If a promise is rejected, you can handle the error with `.catch()`:\n\n```js\npromise\n  .then(result => console.log(result))\n  .catch(error => console.error(error));\n```"
  },
  {
    chat: "Got it. What about async/await?",
    chat2: "Async/await is syntax sugar over promises. It makes asynchronous code look synchronous:\n\n```js\nasync function fetchData() {\n  try {\n    const result = await promise;\n    console.log(result);\n  } catch (error) {\n    console.error(error);\n  }\n}\n```"
  },
  {
    chat: "Thanks! This helps a lot.",
    chat2: "You're welcome! Let me know if you have any more questions. 😊"
  },
   {
    chat: "Hi, can you help me with JavaScript?",
    chat2: "Of course! What do you need help with in JavaScript?"
  },
  {
    chat: "I'm trying to understand promises.",
    chat2: "Promises are a way to handle asynchronous operations. They represent a value that may be available now, later, or never."
  },
  {
    chat: "Can you show me an example?",
    chat2: "Sure! Here's a basic example:\n\n```js\nconst promise = new Promise((resolve, reject) => {\n  setTimeout(() => resolve('Done!'), 1000);\n});\n\npromise.then(result => console.log(result));\n```"
  },
  {
    chat: "What happens if it fails?",
    chat2: "If a promise is rejected, you can handle the error with `.catch()`:\n\n```js\npromise\n  .then(result => console.log(result))\n  .catch(error => console.error(error));\n```"
  },
  {
    chat: "Got it. What about async/await?",
    chat2: "Async/await is syntax sugar over promises. It makes asynchronous code look synchronous:\n\n```js\nasync function fetchData() {\n  try {\n    const result = await promise;\n    console.log(result);\n  } catch (error) {\n    console.error(error);\n  }\n}\n```"
  },
  {
    chat: "Thanks! This helps a lot.",
    chat2: "You're welcome! Let me know if you have any more questions. 😊"
  },
   {
    chat: "Hi, can you help me with JavaScript?",
    chat2: "Of course! What do you need help with in JavaScript?"
  },
  {
    chat: "I'm trying to understand promises.",
    chat2: "Promises are a way to handle asynchronous operations. They represent a value that may be available now, later, or never."
  },
  {
    chat: "Can you show me an example?",
    chat2: "Sure! Here's a basic example:\n\n```js\nconst promise = new Promise((resolve, reject) => {\n  setTimeout(() => resolve('Done!'), 1000);\n});\n\npromise.then(result => console.log(result));\n```"
  },
  {
    chat: "What happens if it fails?",
    chat2: "If a promise is rejected, you can handle the error with `.catch()`:\n\n```js\npromise\n  .then(result => console.log(result))\n  .catch(error => console.error(error));\n```"
  },
  {
    chat: "Got it. What about async/await?",
    chat2: "Async/await is syntax sugar over promises. It makes asynchronous code look synchronous:\n\n```js\nasync function fetchData() {\n  try {\n    const result = await promise;\n    console.log(result);\n  } catch (error) {\n    console.error(error);\n  }\n}\n```"
  },
  {
    chat: "Thanks! This helps a lot.",
    chat2: "You're welcome! Let me know if you have any more questions. 😊"
  }
];

export default simulatedChat;