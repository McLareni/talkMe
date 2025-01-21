import axios from 'axios';

import store from '../store/index';

const createChat = async (idFriend: number, title: any) => {
  const token = store.getState().auth.accessToken;

  try {
    const response = await axios.post(
      `chats/create/${idFriend}`,
      {
        title,
      },
      { headers: { Authorization: 'Bearer ' + token } }
    );

    if (response.status !== 200) {
      return new Error('Failed create chat');
    }

    return response.data.chat;
  } catch (err) {
    console.log(err);
  }
};

const deleteChat = async (idChat: string) => {
  const token = store.getState().auth.accessToken;

  try {
    const response = await axios.delete(`chats/delete/${idChat}`, {
      headers: { Authorization: 'Bearer ' + token },
    });

    if (response.status !== 200) {
      return new Error('Failed delete chat');
    }

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const createFriendRequest = async (userId: number, friendId: string) => {
  const token = store.getState().auth.accessToken;

  try {
    const response = await axios.post(
      `friends/addRequest`,
      { userId, friendId },
      {
        headers: { Authorization: 'Bearer ' + token },
      }
    );

    if (response.status !== 200) {
      return new Error('Failed create a friend request');
    }

    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};

const checkStatusChat = async (idUser: number, idFriend: number) => {
  const token = store.getState().auth.accessToken;

  try {
    const response = await axios.get(
      `chats/checkChat?idUser=${idUser}&idFriend=${idFriend}`,
      {
        headers: { Authorization: 'Bearer ' + token },
      }
    );

    if (response.status !== 200) {
      return new Error('Failed check status');
    }

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export { createChat, deleteChat, createFriendRequest, checkStatusChat };
