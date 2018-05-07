
import uuid from 'uuid/v4';


const m1 = {id: 1, sender: 1, destination: 1, content: 'hé coucou'};
const m2 = {id: 2, sender: 1, destination: 1, content: '?? allo ?'};
const m3 = {id: 3, sender: 2, destination: 1, content: 'yo ;)'};
const m4 = {id: 4, sender: 2, destination: 2, content: 'SDKLfjsldkjf '};
const m5 = {id: 5, sender: 1, destination: 2, content: 'SDFKJ DSFJ SDF'};
const m6 = {id: 6, sender: 2, destination: 2, content: 'sdf sdfbbvcb c'};
let mockConversationData = [{
  id: 1,
  participants: [1, 2],
  messages: [m1, m2, m3]
}, {
  id: 2,
  participants: [1, 2],
  messages: [m4, m5, m6]
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
  }
};
const currentUser = users[1];


export function generateMessageId(message) {
  return uuid();
}

export function getMockData(callback) {
  return callback(mockConversationData);
}

export function getCurrentUser(callback) {
  return callback(currentUser);
}

export function getUser(id, callback) {
  return callback(users[id] || null);
}

export function sendMessage(message, callback) {
  let response = {
    destination: message.destination,
    content: message.content,
    date: new Date().toJSON(),
    sender: currentUser.id
  };
  response.id = generateMessageId(response);
  callback(response);
}
