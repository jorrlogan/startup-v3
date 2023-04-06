const { ScanCommand, QueryCommand } = require("@aws-sdk/client-dynamodb");
const { ddbClient } = require("./ddbClient.js");

const tableName = 'campgrounds_v2'


const getCampgrounds = async () => {
    const params = {
        TableName: tableName,
    };

    try {
        const data = await ddbClient.send(new ScanCommand(params))
        return await transformCampgroundList(data.Items)
    } catch (err) {
        console.log("Error", err);
    }
}

async function transformCampgroundList(campgrounds) {
    let campgrounds_array = []
    console.log('campgrounds')
    for (const camp of campgrounds) {
        console.log(camp)
        campgrounds_array.push({ campgroundId: camp.campground_id.S, campgroundName: camp.campground_name.S })
    }

    return ({
        "campgroundList": campgrounds_array
    })
}

const getTrackers = async (device_token) => {
    const params = {
        TableName: "tracker",
        IndexName: "device_token-campground_id-index",
        KeyConditionExpression: 'device_token = :deviceTokenVal',
        ExpressionAttributeValues: {
            ':deviceTokenVal': { S: device_token }
        }
    };

    try {
        const data = await ddbClient.send(new QueryCommand(params))
        console.log(data.Items)
        return await transformTrackerList(data.Items)
    } catch (e) {
        console.log(e)
    }
}

async function transformTrackerList(trackers){
    let trackers_array = []
    for (const tracker of trackers){
        trackers_array.push({campground_id: tracker.campground_id.S, device_token: tracker.device_token.S, campground_name: tracker.campground_name.S, start_date: tracker.start_date.S, end_date: tracker.end_date.S})
    }
    return ({
        trackers: trackers_array
    })
}

module.exports = { getCampgrounds, getTrackers }

