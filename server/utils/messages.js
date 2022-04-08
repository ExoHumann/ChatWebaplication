function formatMessage(username, text){
    return{
        username,
        text,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        date: new Date().toLocaleDateString()
    }
}
module.exports = formatMessage