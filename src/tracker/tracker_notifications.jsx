import React from "react";

import { TrackEvent, TrackerNotifier } from "./tracker_notifier";

export function TrackerNotifications() {
    const [events, setEvents] = React.useState([])

    React.useEffect(() => {
        TrackerNotifier.addHandler(handleTrackerEvent)

        return () => {
            TrackerNotifier.removeHandler(handleTrackerEvent)
        }
    })

    function handleTrackerEvent(event){
        console.log('handling event')
        setEvents([...events, event])
    }

    function createMessagesArray(){
        const messageArray = []
        for (const [i, event] of TrackerNotifier.events.entries()){
            let message = ''
            console.log('hello world')
            if (event.type === TrackEvent.System){
                message = event.value.msg
            } else if (event.type === TrackEvent.TrackerSet){
                message = `🏕️ ` + event.from + " " + event.value.msg
            }
            
            messageArray.push(
                <div>
                    <p>{message}</p>
                </div>
            )
        }
        return messageArray
    }

    return (
        <div className="flex justify-center">
            <div className="w-9/12 p-4">
            {createMessagesArray()}
            </div>
        </div>
    )
}