
const Queue = require('queue-fifo');

class ProcessQueueService {
  constructor() {
    this.queue = new Queue();
  }

  push(urls) {
    if (Array.isArray(urls)) {
      urls.forEach(url => {
        this.queue.enqueue(JSON.parse(JSON.stringify(url)));
      });
    } else if (/object/i.test(typeof urls)) {
      this.queue.enqueue(JSON.parse(JSON.stringify(urls)));
    } else {
      return new Error("Le type de données n'est pas valide. Entrez une 'string' ou un 'array")
    }
  }

  pop() {
    const url = this.queue.peek();
    this.queue.dequeue();
    return url;
  }

  get() {
    const queueArray = []
    const size = this.queue.size();
    if (size === 0) console.log('queue is empty');
    for (let i = 0; i < size; i++) {
      queueArray.push(this.queue.peek());
    }
    return queueArray;
  }

  count() {
    return this.queue.size();
  }
}

module.exports = ProcessQueueService