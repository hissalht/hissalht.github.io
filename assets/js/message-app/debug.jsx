
import uuid from 'uuid/v4';


const m1 = {id: 1, sender: 1, destination: 1, content: 'hé coucou', postDate: new Date()};
const m2 = {id: 2, sender: 1, destination: 1, content: '?? allo ?', postDate: new Date()};
const m3 = {id: 3, sender: 2, destination: 1, content: 'yo', postDate: new Date()};
const m4 = {id: 4, sender: 3, destination: 2, content: 'SDKLfjsldkjf ', postDate: new Date()};
const m5 = {id: 5, sender: 1, destination: 2, content: 'SDFKJ DSFJ SDF', postDate: new Date()};
const m6 = {id: 6, sender: 3, destination: 2, content: 'sdf sdfbbvcb c', postDate: new Date()};
const m7 = {id: 7, sender: 1, destination: 3, content: 'lorem', postDate: new Date()};
const m8 = {id: 8, sender: 2, destination: 3, content: 'ipsum', postDate: new Date()};
const m9 = {id: 9, sender: 3, destination: 3, content: 'debug', postDate: new Date()};
let mockConversationData = [{
  id: 1,
  participants: [1, 2],
  messages: [m1, m2, m3]
}, {
  id: 2,
  participants: [1, 3],
  messages: [m4, m5, m6]
}, {
  id: 3,
  participants: [1, 2, 3],
  messages: [m7, m8, m9]
}].reduce((acc, cur) => {
  acc[cur.id] = cur;
  return acc;
}, {});

const users = {
  1: {
    id: 1,
    username: 'adrien'
  },
  2: {
    id: 2,
    username: 'bob'
  },
  3: {
    id: 3,
    username: 'steven'
  },
};
const currentUser = users[1];


export function generateMessageId(message) {
  return uuid();
}

export function getConversationData(callback) {
  return callback(mockConversationData);
}

export function getCurrentUser(callback) {
  return callback(currentUser);
}

export function getUser(id, callback) {
  return callback(users[id] || null);
}

export function postMessage(message, callback) {
  let response = {
    destination: message.destination,
    content: message.content,
    date: new Date().toJSON(),
    sender: currentUser.id
  };
  response.id = generateMessageId(response);
  callback(response);
}
