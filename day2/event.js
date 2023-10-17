const EventEmitter = require("events")

observer = new EventEmitter()

observer.on("my event", (name) => {
    console.log("My Event is Trigerred", name)
})

observer.on("your event", (name) => {
    console.log("Your Event is Trigerred", name)
})

observer.emit("my event", "Observer1")
observer.emit("your event", "Observer 2")