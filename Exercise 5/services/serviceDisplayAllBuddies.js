const displayAllBuddies = (fileAccessResponse) => {

    //Storing data in variable buddies
    buddies = JSON.parse(fileAccessResponse);

    return buddies;
}

module.exports = {displayAllBuddies};