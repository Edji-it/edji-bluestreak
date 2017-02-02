module.exports = function(server) {
    var io = require('socket.io')(server)

    /** Returns an array of all sockets in a room */
    function getAllRoomMembers(room) {
        var roomMembers = []
        
        // Make an array of sockets in room
        if (io.nsps['/'].adapter.rooms[room]) {
            for( var socketId in io.nsps['/'].adapter.rooms[room].sockets ) {
                roomMembers.push(io.sockets.connected[socketId]) // pushes the socket object into an array
            }
        }
        return roomMembers
    }

    /** returns an array of users who are currently active on the project */
    function getActiveUsers(room) {
        var activeUsers = []
        getAllRoomMembers(room).forEach((socket) => {
            activeUsers.push({ userId: socket.user_id })
        })
        return activeUsers
    }

    //wires socket.io for sessions
    var sessionObjs = {}
    io.on('connection', function(socket) {
        console.log("socket connected")
        var thisSessionId
        var thisUserId

        /** Associate a user's id with the socket */
        socket.on('resUserId', (id) => { socket.user_id = id })
        socket.emit('getUserId')

        /** Occurs when a user first opens a project */
        socket.on('openProject', function(session) {
            thisSessionId = session.id
            socket.user_id = session.user // reset socket's id in case it has changed
            // Join rooms based on Session ID
            socket.join(thisSessionId, function() {
                io.to(thisSessionId).emit('liveUsers', getActiveUsers(thisSessionId))
            })
        })

        socket.on('disconnect', function() {
            io.to(thisSessionId).emit('liveUsers', getActiveUsers(thisSessionId))
        })

        socket.on('manualDisconnect', function(session) {
            socket.leave(session.id, function() {
                io.to(thisSessionId).emit('liveUsers', getActiveUsers(thisSessionId))
            })
        })

        socket.on('heatVision', (projectPowers) => {
            io.to(projectPowers.projectId).emit('heatVision', value)
        })

        // Support ADD, DELETE, or UPDATE
        // @param commentUpdate: any { comment: commentObj, action: 'ADD', projectId: PROJECTID }
        socket.on('updateComment', function(commentUpdate) {
            io.to(commentUpdate.projectId).emit('updateComment', commentUpdate)
        })
    })
}
