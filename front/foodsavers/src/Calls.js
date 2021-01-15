import axios from "axios";

async function get(url, id = null) {
  try {
    let newUrl = !id ? url : url + "/" + id;
    return (await axios.get(newUrl)).data;
  } catch (e) {
    return e.response.data;
  }
}

async function getAll(url) {
  try {
    return (await axios.get(url)).data;
  } catch (e) {
    return e.response.data;
  }
}

async function getAllFood(url, id) {
  try {
    let newUrl = !id ? url : url + "/user/" + id;
    return (await axios.get(newUrl)).data;
  } catch (e) {
    return e.response.data;
  }
}

async function getFriendsIds(url, id) {
  try {
    let newUrl = !id ? url : url + "/friendsUser/" + id;
    return (await axios.get(newUrl)).data;
  } catch (e) {
    return e.response.data;
  }
}

async function getByEmail(url, email = null) {
  try {
    let newUrl = !email ? url : url + "/email/" + email;
    return (await axios.get(newUrl)).data;
  } catch (e) {
    return e.response.data;
  }
}

async function getUserByEmail(url, email = null) {
  try {
    let newUrl = !email ? url : url + "/emailFull/" + email;
    return (await axios.get(newUrl)).data;
  } catch (e) {
    return e.response.data;
  }
}

async function post(url, item) {
  try {
    return (
      await axios.post(url, item, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data;
  } catch (e) {
    return e.response.data;
  }
}

async function deleteFriendship(url, id1, id2) {
  try {
    await axios.delete(url + "friendsDelete/" + id1 + "/" + id2);
  } catch (e) {
    return e.response.data;
  }
}

async function deleteSmth(url, id1) {
    try {
      await axios.delete(url +"/"+id1);
    } catch (e) {
      return e.response.data;
    }
  }
  

async function getUserGroups(url, id) {
  try {
    let newUrl = !id ? url : url + "/user/" + id;
    return (await axios.get(newUrl)).data;
  } catch (e) {
    return e.response.data;
  }
}



async function update(url, item, id) {
  try {
    return (
      await axios.put(url + "/" + id, item, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).data;
  } catch (e) {
    return e.response.data;
  }
}

export {
  get,
  getByEmail,
  post,
  getAll,
  getUserByEmail,
  getAllFood,
  getFriendsIds,
  deleteFriendship,
  getUserGroups,
  update,
  deleteSmth
};
