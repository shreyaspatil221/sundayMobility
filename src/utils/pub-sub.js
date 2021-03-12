/* eslint-disable consistent-return */
class PubSubUtils {
  constructor() {
    if (this.instance) {
      return this.instance;
    }
    this.topics = {};
    this.uid = 0;
    this.instance = this;
  }

  subscribe(topic, func) {
    let token = '';
    if (!this.topics[topic]) {
      this.uid += 1;
      token = (this.uid).toString();
      this.topics[topic] = {};
      this.topics[topic] = {
        token,
        func: []
      };
    }
    this.topics[topic].func.push(func);
    return this.unsubscribe.bind(this, topic);
  }

  subscribeOnce(topic, func) {
    let token = '';
    if (this.topics[topic]) {
      return;
    }
    this.uid += 1;
    token = (this.uid).toString();
    this.topics[topic] = {};
    this.topics[topic] = {
      token,
      func: []
    };
    this.topics[topic].func.push(func);
    return token;
  }

  unsubscribe(topic = '') {
    if (!topic) {
      return;
    }
    delete this.topics[topic];
  }

  publish(topic, args) {
    const self = this;
    if (!this.topics[topic]) {
      return false;
    }
    if (self.topics[topic]) {
      const subscribers = self.topics[topic].func;
      subscribers.forEach((item) => {
        /* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
        try {
          item(topic, args);
        } catch { }
      });
    }
    return true;
  }
}

export default new PubSubUtils();
