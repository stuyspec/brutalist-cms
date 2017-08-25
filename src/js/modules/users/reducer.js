const initialState = {
  users: {
    0: {
      id: 0,
      firstName: "Jason",
      lastName: "Kao",
      username: "jkao1",
      email: "jkao1@stuy.edu",
      slug: "jason-kao",
    },
    1: {
      id: 1,
      firstName: "Jason",
      lastName: "Lin",
      username: "jasonlin43212",
      email: "jasonlin43212@gmail.com",
      slug: "jason-lin",
    },
    2: {
      id: 2,
      firstName: "Cathy",
      lastName: "Cai",
      username: "ccai1",
      email: "ccai1@stuy.edu",
      slug: "cathy-cai",
    },
    3: {
      firstName: "Nicholas",
      lastName: "Yang",
      username: "nicholasleeyang",
      email: "nicholasleeyang@gmail.com",
      slug: "nicholas-yang",
    },
    4: {
      firstName: "Jerry",
      lastName: "Ye",
      username: "jye6",
      email: "jye6@stuy.edu",
      slug: "jerry-ye",
    },
  }
};

export default reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    default:
      break;
  }
  return state;
}