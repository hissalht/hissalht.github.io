

/** Users cache */
var userCache = {};

/** Messages cache */
var messageCache = {};

/**
 *
 * @param {string} url url of the failed request
 * @param {response} res response from the server
 * @returns {string} A formatted error message.
 */
function formatError(url, res) {
  return `${url} : ${res.status} ${res.statusText}`;
}

export default {

  /**
   * @param {boolean} refresh If the current user has already been fetched, force a new server request.
   * @returns {Promise<user>} A promise on the currently logged user object.
   */
  getCurrentUser: function(refresh=false) {
    return this.getUser('current', refresh);
  },


  /**
   * @param {number|string} id requested user id.
   * @param {boolean} refresh if the user has already been fetched, force a new server request.
   * @returns {Promise<user>} a promise on the requested user.
   */
  getUser: function (id, refresh=false) {
    const RQ_URL = `/api/user/${id}`;

    return new Promise((resolve, reject) => {
      if(id in userCache && !refresh) {
        // user already fetched and no need to refres
        return resolve(userCache[id]);
      }
      $.getJSON(RQ_URL)
        .done((data) => {
          userCache[data.id] = data;
          resolve(data);
        })
        .fail((res) => reject(formatError(RQ_URL, res)));
    })
  },


  /**
   * @returns {Promise<[conversation]>} A promise on the currently logged user's conversations.
   */
  getConversations: function () {
    const RQ_URL = `/api/conversation`;

    return new Promise((resolve, reject) => {
      $.getJSON(RQ_URL)
        .done((data) => resolve(data))
        .fail((res) => reject(formatError(RQ_URL, res)));
    });
  },


  /**
   * @param {number} id requested message id.
   * @returns {Promise<message>} a promise on the requested message.
   */
  getMessage: function (id) {
    const RQ_URL = `/api/message/${id}`;

    return new Promise((resolve, reject) => {
      if (id in messageCache) {
        return resolve(messageCache[id]);
      }
      $.getJSON(RQ_URL)
        .done((data) => resolve(data))
        .fail((res) => reject(formatError(RQ_URL, res)));
    })
  },


  /**
   * @param {object} message an object with attributes 'content' and 'destination'.
   * @returns {Promise<message>} a promise on the message object containing its ID, post date and sender ID.
   */
  postMessage: function (message) {
    const RQ_URL = `/api/message`;

    return new Promise((resolve, reject) => {
      $.post(RQ_URL, message)
        .done((data) => resolve(data))
        .fail((res) => reject(formatError(RQ_URL, res)));
    });
  }

}
