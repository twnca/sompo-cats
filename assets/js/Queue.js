PIXI.utils.skipHello();

class Queue {
    constructor() {
        this.elements = {};
        this.head = 0;
        this.tail = 0;
    }
    enqueue(element) {
        this.elements[this.tail] = element;
        this.tail++;
    }
    dequeue() {
        const item = this.elements[this.head];
        delete this.elements[this.head];
        this.head++;
        return item;
    }
    peek() {
        return this.elements[this.head];
    }
    getElement(n) {
        let elem = this.head + (n - 1);
        return this.elements[elem]
    }
    get length() {
        return this.tail - this.head;
    }
    get isEmpty() {
        return this.length === 0;
    }
}