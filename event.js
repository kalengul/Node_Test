const EventEm=require('events')

const emitter = new EventEm
emitter.on('Hi', data => {
    console.log(data)
})
emitter.emit('Hi',1)
emitter.emit('Hi',2)
emitter.emit('Hi',3)

class Dispatcher extends EventEm{
    subsribe (eventName,cb) {
        console.log('11')
    }
}